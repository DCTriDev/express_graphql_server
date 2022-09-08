const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const os = require('os')
const formData = require('express-form-data')
const {corsOptions} = require('./middleware/cors.middleware')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
}

app.use(
    '/api',
    cors(corsOptions),
    formData.parse(options),
    formData.stream(),
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        customFormatErrorFn: (error) => {
            prisma.$disconnect()
            return {
                message: error.originalError?.message || error.message,
                status: error.originalError?.status || 500,
            }
        },
    })
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app
