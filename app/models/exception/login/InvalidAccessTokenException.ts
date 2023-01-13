export class InvalidAccessTokenException extends Error {
    static #errorMessage = 'Invalid access token';

    constructor(message: string = InvalidAccessTokenException.#errorMessage) {
        super(message);
    }
}
