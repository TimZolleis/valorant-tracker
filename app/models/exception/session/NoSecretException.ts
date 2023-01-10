export class NoSecretException extends Error {
    static #errorMessage = 'No valid session secret';

    constructor(message: string = NoSecretException.#errorMessage) {
        super(message);
    }
}
