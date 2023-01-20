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
import { ValorantMediaCompetitiveSeason } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveSeason';
import { GeneralApiException } from '~/models/exception/general/GeneralApiException';
import { TierNotFoundException } from '~/models/exception/rank/TierNotFoundException';

export type PlayerRank = {
    tier: Tier;
    unrated: boolean;
    gamesNeededForRating?: number;
    rr: number;
};

export async function getPlayerRank(
    user: AuthenticatedValorantUser,
    puuid: Puuid
): Promise<PlayerRank> {
    const { activeSeason, competitiveTier } = await getCurrentCompetitiveTiers(user);
    try {
        const { unrated, gamesNeededForRating } = await checkGamesNeededForRating(
            activeSeason,
            user
        );
        const playerApi = new ValorantPlayerApiClient(user);
        const latestCompetitiveUpdate = await playerApi
            .getMMR(puuid)
            .then((res) => res.LatestCompetitiveUpdate);
        const tier = await findTier(user, latestCompetitiveUpdate.TierAfterUpdate);
        const rr = latestCompetitiveUpdate.RankedRatingAfterUpdate;
        return {
            unrated,
            gamesNeededForRating,
            tier,
            rr,
        };
    } catch (error: any) {
        throw new GeneralApiException('PlayerRank', error.message);
    }
}

export async function findTier(user: AuthenticatedValorantUser, tierNumber: number) {
    const { competitiveTier } = await getCurrentCompetitiveTiers(user);
    const tier = competitiveTier.tiers.find((tier) => {
        return tier.tier === tierNumber;
    });
    if (!tier) {
        throw new TierNotFoundException();
    }
    return tier;
}

function findCompetitiveSeason(
    competitiveSeasons: ValorantMediaCompetitiveSeason[],
    activeSeasonId: string
) {
    return competitiveSeasons.find((competitiveSeason) => {
        return competitiveSeason.seasonUuid === activeSeasonId;
    });
}

export async function getCurrentCompetitiveTiers(user: AuthenticatedValorantUser) {
    try {
        const [activeSeason, competitiveSeasons] = await Promise.all([
            new ValorantContentApiClient().init(user).then((client) => client.getActiveSeason()),
            new ValorantMediaContentApiClient().getCompetitiveSeasons(),
        ]);
        const competitiveSeason = findCompetitiveSeason(competitiveSeasons, activeSeason.act.ID);
        const competitiveTier = await new ValorantMediaContentApiClient().getCompetitiveTiers(
            competitiveSeason!
        );
        return { activeSeason, competitiveTier };
    } catch (error: any) {
        throw new GeneralApiException('CompetitiveTiers', error.message);
    }
}

async function checkGamesNeededForRating(
    activeSeason: ActiveSeason,
    user: AuthenticatedValorantUser
) {
    try {
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
    } catch (error: any) {
        throw new GeneralApiException('GamesNeededForRanking', error.message);
    }
}
