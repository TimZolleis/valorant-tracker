import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import { QUEUE } from '~/models/static/Queue';

export async function getCompetitiveHistory(
    user: AuthenticatedValorantUser,
    puuid?: Puuid,
    numberOfGames?: number
) {
    const matchApi = new ValorantMatchApiClient(user);
    return await matchApi.getCompetitiveUpdates(puuid ? puuid : user.puuid, QUEUE.COMPETITIVE, 10);
}
