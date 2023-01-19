import { NoCurrentMatchComponent } from '~/components/match/NoCurrentMatchComponent';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { LiveMatchLoaderData } from '~/routes/match/live';
import { PregameComponent } from '~/components/match/current/PregameComponent';

type GameStatus = 'unknown' | 'pregame' | 'coregame';

const CurrentMatchComponent = () => {
    const fetcher = useFetcher<LiveMatchLoaderData>();
    useEffect(() => {
        if (fetcher.type === 'init') {
            fetcher.load('/match/live');
        }
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

    const [gameStatus, setGameStatus] = useState<GameStatus>('unknown');

    if (gameStatus === 'pregame' && fetcher.data?.pregame) {
        return <PregameComponent pregame={fetcher.data?.pregame} />;
    } else {
        return <NoCurrentMatchComponent />;
    }
};

export default CurrentMatchComponent;
