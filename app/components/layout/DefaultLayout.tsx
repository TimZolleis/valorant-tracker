import type { ReactNode } from 'react';
import NavBar from '~/components/nav/NavBar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavBar />
            <main className={'p-5'}>{children}</main>
        </>
    );
};

export default DefaultLayout;
