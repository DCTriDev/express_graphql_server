const gql = require('graphql-tag')

const typeDefs = gql`
    type Actor {
        id: Int
        name: String
        image: String
        birthday: String
        gender: String
    }

    type Query {
        actor: [Actor]
    }

    type Mutation {
        insertActor(input: InsertActorInput): StatusOutput
        updateActor(input: UpdateActorInput): StatusOutput
        deleteActor(input: DeleteActorInput): StatusOutput
    }

    input InsertActorInput {
        name: String
        image: String
        birthday: String
        genderId: Int
    }

    input UpdateActorInput {
        id: Int!
        name: String
        image: String
        birthday: String
        genderId: Int
    }

    input DeleteActorInput {
        id: Int!
    }

    extend type Actor {
        genderId: Int
    }
`

module.exports = typeDefs
