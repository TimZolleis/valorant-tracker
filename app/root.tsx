import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import DefaultLayout from '~/components/layout/DefaultLayout';
import { getUserFromSession } from '~/utils/session/session.server';
import type { ValorantUser } from '~/models/user/ValorantUser';
import { json } from '@remix-run/node';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
});

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = {
    user?: ValorantUser;
};
export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUserFromSession(request);

    return json<LoaderData>({ user });
};

export default function App() {
    const user = useLoaderData<LoaderData>();
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
