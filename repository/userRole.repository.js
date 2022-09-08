const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAllUserRole = async () => {
    try {
        return await prisma.userRole.findMany()
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const getUserRoleById = async (input) => {
    try {
        return await prisma.userRole.findUnique({
            where: {
                userId: input.userId,
            },
        })
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const updateUserRole = async (input) => {
    if (input.userId || input.roleId) {
        try {
            await prisma.userRole.update({
                where: {
                    userId: input.userId,
                },
                data: {
                    userId: input.userId,
                    roleId: input.roleId,
                },
            })
            return true
        } catch (e) {
            return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
        } finally {
            await prisma.$disconnect()
        }
    } else {
        return false
    }
}

module.exports = {
    getAllUserRole,
    getUserRoleById,
    updateUserRole,
}
