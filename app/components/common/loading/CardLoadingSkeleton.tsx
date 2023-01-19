import { LoadingSkeleton } from '~/components/common/loading/LoadingSkeleton';

export const CardLoadingSkeleton = () => {
    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <LoadingSkeleton width={'w-8'} height={'h-8'} />
                </span>
            </div>
            <div className={'mt-5 space-y-3'}>
                <LoadingSkeleton width={'w-48'} height={'h-8'} />
                <LoadingSkeleton width={'w-40'} height={'h-4'} />
                <LoadingSkeleton width={'w-64'} height={'h-4'} />
            </div>

            <section className={'mt-5'}>
                <LoadingSkeleton width={'h-40'} height={'h-40'} />
            </section>
        </div>
    );
};
