export class NoCoreGameException extends Error {
    static #errorMessage =
        'There was no active Game in CoreGame Phase found! Are you sure you are ingame?';

    constructor(message: string = NoCoreGameException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, NoCoreGameException.prototype);
    }
}
