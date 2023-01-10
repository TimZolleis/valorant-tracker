import { json, LoaderFunction, redirect } from '@remix-run/node';
import { getUserFromSession } from '~/utils/session/session.server';
import { PlayerApi } from '~/utils/api/valorant/PlayerApi';
import { PlayerMediaApi } from '~/utils/api/valorant-media/PlayerMediaApiClient';
import { PlayerLoadout } from '~/models/interfaces/PlayerLoadout';
import { ValorantMediaApiPlayerCardResponse } from '~/models/interfaces/MediaApiResponse';

export type LoadoutLoaderData = {
    loadout: PlayerLoadout;
    playerCard: ValorantMediaApiPlayerCardResponse;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUserFromSession(request);
    if (!user) {
        throw redirect('/login');
    }
    const loadout = await new PlayerApi(user).getLoadout();
    const playerCard = await new PlayerMediaApi().fetchPlayerCard(loadout.Identity.PlayerCardID);
    return json<LoadoutLoaderData>({
        loadout,
        playerCard,
    });
};
