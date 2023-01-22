import type { LoaderFunction } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { Await, useLoaderData } from '@remix-run/react';
import { getPlayerDetails } from '~/utils/player/player.server';
import { PageHeader } from '~/components/common/page/PageHeader';
import { Player } from '~/models/player/PlayerDetails';
import { Suspense } from 'react';
import ContentContainer from '~/components/common/page/ContentContainer';
import { CardLoadingSkeleton } from '~/components/common/loading/CardLoadingSkeleton';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { CompetitiveUpdateComponent } from '~/components/match/history/CompetitiveUpdateComponent';
import { useReauthenticationPromise } from '~/utils/hooks/user';
import CurrentMatchComponent from '~/components/match/CurrentMatchComponent';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import { ValorantMatchApiClient } from '~/utils/api/valorant/ValorantMatchApiClient';

type LoaderData = {
    playerPromise: Promise<Player>;
};
export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const playerPromise = getPlayerDetails(user, user.puuid);

    return defer<LoaderData>({
        playerPromise,
    });
};

export default function Index() {
    const { playerPromise } = useLoaderData() as unknown as LoaderData;
    useReauthenticationPromise<Player>(playerPromise);

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
                        <Suspense fallback={<CardLoadingSkeleton />}>
                            <Await<Promise<Player>>
                                resolve={playerPromise}
                                errorElement={
                                    <div>
                                        <p className={'text-white'}>Error lol</p>
                                    </div>
                                }>
                                {(player) => (
                                    <MatchHistoryComponent history={player.matchHistory} />
                                )}
                            </Await>
                        </Suspense>
                    </ContentContainer>
                    <ContentContainer>
                        <Suspense fallback={<CardLoadingSkeleton />}>
                            <Await<Promise<Player>>
                                resolve={playerPromise}
                                errorElement={
                                    <div>
                                        <p className={'text-white'}>Error lol</p>
                                    </div>
                                }>
                                {(player) => (
                                    <CompetitiveUpdateComponent
                                        competitiveUpdate={player.competitiveUpdate}
                                    />
                                )}
                            </Await>
                        </Suspense>
                    </ContentContainer>
                </div>
            </div>
        </>
    );
}
