import { NoCurrentMatchComponent } from '~/components/match/NoCurrentMatchComponent';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Live, { LiveMatchLoaderData } from '~/routes/match/live';
import { PregameComponent } from '~/components/match/current/PregameComponent';
import { CoregameComponent } from '~/components/match/current/CoregameComponent';
import { useOptionalUser } from '~/utils/hooks/matches';

type GameStatus = 'unknown' | 'pregame' | 'coregame';

const CurrentMatchComponent = () => {
    const user = useOptionalUser();
    const fetcher = useFetcher<LiveMatchLoaderData>();

    const checkForGame = () => {
        fetcher.load('/match/live');
    };
    const [loadingState, setLoadingState] = useState(false);
    useEffect(() => {
        if (fetcher.data?.pregame) {
            setGameStatus('pregame');
        }
        if (fetcher.data?.coregame) {
            setGameStatus('coregame');
        }
        if (fetcher.data?.error) {
            setGameStatus('unknown');
        }
    }, [fetcher]);

    useEffect(() => {
        if (fetcher.type === 'done') {
            setLoadingState(false);
        }
        if (fetcher.type === 'normalLoad') {
            setLoadingState(true);
        }
    }, [fetcher.type]);

    const [gameStatus, setGameStatus] = useState<GameStatus>('unknown');

    if (gameStatus === 'pregame' && fetcher.data?.pregame) {
        return <PregameComponent pregame={fetcher.data?.pregame} />;
    }
    if (gameStatus === 'coregame' && fetcher.data?.coregame) {
        return <CoregameComponent coregame={fetcher.data.coregame}></CoregameComponent>;
    } else {
        return <NoCurrentMatchComponent onUpdate={checkForGame} isLoading={loadingState} />;
    }
};

export default CurrentMatchComponent;
