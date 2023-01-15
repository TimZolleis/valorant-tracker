import { useOptionalUser } from '~/utils/hooks/user';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { PlayerRank } from '~/utils/player/rank.server';
import { getPlayerRank } from '~/utils/player/rank.server';
import { useLoaderData } from '@remix-run/react';
import { PlayerRankComponent } from '~/components/user/competitive/rank/PlayerRankComponent';
import ContentContainer from '~/components/common/Container';
import { getCompetitiveHistory } from '~/utils/player/history.server';
import type {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import CurrentMatchComponent from '~/components/match/CurrentMatchComponent';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';
import { RankHistoryComponent } from '~/components/match/history/RankHistoryComponent';

type LoaderData = {
    user: AuthenticatedValorantUser;
    rank: PlayerRank;
    competitiveUpdate: ValorantCompetitiveUpdate;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const rank = await getPlayerRank(user, user.puuid);
    const competitiveUpdate = await getCompetitiveHistory(user);
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
            <div className={'space-y-5'}>
                <div className={'flex gap-2 w-full'}>
                    <ContentContainer>
                        <CurrentMatchComponent />
                    </ContentContainer>
                </div>
                <div className={'flex gap-5 w-full'}>
                    <ContentContainer>
                        <MatchHistoryComponent />
                    </ContentContainer>
                    <ContentContainer>
                        <RankHistoryComponent />
                    </ContentContainer>
                </div>
            </div>
        </>
    );
}
