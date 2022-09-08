const {getAllGender} = require('../../repository/gender.repository')
const genderResolver = {
    Query: {
        gender: () => {
            return getAllGender()
        },
    },
}

module.exports = genderResolver
