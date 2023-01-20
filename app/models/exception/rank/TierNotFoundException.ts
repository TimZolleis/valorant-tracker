export class TierNotFoundException extends Error {
    static #errorMessage = 'The players rank was not found';
    constructor(message: string = TierNotFoundException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, TierNotFoundException.prototype);
    }
}
