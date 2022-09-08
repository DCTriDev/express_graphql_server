const {getAllProfile, getUserProfile, updateProfile, updateAvatar} = require('../../repository/profile.repository')

const profileResolver = {
    Query: {
        profile: () => {
            return getAllProfile()
        },
    },
    Mutation: {
        getUserProfile: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getUserProfile(input, accessToken)
        },
        updateProfile: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateProfile(input, accessToken)
        },
        updateAvatar: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateAvatar(input, accessToken)
        },
    },
}

module.exports = profileResolver
