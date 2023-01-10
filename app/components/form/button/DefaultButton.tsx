import { useTransition } from '@remix-run/react';

const DefaultButton = ({ text, canLoad = true }: { text: string; canLoad?: boolean }) => {
    const state = useTransition().state;
    const isLoading = state === 'submitting' || state === 'loading';
    return (
        <>
            <div className={'w-full flex'}>
                <button
                    className={
                        'w-full rounded-xl bg-valorant-red p-3 py-4 font-work-sans text-title-medium font-normal text-white'
                    }>
                    {canLoad ? (isLoading ? 'Loading' : text) : text}
                </button>
            </div>
        </>
    );
};

export default DefaultButton;
