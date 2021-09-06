class UnauthorizedError extends Error {
    name = 'UnauthorizedError'
    code = 401
    constructor(message, description) {
        super(message);
        this.description = description
    }
}
module.exports = UnauthorizedError