import { useOptionalUser } from '~/utils/hooks/user';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import type { LoadoutLoaderData } from '~/routes/api.user.loadout';

export const Profile = () => {
    const user = useOptionalUser();
    const fetcher = useFetcher<LoadoutLoaderData>();

    useEffect(() => {
        fetcher.load('/api/user/loadout');
    }, []);

    return (
        <>
            <div className={'flex gap-2 items-center'}>
                <p className={'font-work-sans font-semibold text-white text-title-medium'}>
                    {user?.displayName}
                </p>
                <img
                    className={'rounded-full h-12'}
                    src={fetcher.data?.playerCard.smallArt}
                    alt=''
                />
            </div>
        </>
    );
};
