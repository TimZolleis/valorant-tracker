export class InvalidCredentialsException extends Error {
    static #errorMessage = 'The provided credentials are not correct!';

    constructor(message: string = InvalidCredentialsException.#errorMessage) {
        super(message);
    }
}
