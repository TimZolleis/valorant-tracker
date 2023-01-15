import type { ReactNode } from 'react';

const ContentContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'flex w-full transition ease-in-out delay-150 hover:bg-mud'}>
            <div className={'p-5 rounded-xl ring ring-1 ring-gray-600 w-full'}>{children}</div>
        </div>
    );
};

export default ContentContainer;
