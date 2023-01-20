import { defer, LoaderFunction, redirect } from '@remix-run/node';
import ContentContainer from '~/components/common/page/ContentContainer';
import { CardContainer } from '~/components/common/page/CardContainer';
import { CardLoadingSkeleton } from '~/components/common/loading/CardLoadingSkeleton';
import { PageHeader } from '~/components/common/page/PageHeader';
import { requireUser } from '~/utils/session/session.server';
import { checkPuuid } from '~/utils/player/puuid';
import { ROUTES } from '~/config/Routes';
import { getPlayerDetails } from '~/utils/player/player.server';
import { Player } from '~/models/player/PlayerDetails';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { PlayerDetailsLoadingSkeleton } from '~/components/common/loading/PlayerDetailsLoadingSkeleton';

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
            <ContentContainer>
                <CardContainer
                    headline={'Player Details'}
                    subtext={'See details about a player'}
                    imageUrl={'/resources/img/svg/trophy.svg'}>
                    <div>
                        <p className={'text-white'}>Player details!</p>
                    </div>
                </CardContainer>
            </ContentContainer>

            <Suspense fallback={<PlayerDetailsLoadingSkeleton />}></Suspense>
            <Await<Promise<Player>> resolve={playerPromise}>
                {(player) => <div>{player.details.nameService.GameName}</div>}
            </Await>
            <ContentContainer>
                <CardLoadingSkeleton />
            </ContentContainer>
        </div>
    );
};

export default PlayerDetailsPage;
