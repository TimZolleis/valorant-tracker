export class InvalidCredentialsException extends Error {
    static #errorMessage = 'The provided credentials were not correct';

    constructor(message: string = InvalidCredentialsException.#errorMessage) {
        super(message);
    }
}
