export class EnvironmentVariableNotPresentException extends Error {
    constructor(variable: string) {
        super(`Environment variable ${variable} not present! Please check your configuration`);
    }
}
