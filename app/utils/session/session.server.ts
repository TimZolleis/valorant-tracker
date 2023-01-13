import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getLoginCookieOptions } from '~/utils/session/cookie.server';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { red } from 'kleur/colors';

function getStorage() {
    return createCookieSessionStorage({
        cookie: {
            ...getLoginCookieOptions(),
            httpOnly: true,
        },
    });
}

export async function createLoginSession(user: AuthenticatedValorantUser, redirectTo: string) {
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

export async function updateSession(
    request: Request,
    user: AuthenticatedValorantUser,
    redirectUrl: string
) {
    const session = await getSession(request);
    session.set('user', user);
    return redirect(redirectUrl, {
        headers: {
            'Set-Cookie': await getStorage().commitSession(session),
        },
    });
}

export async function destroySession(request: Request, redirectTo: string) {
    const session = await getSession(request);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await getStorage().destroySession(session),
        },
    });
}

export async function getUserFromSession(
    request: Request
): Promise<AuthenticatedValorantUser | undefined> {
    const session = await getSession(request);
    const user: AuthenticatedValorantUser | undefined = session.get('user');

    if (user) {
        return new AuthenticatedValorantUser(
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

export async function requireUser(request: Request): Promise<AuthenticatedValorantUser> {
    const user = await getUserFromSession(request);
    if (!user) {
        throw redirect('/login');
    }
    return user;
}
