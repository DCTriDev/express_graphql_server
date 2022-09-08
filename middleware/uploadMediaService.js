const axios = require('axios')
const FormData = require('form-data')

const handleUploadMedia = (data) => {
    const payload = new FormData()
    payload.append('image', data)
    const config = {
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: `Client-ID b09ad4b0e1a2552`,
            ...payload.getHeaders(),
        },
        data: payload,
    }

    return axios(config)
        .then(function (response) {
            console.log(response.data.data.link)
            return {
                status: true,
                data: response.data.data.link,
            }
        })
        .catch(function (error) {
            return {
                status: false,
                data: error,
            }
        })
}

module.exports = handleUploadMedia
