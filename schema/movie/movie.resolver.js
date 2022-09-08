const {
    getAllMovie,
    getDetailMovie,
    getSourceMovie,
    getAllMovieAdmin,
    updateMovieBasic,
    insertMovie,
    deleteMovie,
    updateMovieCategory,
} = require('../../repository/movie.respository')

const movieResolver = {
    Query: {
        movie: () => {
            return getAllMovie()
        },
        getAllMovieAdmin: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllMovieAdmin(accessToken)
        },
    },
    Mutation: {
        getDetailMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getDetailMovie(input, accessToken)
        },
        getSourceMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getSourceMovie(input, accessToken)
        },
        updateMovieBasic: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateMovieBasic(input, accessToken)
        },
        insertMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return insertMovie(input, accessToken)
        },
        deleteMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return deleteMovie(input, accessToken)
        },
        updateMovieCategory: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateMovieCategory(input, accessToken)
        },
    },
}

module.exports = movieResolver
