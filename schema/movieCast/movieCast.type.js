const gql = require('graphql-tag')

const typeDefs = gql`
    type MovieCast {
        movieId: Int
        actorId: Int
    }

    type Query {
        movieCast: [GetAllMovieCastOutPut]
    }

    type Mutation {
        getMovieCastByMovieId(input: getMovieCastByMovieIdInput): GetMovieCastByMovieIdOutput
        updateMovieActor(input: UpdateMovieActorInput): StatusOutput
    }

    type GetAllMovieCastOutPut {
        movieId: Int
        actorId: [Actor]
    }

    input getMovieCastByMovieIdInput {
        movieId: Int!
    }

    type GetMovieCastByMovieIdOutput {
        movieId: Int
        actors: [Actor]
    }

    input UpdateMovieActorInput {
        movieId: Int!
        actorIdArr: [Int]
    }
`

module.exports = typeDefs
