import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { RiotApiClientConfig } from '~/models/static/RiotApiClientConfig';
import { UrlBuilder } from '~/utils/request/url.server';
import {
    ValorantContent,
    ValorantSeason,
} from '~/models/interfaces/valorant-ingame/ValorantContent';

type ActiveSeason = {
    act?: ValorantSeason;
    episode?: ValorantSeason;
};

export class ValorantContentApiClient {
    client: ValorantGameApiClient;

    async init(user: AuthenticatedValorantUser) {
        const config = await new RiotApiClientConfig().init();
        this.client = new ValorantGameApiClient(user, config.getHeaders());
    }

    async getContent(): Promise<ValorantContent> {
        return await this.client.get(
            new UrlBuilder(this.client.user.region).buildSharedUrl(CONTENT_ENDPOINTS.CONTENT)
        );
    }
    async getActiveSeason(): Promise<ActiveSeason> {
        const content = await this.getContent();
        const episodes = content.Seasons.filter((season) => {
            return season.Type === 'episode';
        });

        const acts = content.Seasons.filter((season) => {
            return season.Type === 'act';
        });

        const activeEpisode = episodes.find((episode) => {
            return episode.IsActive;
        });

        const activeAct = acts.find((act) => {
            return act.IsActive;
        });
        return { act: activeAct, episode: activeEpisode };
    }

    async getCompetitiveSeason() {
        const { act } = await this.getActiveSeason();
    }
}

const CONTENT_ENDPOINTS = {
    CONTENT: '/content-service/v3/content',
};
