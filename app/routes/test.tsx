import { defer, json, LoaderFunction } from '@remix-run/node';
import { Modal, useModal } from '~/components/common/page/Modal';
import { PlayerInMatchDetailsModal } from '~/components/player/PlayerInMatchDetailsModal';
import { WhiteButton } from '~/components/form/button/WhiteButton';
import { TEST_MATCH } from '~/config/clientConfig';
import { getPlayersInMatchDetails } from '~/utils/player/player.server';
import { getMatchMap } from '~/utils/match/match.server';
import { requireUser } from '~/utils/session/session.server';
import { useLoaderData } from '@remix-run/react';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { globalCache } from '~/utils/api/redis/RedisClient';

type LoaderData = {
    playersData: PlayerInMatch[];
};
export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const pregame = TEST_MATCH;
    const players = pregame.AllyTeam.Players;
    if (!globalCache().has('players-test')) {
        const [playersData] = await Promise.all([getPlayersInMatchDetails(user, players)]);
        globalCache().set('players-test', JSON.stringify(playersData));
    }
    const playersData = JSON.parse(globalCache().get('players-test')!);
    return json<LoaderData>({
        playersData,
    });
};

const TestPage = () => {
    const { playersData } = useLoaderData<LoaderData>();
    const { showModal, toggleModal } = useModal(true);
    return (
        <>
            <PlayerInMatchDetailsModal players={playersData} />
        </>
    );
};

export default TestPage;
