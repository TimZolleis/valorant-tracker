import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { Player, ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import type { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { ValorantMediaCharacterApi } from '~/utils/api/valorant-media/ValorantMediaCharacterApi';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import { getPlayersData, PlayerWithData } from '~/utils/player/player.server';
import { TEST_MATCH } from '~/config/clientConfig';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { getMatchMap } from '~/utils/match/match.server';
import { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';

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
    pregame?: ValorantPreGameWithDetails;
    coregame?: ValorantCoreGame;
    error?: string;
};

export type ValorantPreGameWithDetails = ValorantPreGame & {
    AllyTeam: {
        TeamID: string;
        Players: PlayerWithData[];
    };
} & { Map?: ValorantMediaMap };

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await requireUser(request);
    let error = undefined;
    try {
        // const pregame = await getPregameMatch(user);
        const pregame = TEST_MATCH;
        const players = pregame.AllyTeam.Players;
        const [playersData, map] = await Promise.all([
            getPlayersData(user, players),
            getMatchMap(pregame.MapID),
        ]);
        const pregameWithData = {
            ...pregame,
            AllyTeam: {
                ...pregame.AllyTeam,
                Players: playersData,
            },
            Map: map,
        };
        return json<LiveMatchLoaderData>({
            pregame: pregameWithData,
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
