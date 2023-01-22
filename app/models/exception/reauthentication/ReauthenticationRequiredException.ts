import { redirect } from '@remix-run/node';

export class ReauthenticationRequiredException extends Error {
    static #errorMessage = 'Reauthentication required!';

    constructor(message: string = ReauthenticationRequiredException.#errorMessage) {
        super(message);
    }
    handle() {
        throw redirect('/reauth', {
            headers: {
                'X-Remix-Redirect': '/reauth',
            },
            statusText: 'Please reauthenticate',
        });
    }
}
