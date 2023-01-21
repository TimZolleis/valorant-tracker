import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { RiotApiClientConfig } from '~/models/static/RiotApiClientConfig';
import { RiotRequest } from '~/utils/request/url.server';
import type {
    ValorantContent,
    ValorantSeason,
} from '~/models/interfaces/valorant-ingame/ValorantContent';
import { clientConfig } from '~/config/clientConfig';

export type ActiveSeason = {
    act: ValorantSeason;
    episode: ValorantSeason;
};

export class ValorantContentApiClient {
    client: ValorantGameApiClient;

    async init(user: AuthenticatedValorantUser) {
        const config = await new RiotApiClientConfig().init();
        this.client = await new ValorantGameApiClient(user, config.getHeaders());
        return this;
    }

    async getContent(): Promise<ValorantContent> {
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildSharedUrl(CONTENT_ENDPOINTS.CONTENT),
            undefined,
            {
                key: 'content',
                expiration: 3600,
            }
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
        return { act: activeAct!, episode: activeEpisode! };
    }
}

const CONTENT_ENDPOINTS = {
    CONTENT: 'content-service/v3/content',
};
