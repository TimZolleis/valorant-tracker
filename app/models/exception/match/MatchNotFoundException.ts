export class MatchNotFoundException extends Error {
    static #errorMessage = 'The match was not found';
    constructor(message: string = MatchNotFoundException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, MatchNotFoundException.prototype);
    }
}
