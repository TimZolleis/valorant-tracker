export class NoTokenException extends Error {
    static #errorMessage = 'No Token present in Riot Response';

    constructor(message: string = NoTokenException.#errorMessage) {
        super(message);
    }
}
