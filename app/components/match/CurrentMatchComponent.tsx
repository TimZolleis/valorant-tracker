import { NoCurrentMatchComponent } from '~/components/match/NoCurrentMatchComponent';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { LiveMatchLoaderData } from '~/routes/match/live';

const CurrentMatchComponent = () => {
    const fetcher = useFetcher<LiveMatchLoaderData>();
    useEffect(() => {
        if (fetcher.type === 'init') {
            fetcher.load('/match/live');
        }
    }, [fetcher]);

    if (fetcher.data?.error) {
        return <NoCurrentMatchComponent />;
    } else {
        return <div>Live match going on!</div>;
    }
};

export default CurrentMatchComponent;
