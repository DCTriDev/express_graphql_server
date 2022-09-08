const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRED_TIME,
        },
        {algorithm: 'HS256'}
    )
}

const decodeToken = (token) => {
    try {
        return {
            status: true,
            data: jwt.verify(token, process.env.SECRET_KEY),
            statusCode: 200,
        }
    } catch (e) {
        if (e == 'TokenExpiredError: jwt expired') {
            return {
                status: false,
                message: 'Session expired. Please login again!',
                statusCode: 401,
            }
        }
        return {
            status: false,
            message: 'Access denied. Please try again!',
            statusCode: 401,
        }
    }
}

const verifyAdmin = (token) => {
    const decoded = decodeToken(token)
    if (decoded.status) {
        if (decoded.data.roleName === 'ADMIN') {
            return {
                status: true,
            }
        } else {
            return {
                status: false,
                message: 'You dont have permission to access this page!',
                statusCode: 403,
            }
        }
    }
    return decoded
}

module.exports = {
    generateToken,
    decodeToken,
    verifyAdmin,
}
