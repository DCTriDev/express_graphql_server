const gql = require('graphql-tag')

const typeDefs = gql`
    type UserRole {
        userId: Int
        roleId: Int
    }

    type Query {
        userRole: [UserRole]
    }

    type Mutation {
        getUserRoleById(input: GetUserRoleByIdInput): UserRole
        updateUserRole(input: UpdateProfileInput): UserRole
    }

    input GetUserRoleByIdInput {
        userId: Int!
    }

    input UpdateUserRoleInput {
        userId: Int!
        roleId: Int!
    }
`

module.exports = typeDefs
