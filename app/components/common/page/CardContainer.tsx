import { ReactNode } from 'react';

export const CardContainer = ({
    headline,
    subtext,
    imageUrl,
    children,
}: {
    headline: string;
    subtext: string;
    imageUrl: string;
    children: ReactNode;
}) => {
    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <img className={'h-6'} src={imageUrl} alt='' />
                </span>
            </div>
            <div className={'mt-5'}>
                <p className={'font-inter text-title-medium text-white font-bold'}>{headline}</p>
                <p className={'font-inter text-body-medium text-gray-400 font-normal'}>{subtext}</p>
            </div>

            <section className={'mt-5'}>{children}</section>
        </div>
    );
};
