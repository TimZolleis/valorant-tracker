import { LoaderFunction, redirect } from '@remix-run/node';
import ContentContainer from '~/components/common/page/ContentContainer';
import { CardContainer } from '~/components/common/page/CardContainer';
import { CardLoadingSkeleton } from '~/components/common/loading/CardLoadingSkeleton';
import { PageHeader } from '~/components/common/page/PageHeader';
import { requireUser } from '~/utils/session/session.server';
import { checkPuuid } from '~/utils/player/puuid';
import { ROUTES } from '~/config/Routes';

export const loader: LoaderFunction = async ({ request, params }) => {
    const user = await requireUser(request);
    const puuid = params.puuid;
    if (!puuid || !checkPuuid(puuid)) {
        console.log('Invalid Puuid');
        // throw redirect(ROUTES.HOME);
    }
    console.log('Valid puuid');

    return null;
};

const PlayerDetailsPage = () => {
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

            <ContentContainer>
                <CardLoadingSkeleton />
            </ContentContainer>
        </div>
    );
};

export default PlayerDetailsPage;
