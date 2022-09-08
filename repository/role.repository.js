const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAllRole = async () => {
    return await prisma.role.findMany()
}

const insertRole = async (input) => {
    try {
        await prisma.role.create({
            data: {
                roleName: input.roleName,
            },
        })
        return {
            roleName: input.roleName,
        }
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllRole,
    insertRole,
}
