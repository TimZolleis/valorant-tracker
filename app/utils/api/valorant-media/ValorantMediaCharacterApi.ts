import { ValorantMediaApiClient } from '~/utils/api/valorant-media/ValorantMediaApiClient';
import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';

export class ValorantMediaCharacterApi {
    client: ValorantMediaApiClient;

    constructor() {
        this.client = new ValorantMediaApiClient();
    }

    async getCharacter(characterUuid: string): Promise<ValorantMediaCharacter> {
        return await this.client.get(CHARACTER_ENDPPOINTS.CHARACTER_BY_UUID(characterUuid));
    }
}

const CHARACTER_ENDPPOINTS = {
    CHARACTER_BY_UUID: (uuid: string) => `/agents/${uuid}`,
};
