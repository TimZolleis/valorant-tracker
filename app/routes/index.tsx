import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { getCurrentCompetitiveTiers } from '~/utils/player/rank.server';
import { useLoaderData } from '@remix-run/react';
import type { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import CurrentMatchComponent from '~/components/match/CurrentMatchComponent';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { CompetitiveUpdateComponent } from '~/components/match/history/CompetitiveUpdateComponent';
import { QUEUE } from '~/models/static/Queue';
import type {
    Team,
    ValorantMatchDetails,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import type { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';
import type { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';
import {
    getCompetitiveUpdates,
    getCompetitiveStats,
    getMatchHistory,
} from '~/utils/player/player.server';
import { useOptionalUser } from '~/utils/hooks/matches';
import { PageHeader } from '~/components/common/page/PageHeader';
import ContentContainer from '~/components/common/page/ContentContainer';

type LoaderData = {
    user: AuthenticatedValorantUser;
    competitiveUpdate: ValorantCompetitiveUpdate;
    matchHistory: MatchHistory[];
    competitiveTier: ValorantMediaCompetitiveTier;
    playerStatistics: Awaited<ReturnType<typeof getCompetitiveStats>>;
    error?: string;
};

export type MatchHistory = {
    matchDetails: ValorantMatchDetails;
    map?: ValorantMediaMap;
    playerTeam?: Team;
};

export const loader: LoaderFunction = async ({ request }) => {
    const startTime = new Date().getTime();
    console.log('StartTime', startTime);
    const user = await requireUser(request);
    const [{ activeSeason, competitiveTier }, competitiveUpdate, matchHistory, playerStatistics] =
        await Promise.all([
            getCurrentCompetitiveTiers(user),
            getCompetitiveUpdates(user, user.puuid, 20),
            getMatchHistory(user, QUEUE.COMPETITIVE),
            getCompetitiveStats(user, user.puuid),
        ]);
    console.log('All fetched at', new Date().getTime() - startTime, 'ms');

    return json<LoaderData>({
        user,
        competitiveTier,
        competitiveUpdate,
        matchHistory,
        playerStatistics,
    });
};

export default function Index() {
    const { matchHistory, competitiveUpdate, competitiveTier, error } = useLoaderData<LoaderData>();
    const user = useOptionalUser();
    return (
        <>
            <PageHeader text={'Dashboard'} />
            <div className={'space-y-5'}>
                <div className={'flex gap-2 w-full'}>
                    <ContentContainer>
                        <CurrentMatchComponent />
                    </ContentContainer>
                </div>
                <div className={'grid grid-cols-1 gap-5 lg:grid-cols-3 auto-rows-min items-start'}>
                    <ContentContainer>
                        <MatchHistoryComponent history={matchHistory} />
                    </ContentContainer>
                    <ContentContainer>
                        <CompetitiveUpdateComponent competitiveUpdate={competitiveUpdate} />
                    </ContentContainer>
                </div>
            </div>
        </>
    );
}
