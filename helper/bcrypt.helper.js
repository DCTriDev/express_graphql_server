const bcrypt = require('bcryptjs')

const generateHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const verifyPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    generateHashPassword,
    verifyPassword,
}
