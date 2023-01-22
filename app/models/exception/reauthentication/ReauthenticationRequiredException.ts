export class InvalidReauthenticationCookiesException extends Error {
    static #errorMessage = 'Reauthentication required!';
    constructor(message: string = InvalidReauthenticationCookiesException.#errorMessage) {
        super(message);
    }
}
