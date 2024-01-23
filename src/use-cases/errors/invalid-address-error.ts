export class InvalidAddressError extends Error {
    constructor() {
        super('Invalid CEP.')
    }
}