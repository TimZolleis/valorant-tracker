import { ReactNode } from 'react';

export const SmallCard = ({ headline, children }: { headline: string; children: ReactNode }) => {
    return (
        <div className={'py-3 px-5'}>
            <p className={'text-white font-inter font-semibold'}>{headline}</p>
            <div className={'mt-2'}>{children}</div>
        </div>
    );
};
