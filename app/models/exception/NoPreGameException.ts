
export class NoPreGameException extends Error {
    static #errorMessage =
        'There was no active Game in PreGame Phase found! Are you sure you are ingame?';

    constructor(message: string = NoPreGameException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, NoPreGameException.prototype);
    }
}
