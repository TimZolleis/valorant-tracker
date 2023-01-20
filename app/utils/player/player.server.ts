import { ValorantMediaCharacterApi } from '~/utils/api/valorant-media/ValorantMediaCharacterApi';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type {
    ValorantPlayer,
    ValorantPlayerIdentity,
} from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { PlayerRank } from '~/utils/player/rank.server';
import { findTier, getCurrentCompetitiveTiers, getPlayerRank } from '~/utils/player/rank.server';
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
import { MatchHistory } from '~/models/match/MatchHistory';
import { Match } from '~/models/match/Match';
import { Player, PlayerDetails, PlayerInMatch } from '~/models/player/PlayerDetails';
import {
    PlayerStatistic,
    SeasonalStatistic,
    TotalStatistic,
} from '~/models/player/PlayerStatistic';

export interface PlayerWithData extends ValorantPlayer {
    character?: ValorantMediaCharacter;
    rank: PlayerRank;
    PlayerIdentity: ValorantPlayerIdentity & { nameService: ValorantNameService };
    competitiveUpdate: ValorantCompetitiveUpdate;
}

async function getPlayerCharacter(characterUuid: string) {
    return await new ValorantMediaCharacterApi().getCharacter(characterUuid);
}

async function getPlayerName(user: AuthenticatedValorantUser, puuid: Puuid) {
    const nameService = await new ValorantPlayerApiClient(user)
        .getPlayerNames([puuid])
        .then((array) => array[0]);
    return new PlayerDetails(nameService);
}

export async function getCompetitiveUpdate(
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

async function getMatchHistory(user: AuthenticatedValorantUser, puuid: Puuid) {
    const matchIds = await new ValorantMatchApiClient(user)
        .getMatchHistory(puuid, QUEUE.COMPETITIVE, 20)
        .then((res) => res.History);

    const matches = await Promise.all(
        matchIds.map(async (match) => {
            const matchDetails = await new ValorantMatchApiClient(user).getMatchDetails(
                match.MatchID
            );
            const map = await getMatchMap(matchDetails);
            const playerTeam = determinePlayerTeam(puuid, matchDetails);
            return new Match(matchDetails, map, playerTeam!);
        })
    );
    return new MatchHistory(matches);
}

export async function getPlayerInMatchDetails(
    user: AuthenticatedValorantUser,
    player: ValorantPlayer
) {
    const [playerWithDetails, character] = await Promise.all([
        getPlayerDetails(user, player.Subject),
        getPlayerCharacter(player.CharacterID),
    ]);

    return new PlayerInMatch(
        playerWithDetails.details,
        playerWithDetails.matchHistory,
        playerWithDetails.competitiveUpdate,
        playerWithDetails.statistics,
        character,
        player
    );
}

export async function getPlayerDetails(user: AuthenticatedValorantUser, puuid: Puuid) {
    const [playerDetails, competitiveUpdate, statistics, matchHistory] = await Promise.all([
        getPlayerName(user, puuid),
        getCompetitiveUpdate(user, puuid, 20),
        getPlayerStatistics(user, puuid),
        getMatchHistory(user, puuid),
    ]);
    return new Player(playerDetails, matchHistory, competitiveUpdate, statistics);
}

export async function getPlayersInMatchDetails(
    user: AuthenticatedValorantUser,
    players: ValorantPlayer[]
) {
    return await Promise.all(
        players.map(async (player) => {
            return await getPlayerInMatchDetails(user, player);
        })
    );
}

export async function getPlayerStatistics(user: AuthenticatedValorantUser, puuid: Puuid) {
    const playerMMR = await new ValorantPlayerApiClient(user).getMMR();
    const competitiveSeasons = playerMMR.QueueSkills.competitive.SeasonalInfoBySeasonID;
    const seasonalStatistics = await Promise.all(
        Object.keys(competitiveSeasons).map(async (seasonId) => {
            const competitiveSeason = competitiveSeasons[seasonId];
            const season = await new ValorantMediaContentApiClient().getSeason(
                competitiveSeason.SeasonID
            );
            return new SeasonalStatistic(
                season,
                competitiveSeason.NumberOfGames,
                competitiveSeason.NumberOfWins
            );
        })
    );
    const [rank, topRank] = await Promise.all([
        getPlayerRank(user, puuid),
        getTopRank(user, competitiveSeasons),
    ]);
    const { gamesPlayed, gamesWon, winRate } = getTotalWinRate(competitiveSeasons);
    const totalStatistic = new TotalStatistic(winRate, gamesPlayed, gamesWon);
    return new PlayerStatistic(topRank, rank, totalStatistic, seasonalStatistics);
}

async function getTopRank(
    user: AuthenticatedValorantUser,
    seasonalInfo: ValorantSeasonalInfoBySeasonID
) {
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
    return await findTier(user, topTier);
}

function getTotalWinRate(competitiveSeasons: ValorantSeasonalInfoBySeasonID) {
    let gamesPlayed = 0;
    let gamesWon = 0;
    Object.keys(competitiveSeasons).forEach((seasonId) => {
        const season = competitiveSeasons[seasonId];
        gamesPlayed += season.NumberOfGames;
        gamesWon += season.NumberOfWins;
    });
    return {
        gamesPlayed,
        gamesWon,
        winRate: calculateWinrate(gamesWon, gamesPlayed),
    };
}
