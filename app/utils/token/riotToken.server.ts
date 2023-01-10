import { NoTokenException } from '~/models/exception/login/NoTokenException';
import { AccessToken } from '~/models/interfaces/AccessToken';

export function parseTokenData(uri: string): { idToken: string; accessToken: AccessToken } {
    const url = new URL(uri);
    const params = new URLSearchParams(url.hash.substring(1));
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (!accessToken) {
        throw new NoTokenException();
    }
    if (!idToken) {
        throw new NoTokenException();
    }
    return {
        idToken,
        accessToken,
    };
}
