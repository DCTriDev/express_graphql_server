const gql = require('graphql-tag')

const typeDefs = gql`
    type Category {
        id: Int
        categoryName: String
    }

    type Query {
        category: [Category]
    }

    type Mutation {
        insertCategory(input: CategoryInput): Category
        deleteCategory(input: CategoryInput): Category
        updateCategory(input: CategoryInput): Category
    }

    input CategoryInput {
        categoryName: String!
    }
`

module.exports = typeDefs
