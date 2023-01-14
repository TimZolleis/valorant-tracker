import type { ReactNode } from 'react';

const ContentContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'flex w-full'}>
            <div className={'p-5 rounded-xl ring ring-1 ring-gray-600'}>{children}</div>
        </div>
    );
};

export default ContentContainer;
