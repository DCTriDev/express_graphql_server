const {PrismaClient} = require('@prisma/client')
const {decodeToken} = require('../helper/jwt.helper')
const APIError = require('../helper/api.helper')
const prisma = new PrismaClient()

const getAllProfile = async () => {
    return await prisma.profile.findMany()
}

const getUserProfile = async (input, accessToken) => {
    const {username} = input
    try {
        const isValidToken = decodeToken(accessToken)
        if (isValidToken.status) {
            const userInfo = await prisma.$queryRaw`
                SELECT username, "fullName", avatar, email, "phoneNumber", "birthday", gender FROM "User" as U
                JOIN "Profile" as P ON P."userId" = U."id"
                JOIN "Gender" as G ON G."id" = P."genderId"
                WHERE U."username" = ${username.toLowerCase()}
            `
            if (userInfo.length !== 0) {
                return {
                    ...userInfo[0],
                }
            } else {
                throw new APIError({
                    status: 404,
                    message: 'Username could not be found. Please sign up first or try again!',
                })
            }
        } else {
            throw new APIError({status: 403, message: isValidToken.message})
        }
    } catch (error) {
        return error
    } finally {
        await prisma.$disconnect()
    }
}

const updateProfile = async (input, accessToken) => {
    try {
        const decoded = decodeToken(accessToken)
        if (decoded.status) {
            return await prisma.profile.update({
                where: {
                    userId: decoded.data.userId,
                },
                data: {
                    ...input,
                    birthday: new Date(+input.birthday),
                },
            })
        } else {
            throw new APIError({status: 403, message: decoded.message})
        }
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const updateAvatar = async (input, accessToken) => {
    try {
        const decoded = decodeToken(accessToken)
        if (decoded.status) {
            return await prisma.profile.update({
                where: {
                    userId: decoded.data.userId,
                },
                data: {
                    avatar: input.avatar,
                },
            })
        } else {
            throw new APIError({status: 403, message: decoded.message})
        }
    } catch (e) {
        console.log(e)
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllProfile,
    getUserProfile,
    updateProfile,
    updateAvatar,
}
