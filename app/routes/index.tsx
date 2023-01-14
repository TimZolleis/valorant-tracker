import { useOptionalUser } from '~/utils/hooks/user';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { PlayerRank } from '~/utils/player/rank.server';
import { getPlayerRank } from '~/utils/player/rank.server';
import { useLoaderData } from '@remix-run/react';
import { PlayerRankComponent } from '~/components/user/rank/PlayerRank';
import ContentContainer from '~/components/common/Container';
import { getCompetitiveHistory } from '~/utils/player/history.server';
import {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import PlayerCompetitiveUpdateComponent from '~/components/user/competitive/PlayerCompetitiveUpdateComponent';
import { PlayerRRDifferenceComponent } from '~/components/user/competitive/PlayerRRDifferenceComponent';

type LoaderData = {
    user: AuthenticatedValorantUser;
    rank: PlayerRank;
    competitiveUpdate: ValorantCompetitiveUpdate;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const rank = await getPlayerRank(user, user.puuid);
    const competitiveUpdate = await getCompetitiveHistory(user);
    console.log('Competitive update length', competitiveUpdate.Matches.length);
    return json<LoaderData>({ user, rank, competitiveUpdate });
};

function calculateRrDifference(matches: ValorantMatch[]) {
    let difference = 0;
    matches.forEach((match) => {
        difference += match.RankedRatingEarned;
    });
    return difference;
}

export default function Index() {
    const { rank, competitiveUpdate } = useLoaderData<LoaderData>();
    const user = useOptionalUser();
    return (
        <>
            <p className={'text-white font-manrope font-bold text-headline-small mb-3'}>My Data</p>
            <div className={'flex gap-2 w-full'}>
                <ContentContainer>
                    <PlayerRankComponent
                        rank={rank}
                        rankDifference={calculateRrDifference(
                            competitiveUpdate.Matches
                        )}></PlayerRankComponent>
                </ContentContainer>
            </div>
            <ContentContainer>
                <PlayerCompetitiveUpdateComponent competitiveUpdate={competitiveUpdate} />
            </ContentContainer>
        </>
    );
}
