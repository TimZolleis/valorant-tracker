import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import { determinePlayerTeam, getMatchMap } from '~/utils/match/match.server';
import type {
    Team,
    ValorantMatchDetails,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import type { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';

export type MatchDetails = {
    match?: ValorantMatchDetails;
    playerTeam?: Team;
    map?: ValorantMediaMap;
    error?: string;
};
export const loader: LoaderFunction = async ({ request, params }) => {
    const matchId = params.matchId;
    const user = await requireUser(request);
    try {
        const match = await new ValorantMatchApiClient(user).getMatchDetails(matchId!);
        const playerTeam = await determinePlayerTeam(user.puuid, match);
        const map = await getMatchMap(match);
        return json<MatchDetails>({ match, playerTeam, map });
    } catch (error) {
        return json({ error: 'Match not found' });
    }
};

const MatchIdPage = () => {};
