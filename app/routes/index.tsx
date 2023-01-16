import { useOptionalUser } from '~/utils/hooks/user';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { PlayerRank } from '~/utils/player/rank.server';
import { getPlayerRank } from '~/utils/player/rank.server';
import { useLoaderData } from '@remix-run/react';
import ContentContainer from '~/components/common/Container';
import { getCompetitiveHistory } from '~/utils/player/history.server';
import type {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import CurrentMatchComponent from '~/components/match/CurrentMatchComponent';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { RankHistoryComponent } from '~/components/match/history/RankHistoryComponent';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';
import type { ValorantQueue } from '~/models/static/Queue';
import { QUEUE } from '~/models/static/Queue';
import { determinePlayerTeam, getMatchMap } from '~/utils/match/match.server';
import type {
    Team,
    ValorantMatchDetails,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import type { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';
import { DateTime } from 'luxon';

type LoaderData = {
    user: AuthenticatedValorantUser;
    rank: PlayerRank;
    competitiveUpdate: ValorantCompetitiveUpdate;
    matchHistory: MatchHistory[];
};

export type MatchHistory = {
    matchDetails: ValorantMatchDetails;
    map?: ValorantMediaMap;
    playerTeam?: Team;
};

async function getMatchHistory(
    user: AuthenticatedValorantUser,
    queue: ValorantQueue
): Promise<MatchHistory[]> {
    const client = new ValorantMatchApiClient(user);
    const matches = await client
        .getMatchHistory(user.puuid, queue, 5)
        .then((result) => result.History);
    return await Promise.all(
        matches.map(async (match) => {
            const matchDetails = await client.getMatchDetails(match.MatchID);
            const map = await getMatchMap(matchDetails);
            const playerTeam = determinePlayerTeam(user.puuid, matchDetails);
            return { matchDetails, map, playerTeam };
        })
    );
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const rank = await getPlayerRank(user, user.puuid);
    const competitiveUpdate = await getCompetitiveHistory(user);
    const matchHistory = await getMatchHistory(user, QUEUE.COMPETITIVE);

    return json<LoaderData>({ user, rank, competitiveUpdate, matchHistory });
};

function calculateRrDifference(matches: ValorantMatch[]) {
    let difference = 0;
    matches.forEach((match) => {
        difference += match.RankedRatingEarned;
    });
    return difference;
}

export default function Index() {
    const { matchHistory, rank, competitiveUpdate } = useLoaderData<LoaderData>();
    const user = useOptionalUser();
    return (
        <>
            <div className={'space-y-5'}>
                <div className={'flex gap-2 w-full'}>
                    <ContentContainer>
                        <CurrentMatchComponent />
                    </ContentContainer>
                </div>
                <div className={'grid grid-cols-1 gap-5 md:grid-cols-2'}>
                    <ContentContainer>
                        <MatchHistoryComponent history={matchHistory} />
                    </ContentContainer>
                    <ContentContainer>
                        <RankHistoryComponent />
                    </ContentContainer>
                </div>
            </div>
        </>
    );
}
