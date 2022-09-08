const gql = require('graphql-tag')

const typeDefs = gql`
    type User {
        id: Int
        username: String
        password: String
    }

    type Query {
        user: [GetAllUserOutput]
        getUserInfo: GetUserInfoOutput
    }

    type Mutation {
        signup(input: SignUpInput): SignUpOutput
        login(input: LoginInput): LoginOutput
        updateUserAdmin(input: UpdateUserAdminInput): StatusOutput
        deleteUserAdmin(input: DeleteUserAdminInput): StatusOutput
    }

    type GetAllUserOutput {
        id: Int
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        roleName: String
        genderId: Int
    }

    type GetUserInfoOutput {
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        genderId: Int
        balance: Int
        purchasedMovie: [Movie]
    }

    input SignUpInput {
        username: String
        password: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        genderId: Int
    }

    type SignUpOutput {
        username: String
        password: String
        roleName: String
    }

    input LoginInput {
        username: String
        password: String
    }

    type LoginOutput {
        username: String
        avatar: String
        fullName: String
        email: String
        phoneNumber: String
        roleName: String
        accessToken: String
    }

    input UpdateUserAdminInput {
        id: Int!
        username: String
        fullName: String
        email: String
        phoneNumber: String
        birthday: String
        avatar: String
        roleName: String
        genderId: Int
    }

    type StatusOutput {
        status: Boolean
    }

    input DeleteUserAdminInput {
        id: Int!
    }
`

module.exports = typeDefs
