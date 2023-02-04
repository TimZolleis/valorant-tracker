import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import DefaultLayout from '~/components/layout/DefaultLayout';
import styles from './styles/app.css';
import { getUserFromSession } from '~/utils/session/session.server';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});
export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUserFromSession(request);
    return json({
        user,
    });
};

export default function App() {
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <DefaultLayout>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </DefaultLayout>
            </body>
        </html>
    );
}
