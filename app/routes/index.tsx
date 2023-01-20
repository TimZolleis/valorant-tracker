import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { Await, useLoaderData } from '@remix-run/react';
import CurrentMatchComponent from '~/components/match/CurrentMatchComponent';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { CompetitiveUpdateComponent } from '~/components/match/history/CompetitiveUpdateComponent';
import { getPlayerDetails } from '~/utils/player/player.server';
import { PageHeader } from '~/components/common/page/PageHeader';
import ContentContainer from '~/components/common/page/ContentContainer';
import { Player } from '~/models/player/PlayerDetails';
import { Suspense } from 'react';

type LoaderData = {
    playerPromise: Promise<Player>;
};
export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const playerPromise = getPlayerDetails(user, user.puuid);
    return json<LoaderData>({
        playerPromise,
    });
};

export default function Index() {
    const { playerPromise } = useLoaderData() as unknown as LoaderData;
    return (
        <>
            <Suspense>
                <Await<Promise<Player>> resolve={playerPromise}>
                    {(player) => (
                        <>
                            <PageHeader text={'Dashboard'} />
                            <div className={'space-y-5'}>
                                <div className={'flex gap-2 w-full'}>
                                    <ContentContainer>
                                        <CurrentMatchComponent />
                                    </ContentContainer>
                                </div>
                                <div
                                    className={
                                        'grid grid-cols-1 gap-5 lg:grid-cols-3 auto-rows-min items-start'
                                    }>
                                    <ContentContainer>
                                        <MatchHistoryComponent history={player.matchHistory} />
                                    </ContentContainer>
                                    <ContentContainer>
                                        <CompetitiveUpdateComponent
                                            competitiveUpdate={player.competitiveUpdate}
                                        />
                                    </ContentContainer>
                                </div>
                            </div>
                        </>
                    )}
                </Await>
            </Suspense>
        </>
    );
}
