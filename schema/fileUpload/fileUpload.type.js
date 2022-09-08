const gql = require('graphql-tag')

const typeDefs = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Photo {
        id: Int
        fileLocation: String
        description: String
        tags: String
    }

    type Query {
        upFile: UploadFileOutput
    }

    type Mutation {
        uploadFile(input: Upload!): UploadFileOutput
    }

    input FileInput {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type UploadFileOutput {
        url: String!
    }
`

module.exports = typeDefs
