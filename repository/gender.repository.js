const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')

const getAllGender = async () => {
    try {
        return await prisma.gender.findMany()
    } catch (e) {
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllGender,
}
