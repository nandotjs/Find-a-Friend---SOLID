export class ORGAlreadyExistsError extends Error {
    constructor() {
        super('Email already exists.')
    }
}