const handleUploadMedia = require('../middleware/uploadMediaService')
const uploadFile = async (accessToken, context) => {
    try {
        const {file} = context.files
        const result = await handleUploadMedia(file)
        return {
            url: result.data,
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    uploadFile,
}
