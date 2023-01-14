import { useOptionalUser } from '~/utils/hooks/user';
import { json, LoaderFunction } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { getPlayerRank, PlayerRank } from '~/utils/player/rank.server';
import { useLoaderData } from '@remix-run/react';
import { PlayerRankComponent } from '~/components/user/rank/PlayerRank';
import ContentContainer from '~/components/common/Container';

type LoaderData = {
    user: AuthenticatedValorantUser;
    rank: PlayerRank;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const rank = await getPlayerRank(user, user.puuid);
    return json<LoaderData>({ user, rank });
};

export default function Index() {
    const { rank } = useLoaderData<LoaderData>();

    const user = useOptionalUser();
    return (
        <div>
            <p className={'font-manrope text-headline-medium'}>My Rank</p>
            <ContentContainer>
                <PlayerRankComponent rank={rank} />
            </ContentContainer>
        </div>
    );
}
