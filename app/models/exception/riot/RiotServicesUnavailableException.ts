export class RiotServicesUnavailableException extends Error {
    static #errorMessage =
        'Unfortunately, the Riot Game Services are unavailable right now. Please try again later!';

    constructor(message: string = RiotServicesUnavailableException.#errorMessage) {
        super(message);
        Object.setPrototypeOf(this, RiotServicesUnavailableException.prototype);
    }
}
