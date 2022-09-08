const gql = require('graphql-tag')

const typeDefs = gql`
    type Gender {
        id: Int
        gender: String
    }

    type Query {
        gender: [Gender]
    }
`

module.exports = typeDefs
