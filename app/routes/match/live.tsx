import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import type { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { getPlayersInMatchDetails, PlayerWithData } from '~/utils/player/player.server';
import { TEST_CORE_MATCH, TEST_MATCH } from '~/config/clientConfig';
import { getMatchMap } from '~/utils/match/match.server';
import { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';
import { PreGameMatch } from '~/models/match/PreGameMatch';
import { CoreGameMatch } from '~/models/match/CoreGameMatch';

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
    pregame?: PreGameMatch;
    coregame?: CoreGameMatch;
    error?: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await requireUser(request);
    let error = undefined;
    try {
        const pregame = await getPregameMatch(user);
        const players = pregame.AllyTeam.Players;
        const [playersData, map] = await Promise.all([
            getPlayersInMatchDetails(user, players),
            getMatchMap(pregame.MapID),
        ]);
        const match = new PreGameMatch(pregame, playersData, map);
        return json<LiveMatchLoaderData>({
            pregame: match,
        });
    } catch (exception: any) {
        error = exception.message;
    }
    try {
        const coregame = await getCoregameMatch(user);
        const players = coregame.Players;
        const [playersData, map] = await Promise.all([
            getPlayersInMatchDetails(user, players),
            getMatchMap(coregame.MapID),
        ]);
        const match = new CoreGameMatch(coregame, playersData, map);
        return json<LiveMatchLoaderData>({
            coregame: match,
        });
    } catch (exception: any) {
        console.log('Got exception');
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
