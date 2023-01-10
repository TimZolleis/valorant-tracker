import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getLoginCookieOptions } from '~/utils/session/cookie.server';
import { ValorantUser } from '~/models/user/ValorantUser';

function getStorage() {
    return createCookieSessionStorage({
        cookie: {
            ...getLoginCookieOptions(),
            httpOnly: true,
        },
    });
}

export async function createLoginSession(user: ValorantUser, redirectTo: string) {
    const session = await getStorage().getSession();
    session.set('user', user);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await getStorage().commitSession(session),
        },
    });
}

export async function getSession(request: Request) {
    return await getStorage().getSession(request.headers.get('Cookie'));
}

export async function destroySession(request: Request, redirectTo: string) {
    const session = await getSession(request);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await getStorage().destroySession(session),
        },
    });
}

export async function getUserFromSession(request: Request): Promise<ValorantUser | undefined> {
    const session = await getSession(request);
    const user: ValorantUser | undefined = session.get('user');

    if (user) {
        return new ValorantUser(
            user.username,
            user.displayName,
            user.accessToken,
            user.reauthenticationCookies,
            user.entitlement,
            user.region,
            user.puuid
        );
    } else return undefined;
}
