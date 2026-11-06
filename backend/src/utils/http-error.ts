/**
 * Error with an HTTP status code. Services throw it for business rules
 * (e.g. an out of stock article cannot be requested) and the error
 * middleware turns it into a JSON response.
 */
export class HttpError extends Error {
    constructor(
        public readonly status: number,
        message: string
    ) {
        super(message);
        this.name = "HttpError";
    }
}
