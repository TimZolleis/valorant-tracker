import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import type { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';

async function getPregameMatch(user: AuthenticatedValorantUser) {
    const client = new ValorantMatchApiClient(user);
    const pregameMatchId = await client.getPregameMatchId(user.puuid).then((game) => game.MatchID);
    return await client.getPregameMatch(pregameMatchId);
}

async function getCoregameMatch(user: AuthenticatedValorantUser) {
    const client = new ValorantMatchApiClient(user);
    const matchId = await client.getCoregameMatchId(user.puuid).then((game) => game.MatchID);
    return await client.getCoregameMatch(matchId);
}

export type LiveMatchLoaderData = {
    pregame?: ValorantPreGame;
    coregame?: ValorantCoreGame;
    error?: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await requireUser(request);
    let error = undefined;
    try {
        const pregame = await getPregameMatch(user);
        return json<LiveMatchLoaderData>({
            pregame: pregame,
        });
    } catch (exception: any) {
        error = exception.message;
    }
    try {
        const coregame = await getCoregameMatch(user);
        return json<LiveMatchLoaderData>({
            coregame: coregame,
        });
    } catch (exception: any) {
        if (error === undefined) {
            error = exception.message;
        }
        return json<LiveMatchLoaderData>({
            error: error,
        });
    }
};

const LiveMatchPage = () => {
    return (
        <div>
            <p>Live Match!</p>
        </div>
    );
};

export default LiveMatchPage;
