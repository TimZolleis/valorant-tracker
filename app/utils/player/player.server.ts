import { ValorantMediaCharacterApi } from '~/utils/api/valorant-media/ValorantMediaCharacterApi';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type {
    ValorantPlayer,
    ValorantPlayerIdentity,
} from '~/models/interfaces/valorant-ingame/ValorantPreGame';
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
import { getMatchMap } from '~/utils/match/team.server';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { calculateWinrate } from '~/utils/calculation/winrate.server';
import type { ValorantSeason } from '~/models/interfaces/valorant-ingame/ValorantContent';
import type { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';
import { ValorantSeasonalInfoBySeasonID } from '~/models/interfaces/valorant-ingame/ValorantPlayerMMR';

export interface PlayerWithData extends ValorantPlayer {
    character?: ValorantMediaCharacter;
    rank: PlayerRank;
    PlayerIdentity: ValorantPlayerIdentity & { nameService: ValorantNameService };
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
    return matchApi.getCompetitiveUpdates(
        puuid ? puuid : user.puuid,
        QUEUE.COMPETITIVE,
        numberOfGames
    );
}

async function getPlayerData(user: AuthenticatedValorantUser, player: ValorantPlayer) {
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
    players: ValorantPlayer[]
): Promise<PlayerWithData[]> {
    const { activeSeason, competitiveTier } = await getCurrentCompetitiveTiers(user);
    return await Promise.all(
        players.map(async (player) => {
            const [{ character, nameService }, rank, competitiveUpdate] = await Promise.all([
                getPlayerData(user, player),
                getPlayerRank(user, player.Subject, activeSeason, competitiveTier),
                getCompetitiveUpdates(user, player.Subject, 20),
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

export async function getPlayerStatistics(user: AuthenticatedValorantUser, puuid: Puuid) {
    const mmr = await new ValorantPlayerApiClient(user).getMMR();
    const competitiveSeasonIds = Object.keys(mmr.QueueSkills.competitive.SeasonalInfoBySeasonID);
    const topTier = getTopTier(mmr.QueueSkills.competitive.SeasonalInfoBySeasonID);
    const seasonalInfo = await Promise.all(
        competitiveSeasonIds.map(async (competitiveSeasonId) => {
            const seasonalInfo =
                mmr.QueueSkills.competitive.SeasonalInfoBySeasonID[competitiveSeasonId];
            const season = await new ValorantMediaContentApiClient().getSeason(
                seasonalInfo.SeasonID
            );
            const seasonalWinRate = calculateWinrate(
                seasonalInfo.NumberOfWins,
                seasonalInfo.NumberOfGames
            );
            return {
                ...seasonalInfo,
                seasonalWinRate,
                ...season,
            };
        })
    );
    const totalWinRate = getTotalWinrate(mmr.QueueSkills.competitive.SeasonalInfoBySeasonID);
    return {
        totalWinRate,
        topTier,
        seasonalInfo,
    };
}

function getTopTier(seasonalInfo: ValorantSeasonalInfoBySeasonID) {
    let topTier = 0;
    const seasonIds = Object.keys(seasonalInfo);
    seasonIds.forEach((seasonId) => {
        const season = seasonalInfo[seasonId];
        Object.keys(season.WinsByTier).forEach((tier) => {
            if (parseInt(tier) > topTier) {
                topTier = parseInt(tier);
            }
        });
    });
    return topTier;
}

function getTotalWinrate(seasonalInfo: ValorantSeasonalInfoBySeasonID) {
    let allGames = 0;
    let allWins = 0;
    const seasonIds = Object.keys(seasonalInfo);
    seasonIds.forEach((seasonId) => {
        const season = seasonalInfo[seasonId];
        allGames += season.NumberOfGames;
        allWins += season.NumberOfWins;
    });
    return calculateWinrate(allWins, allGames);
}
