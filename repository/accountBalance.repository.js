const {PrismaClient} = require('@prisma/client')
const {decodeToken} = require('../helper/jwt.helper')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAccountBalanceByUserId = async (input) => {
    return await prisma.accountBalance.findUnique({
        where: {
            userId: input.userId,
        },
    })
}

const deposit = async (input, accessToken) => {
    try {
        const decoded = decodeToken(accessToken)
        if (decoded.status) {
            return await prisma.accountBalance.update({
                where: {
                    userId: decoded.data.userId,
                },
                data: {
                    balance: {
                        increment: +input.amount,
                    },
                },
            })
        } else {
            return new APIError({status: 401, message: decoded.message})
        }
    } catch (e) {
        return e
    }
}

const getUserBalance = async (input, accessToken) => {
    const decoded = decodeToken(accessToken)
    try {
        if (decoded.status) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.data.userId.toLowerCase(),
                },
                include: {
                    accountBalance: true,
                },
            })
            return {
                username: user.username,
                balance: user.accountBalance.balance,
            }
        } else return new APIError({status: 403, message: decoded.message})
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const purchaseMovie = async (input, accessToken) => {
    const decoded = decodeToken(accessToken)
    console.log(decoded)
    try {
        if (decoded.status) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.data.userId,
                },
                include: {
                    accountBalance: true,
                },
            })

            const movie = await prisma.movie.findUnique({
                where: {
                    id: input.movieId,
                },
            })

            if (user.accountBalance.balance >= movie.price) {
                await prisma.accountBalance.update({
                    where: {
                        userId: user.id,
                    },
                    data: {
                        balance: {
                            decrement: movie.price,
                        },
                    },
                })

                await prisma.purchasedMovie.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                        movie: {
                            connect: {
                                id: movie.id,
                            },
                        },
                    },
                })

                return {
                    movieId: movie.id,
                    accountBalance: {
                        balance: user.accountBalance.balance - movie.price,
                    },
                }
            } else return new APIError({status: 403, message: 'Insufficient balance!'})
        } else return new APIError({status: 403, message: decoded.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const getUserBalanceWithAccessToken = async (accessToken) => {
    try {
        if (accessToken === 'null') {
            return new APIError({status: 406, message: 'You must be login to watch or purchase this content!'})
        }
        const decoded = decodeToken(accessToken)
        if (decoded.status) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.data.userId,
                },
                include: {
                    accountBalance: true,
                },
            })
            return {
                username: user.username,
                balance: user.accountBalance.balance,
            }
        } else return new APIError({status: 401, message: decoded.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAccountBalanceByUserId,
    deposit,
    getUserBalance,
    purchaseMovie,
    getUserBalanceWithAccessToken,
}
