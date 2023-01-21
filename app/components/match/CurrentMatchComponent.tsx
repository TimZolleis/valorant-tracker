import { NoCurrentMatchComponent } from '~/components/match/NoCurrentMatchComponent';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Live, { LiveMatchLoaderData } from '~/routes/match/live';
import { PregameComponent } from '~/components/match/current/PregameComponent';

type GameStatus = 'unknown' | 'pregame' | 'coregame';

const CurrentMatchComponent = () => {
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
    } else {
        return <NoCurrentMatchComponent onUpdate={checkForGame} isLoading={loadingState} />;
    }
};

export default CurrentMatchComponent;
