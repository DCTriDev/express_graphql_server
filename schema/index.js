const {makeExecutableSchema} = require('@graphql-tools/schema')
const merge = require('lodash.merge')

const userSchema = require('./user')
const roleSchema = require('./role')
const userRoleSchema = require('./userRole')
const profileSchema = require('./profile')
const accountBalanceSchema = require('./accountBalance')
const genderSchema = require('./gender')
const categorySchema = require('./category')
const actorSchema = require('./actor')
const movieCastSchema = require('./movieCast')
const movieSchema = require('./movie')
const fileUploadSchema = require('./fileUpload')

const schema = makeExecutableSchema({
    typeDefs: [
        userSchema.typeDefs,
        roleSchema.typeDefs,
        userRoleSchema.typeDefs,
        profileSchema.typeDefs,
        accountBalanceSchema.typeDefs,
        genderSchema.typeDefs,
        categorySchema.typeDefs,
        actorSchema.typeDefs,
        movieCastSchema.typeDefs,
        movieSchema.typeDefs,
        fileUploadSchema.typeDefs,
    ],
    resolvers: merge(
        userSchema.resolver,
        roleSchema.resolver,
        userRoleSchema.resolver,
        profileSchema.resolver,
        accountBalanceSchema.resolver,
        genderSchema.resolver,
        categorySchema.resolver,
        actorSchema.resolver,
        movieCastSchema.resolver,
        movieSchema.resolver,
        fileUploadSchema.resolver
    ),
})

module.exports = schema
