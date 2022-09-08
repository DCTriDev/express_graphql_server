class APIError extends Error {
    constructor({status, message}) {
        const fullMessage = `${status}: ${message}`

        super(fullMessage)
        this.status = status
        this.message = message
    }
}

module.exports = APIError
