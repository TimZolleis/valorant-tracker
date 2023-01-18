export class GeneralApiException extends Error {
    constructor(element: string, cause: string) {
        super(`Unable to fetch ${element} due to ${cause}`);
    }
}
