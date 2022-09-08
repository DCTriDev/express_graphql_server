const {getAllCategory, insertCategory, deleteCategory} = require('../../repository/category.repository')
const categoryResolver = {
    Query: {
        category: () => {
            return getAllCategory()
        },
    },
    Mutation: {
        insertCategory: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return insertCategory(input, accessToken)
        },
        deleteCategory: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return deleteCategory(input, accessToken)
        },
    },
}

module.exports = categoryResolver
