const {getAllActor, insertActor, updateActor, deleteActor} = require('../../repository/actor.repository')

const actorResolver = {
    Query: {
        actor: (arent, {input}, context) => {
            const accessToken = context.headers.authorization
            return getAllActor(accessToken)
        },
    },
    Mutation: {
        insertActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return insertActor(input, accessToken)
        },
        updateActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return updateActor(input, accessToken)
        },
        deleteActor: (parent, {input}, context) => {
            const accessToken = context.headers.authorization
            return deleteActor(input, accessToken)
        },
    },
}

module.exports = actorResolver
