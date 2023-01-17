import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import {
    ActiveSeason,
    ValorantContentApiClient,
} from '~/utils/api/valorant/ValorantContentApiClient';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import {
    Tier,
    ValorantMediaCompetitiveTier,
} from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';

export type PlayerRank = {
    tier?: Tier;
    unrated: boolean;
    gamesNeededForRating?: number;
    rr: number;
};

export async function getPlayerRank(
    user: AuthenticatedValorantUser,
    puuid: Puuid,
    activeSeason: ActiveSeason,
    competitiveTier: ValorantMediaCompetitiveTier
): Promise<PlayerRank> {
    const { unrated, gamesNeededForRating } = await checkGamesNeededForRating(activeSeason, user);
    const playerApi = new ValorantPlayerApiClient(user);
    const mostRecentGame = await playerApi.getMostRecentGame(true);
    const tier = competitiveTier.tiers.find((tier) => {
        return tier.tier === mostRecentGame.Matches[0].TierAfterUpdate;
    });
    const rr = mostRecentGame.Matches[0].RankedRatingAfterUpdate;
    return {
        unrated,
        gamesNeededForRating,
        tier,
        rr,
    };
}

export async function getCurrentCompetitiveTiers(user: AuthenticatedValorantUser) {
    const activeSeason = await new ValorantContentApiClient()
        .init(user)
        .then((client) => client.getActiveSeason());

    const competitiveTier = await new ValorantMediaContentApiClient().getCurrentCompetitiveTiers(
        activeSeason!
    );

    return { activeSeason, competitiveTier };
}

async function checkGamesNeededForRating(
    activeSeason: ActiveSeason,
    user: AuthenticatedValorantUser
) {
    const playerApi = new ValorantPlayerApiClient(user);
    let unrated = false;
    const gamesNeededForRating = await playerApi
        .getMMR()
        .then((mmr) => mmr.QueueSkills.competitive.TotalGamesNeededForRating);
    if (gamesNeededForRating && gamesNeededForRating > 0) {
        unrated = true;
    }

    return {
        unrated,
        gamesNeededForRating,
    };
}
