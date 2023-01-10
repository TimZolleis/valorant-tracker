import { ValorantApiClient } from '~/utils/api/valorant/Client';
import { ValorantUser } from '~/models/user/ValorantUser';
import { PlayerLoadout } from '~/models/interfaces/PlayerLoadout';

class PlayerClient {
    client: ValorantApiClient;

    constructor(user: ValorantUser) {
        this.client = new ValorantApiClient(user);
    }

    async getLoadout(): Promise<PlayerLoadout> {}
}

const PLAYER_ENDPOINT = {};
