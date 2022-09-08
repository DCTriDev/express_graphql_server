const {getAllMovieCast, getMovieCastByMovieId, updateMovieActor} = require('../../repository/movieCast.repository')

const movieCastResolver = {
    Query: {
        movieCast: () => {
            return getAllMovieCast()
        },
    },
    Mutation: {
        getMovieCastByMovieId: (parent, {input}) => {
            return getMovieCastByMovieId(input)
        },
        updateMovieActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateMovieActor(input, accessToken)
        },
    },
}

module.exports = movieCastResolver
