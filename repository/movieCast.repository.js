const {PrismaClient} = require('@prisma/client')
const APIError = require('../helper/api.helper')
const {groupBy, refetch} = require('../helper/common.helper')
const {verifyAdmin} = require('../helper/jwt.helper')
const prisma = new PrismaClient()

let refetchCount = 0

const getAllMovieCast = async () => {
    try {
        const data = await prisma.movieCast.findMany({
            include: {
                actor: true,
            },
        })
        const newDataGroupBy = groupBy(data, (movieCast) => movieCast.movieId)
        let responseArr = []
        newDataGroupBy.forEach((item) => {
            responseArr.push({
                movieId: item[0].movieId,
                actor: item.map((actor) => {
                    return actor.actor
                }),
            })
        })
        refetchCount = 0
        return responseArr
    } catch (e) {
        refetchCount++
        refetch(refetchCount, getAllMovieCast, null, 400, 'Server is busy. Please try again!')
    } finally {
        await prisma.$disconnect()
    }
}

const getMovieCastByMovieId = async (input) => {
    const {movieId} = input
    try {
        const data = await prisma.movieCast.findMany({
            where: {
                movieId: movieId,
            },
            include: {
                actor: true,
            },
        })

        const actorArray = data.map((item) => {
            return {
                ...item.actor,
            }
        })
        return {
            movieId: movieId,
            actors: actorArray,
        }
    } catch (e) {
        console.log(e)
        if (e == 'PrismaClientInitializationError') {
            console.log(true)
        }
        refetchCount++
        refetch(refetchCount, getMovieCastByMovieId, input, 400, 'Server is busy. Please try again!')
    } finally {
        await prisma.$disconnect()
    }
}

const updateMovieActor = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {movieId, actorIdArr} = input
            await prisma.movieCast.deleteMany({
                where: {
                    movieId,
                },
            })
            const data = actorIdArr.map((item) => {
                return {
                    movieId,
                    actorId: item,
                }
            })
            await prisma.movieCast.createMany({
                data,
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

module.exports = {
    getAllMovieCast,
    getMovieCastByMovieId,
    updateMovieActor,
}
