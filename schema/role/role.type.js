const gql = require('graphql-tag');

const typeDefs = gql`
    type Role {
        id: ID,
        roleName: String,
    }
    
    type Query {
        role: [Role]
    }
    
    type Mutation {
        addRole(input: RoleInput): RoleOutput
    }
    
    input RoleInput {
        roleName: String!
    }

    type RoleOutput {
        roleName: String!
    }
`

module.exports = typeDefs
