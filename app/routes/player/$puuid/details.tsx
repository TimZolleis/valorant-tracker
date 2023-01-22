import { defer, LoaderFunction } from '@remix-run/node';
import ContentContainer from '~/components/common/page/ContentContainer';
import { CardLoadingSkeleton } from '~/components/common/loading/CardLoadingSkeleton';
import { PageHeader } from '~/components/common/page/PageHeader';
import { requireUser } from '~/utils/session/session.server';
import { checkPuuid } from '~/utils/player/puuid';
import { getPlayerDetails } from '~/utils/player/player.server';
import { Player } from '~/models/player/PlayerDetails';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { PlayerDetailsLoadingSkeleton } from '~/components/common/loading/PlayerDetailsLoadingSkeleton';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { CompetitiveUpdateComponent } from '~/components/match/history/CompetitiveUpdateComponent';
import { PlayerStatisticsComponent } from '~/components/player/statistics/PlayerStatisticsComponent';

type LoaderData = {
    playerPromise: Promise<Player>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await requireUser(request);
    const puuid = params.puuid;
    if (!puuid || !checkPuuid(puuid)) {
        console.log('Invalid Puuid');
        // throw redirect(ROUTES.HOME);
    }
    const playerPromise = getPlayerDetails(user, puuid!);

    return defer<LoaderData>({ playerPromise });
};

const PlayerDetailsPage = () => {
    const { playerPromise } = useLoaderData() as unknown as LoaderData;

    return (
        <div>
            <PageHeader text={'Player Details'} />
            <Suspense fallback={<PlayerDetailsLoadingSkeleton />}>
                <Await<Promise<Player>> resolve={playerPromise}>{(player) => <div>lol</div>}</Await>
            </Suspense>
            <Suspense>
                <Await<Promise<Player>> resolve={playerPromise}>
                    {(player) => <PlayerStatisticsComponent player={player} />}
                </Await>
            </Suspense>
            <div className={'grid grid-cols-1 gap-2 md:grid-cols-2 mt-2'}>
                <ContentContainer>
                    <Suspense fallback={<CardLoadingSkeleton />}>
                        <Await<Promise<Player>>
                            resolve={playerPromise}
                            errorElement={
                                <div>
                                    <p className={'text-white'}>Error lol</p>
                                </div>
                            }>
                            {(player) => <MatchHistoryComponent history={player.matchHistory} />}
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
    );
};

export default PlayerDetailsPage;
