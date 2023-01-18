import { NoCurrentMatchComponent } from '~/components/match/NoCurrentMatchComponent';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { LiveMatchLoaderData } from '~/routes/match/live';

const CurrentMatchComponent = () => {
    const fetcher = useFetcher<LiveMatchLoaderData>();
    useEffect(() => {
        if (fetcher.type === 'init') {
            fetcher.load('/match/live');
        }

        if (fetcher.data?.pregame || fetcher.data?.coregame) {
            console.log(fetcher.data?.playersData);
            setHasGame(true);
        }
        if (fetcher.data?.error) {
            setHasGame(false);
        }
    }, [fetcher]);

    const [hasGame, setHasGame] = useState(false);

    if (hasGame) {
        return <div className={'text-white'}>Lol Game going on</div>;
    } else {
        return <NoCurrentMatchComponent />;
    }
};

export default CurrentMatchComponent;
