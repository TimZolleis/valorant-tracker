import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getUserFromSession } from '~/utils/session/session.server';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import { PlayerMediaApi } from '~/utils/api/valorant-media/ValorantMediaPlayerApiClient';
import type { ValorantPlayerLoadout } from '~/models/interfaces/valorant-ingame/ValorantPlayerLoadout';
import type { ValorantMediaPlayerCard } from '~/models/interfaces/valorant-media/ValorantMediaPlayerCard';

export type LoadoutLoaderData = {
    loadout: ValorantPlayerLoadout;
    playerCard: ValorantMediaPlayerCard;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUserFromSession(request);
    if (!user) {
        throw redirect('/login');
    }
    const loadout = await new ValorantPlayerApiClient(user).getLoadout();
    const playerCard = await new PlayerMediaApi().fetchPlayerCard(loadout.Identity.PlayerCardID);
    return json<LoadoutLoaderData>({
        loadout,
        playerCard,
    });
};
