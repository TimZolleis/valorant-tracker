import { NoSecretException } from '~/models/exception/session/NoSecretException';

type CookieOptions = {
    name: string;
    secure: boolean;
    secrets: Array<string>;
    path: string;
    maxAge: number;

    sameSite: 'lax';
};
export function getLoginCookieOptions(): CookieOptions {
    const secret = process.env.SECRET;
    if (!secret) {
        throw new NoSecretException();
    }
    const name = 'Valorant-Store-Session';
    const secure = false;
    const sameSite = 'lax';
    const path = '/';
    const secrets = [secret];
    const maxAge = 60 * 60 * 24 * 60;

    return { name, secure, secrets, maxAge, sameSite, path };
}
