import type { ReactNode } from 'react';
import { ResizablePanel } from '~/components/common/page/ResizablePanel';

const ContentContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'flex w-full transition ease-in-out delay-150 hover:bg-mud'}>
            <div className={'rounded-xl ring ring-1 ring-gray-600 w-full'}>
                <ResizablePanel>{children}</ResizablePanel>
            </div>
        </div>
    );
};

export default ContentContainer;
