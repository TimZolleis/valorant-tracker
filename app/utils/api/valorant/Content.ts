import { ValorantApiClient } from '~/utils/api/valorant/ApiClient';
import { ValorantUser } from '~/models/user/ValorantUser';
import { Config } from '~/models/static/Config';
import { UrlBuilder } from '~/utils/request/url.server';
import { Content, Season } from '~/models/interfaces/Content';

type ActiveSeason = {
    act?: Season;
    episode?: Season;
};

export class ContentApi {
    client: ValorantApiClient;

    async init(user: ValorantUser) {
        const config = await new Config().init();
        this.client = new ValorantApiClient(user, config.getHeaders());
    }

    async getContent(): Promise<Content> {
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
