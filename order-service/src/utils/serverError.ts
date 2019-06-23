/**
 * @namespace Utils
 * @class ServerError
 * @extends Error
 */
export class ServerError extends Error {
    public name: string;
    public code: ErrorCode;

    constructor(message: string, errorCode: ErrorCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ServerError.name;
        this.code = errorCode;
    }

    public toJSON(): any {
        return {
            error: this.message,
            code: this.code,
        };
    }
}

/**
 * @namespace Utils
 * @enum ErrorCode
 */
export enum ErrorCode {
    NOT_ENOUGH_DATA = 1001,
    FIELD_VALIDATION,
    DATABASE_CONSTRAINT,
    DATABASE_ERROR,
    ALREADY_EXISTS,
    RECORD_NOT_FOUND,
}
