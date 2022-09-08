const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const APIError = require('../helper/api.helper')
const {verifyAdmin} = require('../helper/jwt.helper')

const getAllActor = async (accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            return await prisma.actor.findMany()
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const insertActor = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {name, image, birthday, genderId} = input
            console.log(name, image, birthday, genderId)
            await prisma.actor.create({
                data: {
                    name,
                    image,
                    birthday: new Date(+birthday),
                    genderId,
                },
            })
            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        if (e.code === 'P2002') {
            return new APIError({status: 400, message: 'Duplicate actor. Please check your input!'})
        }
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const updateActor = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {id, name, image, birthday, genderId} = input
            console.log(id, name, image, birthday, genderId)
            await prisma.actor.update({
                where: {id},
                data: {
                    name,
                    image,
                    birthday: new Date(+birthday),
                    genderId,
                },
            })
            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

const deleteActor = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {id} = input
            await prisma.actor.delete({where: {id}})
            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        console.log(e)
        if (e.code === 'P2025') {
            return new APIError({status: 400, message: 'Actor is not exist. Please check your input!'})
        }
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllActor,
    insertActor,
    updateActor,
    deleteActor,
}
