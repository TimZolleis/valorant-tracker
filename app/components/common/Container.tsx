import type { ReactNode } from 'react';

const ContentContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'flex w-full'}>
            <div className={'px-8 py-5 rounded-xl bg-white shadow shadow-lg '}>{children}</div>
        </div>
    );
};

export default ContentContainer;
