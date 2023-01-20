export class MatchMapNotFoundException extends Error {
    static #errorMessage = 'The Map was not found';
    constructor(message: string = MatchMapNotFoundException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, MatchMapNotFoundException.prototype);
    }
}
