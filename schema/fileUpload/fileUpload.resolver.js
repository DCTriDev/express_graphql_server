const {uploadFile} = require('../../repository/fileUpload.respository')

const fileUploadResolver = {
    Mutation: {
        uploadFile: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return uploadFile(accessToken, context)
        },
    },
}

module.exports = fileUploadResolver
