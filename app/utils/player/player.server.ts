import { ValorantMediaCharacterApi } from '~/utils/api/valorant-media/ValorantMediaCharacterApi';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { Player, PlayerIdentity } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { PlayerRank } from '~/utils/player/rank.server';
import { getCurrentCompetitiveTiers, getPlayerRank } from '~/utils/player/rank.server';
import type { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';
import type { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import type { ValorantQueue } from '~/models/static/Queue';
import { QUEUE } from '~/models/static/Queue';
import { determinePlayerTeam } from '~/utils/match/match.server';
import type { MatchHistory } from '~/routes';
import { getMatchMap } from '~/utils/match/team.server';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { calculateWinrate } from '~/utils/calculation/winrate.server';
import { ValorantSeason } from '~/models/interfaces/valorant-ingame/ValorantContent';
import { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';

export interface PlayerWithData extends Player {
    character?: ValorantMediaCharacter;
    rank: PlayerRank;
    PlayerIdentity: PlayerIdentity & { nameService: ValorantNameService };
    competitiveUpdate: ValorantCompetitiveUpdate;
}

export async function getPlayerCharacter(characterUuid: string) {
    return await new ValorantMediaCharacterApi().getCharacter(characterUuid);
}

export async function getCompetitiveUpdates(
    user: AuthenticatedValorantUser,
    puuid?: Puuid,
    numberOfGames?: number
) {
    const matchApi = new ValorantMatchApiClient(user);
    console.log('Fetching comp updates for', puuid);
    return await matchApi.getCompetitiveUpdates(
        puuid ? puuid : user.puuid,
        QUEUE.COMPETITIVE,
        numberOfGames
    );
}

async function getPlayerData(user: AuthenticatedValorantUser, player: Player) {
    let character = undefined;
    if (player.CharacterID) {
        character = await getPlayerCharacter(player.CharacterID);
    }
    const playerNameArray = await new ValorantPlayerApiClient(user).getPlayerNames([
        player.Subject,
    ]);
    const nameService = playerNameArray[0];
    return { character, nameService };
}

export async function getPlayersData(
    user: AuthenticatedValorantUser,
    players: Player[]
): Promise<PlayerWithData[]> {
    const { activeSeason, competitiveTier } = await getCurrentCompetitiveTiers(user);
    return await Promise.all(
        players.map(async (player) => {
            const [{ character, nameService }, rank, competitiveUpdate] = await Promise.all([
                getPlayerData(user, player),
                getPlayerRank(user, player.Subject, activeSeason, competitiveTier),
                getCompetitiveUpdates(user, player.Subject, 19),
            ]);
            return {
                ...player,
                PlayerIdentity: {
                    ...player.PlayerIdentity,
                    nameService: nameService,
                },
                character,
                rank,
                competitiveUpdate,
            };
        })
    );
}

export async function getMatchHistory(user: AuthenticatedValorantUser, queue: ValorantQueue) {
    const client = new ValorantMatchApiClient(user);
    const matches = await client
        .getMatchHistory(user.puuid, queue, 5)
        .then((result) => result.History);
    return await Promise.all(
        matches.map(async (match) => {
            const matchDetails = await client.getMatchDetails(match.MatchID);
            const map = await getMatchMap(matchDetails);
            const playerTeam = determinePlayerTeam(user.puuid, matchDetails);
            return { matchDetails, map, playerTeam };
        })
    );
}

type StatsBySeason = ValorantSeason & { winrate: number };

export async function getCompetitiveStats(user: AuthenticatedValorantUser, puuid: Puuid) {
    let topRank = 0;
    let totalGames = 0;
    let totalWins = 0;
    const playerApiClient = new ValorantPlayerApiClient(user);
    const mmr = await playerApiClient.getMMR();
    const competitiveSeasonIds = Object.keys(mmr.QueueSkills.competitive.SeasonalInfoBySeasonID);
    const statsBySeason = await Promise.all(
        competitiveSeasonIds.map(async (competitiveSeasonId) => {
            const seasonalInfo =
                mmr.QueueSkills.competitive.SeasonalInfoBySeasonID[competitiveSeasonId];
            const season = await new ValorantMediaContentApiClient().getSeason(
                seasonalInfo.SeasonID
            );
            const winRate = calculateWinrate(seasonalInfo.NumberOfWins, seasonalInfo.NumberOfGames);
            const seasonTiers = Object.keys(seasonalInfo.WinsByTier);
            const highestRank = seasonTiers.find((tier) => {
                return parseInt(tier) > topRank;
            });
            totalGames += seasonalInfo.NumberOfGames;
            totalWins += seasonalInfo.NumberOfWins;
            if (highestRank) {
                topRank = parseInt(highestRank);
            }
            return {
                ...seasonalInfo,
                winRate,
                ...season,
            };
        })
    );
    const totalWinrate = calculateWinrate(totalWins, totalGames);
    return {
        winrate: totalWinrate,
        seasonalInfo: statsBySeason,
    };
}
