const {
    deposit,
    getAccountBalanceByUserId,
    getUserBalance,
    purchaseMovie,
    getUserBalanceWithAccessToken,
} = require('../../repository/accountBalance.repository')

const accountBalanceResolver = {
    Query: {
        accountBalance: (input) => {
            return getAccountBalanceByUserId(input)
        },
        getUserBalanceWithAccessToken: (parent, input, context) => {
            const accessToken = context.headers.authorization
            return getUserBalanceWithAccessToken(accessToken)
        },
    },
    Mutation: {
        deposit: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return deposit(input, accessToken)
        },
        getUserBalance: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getUserBalance(input, accessToken)
        },
        purchaseMovie: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return purchaseMovie(input, accessToken)
        },
    },
}

module.exports = accountBalanceResolver
