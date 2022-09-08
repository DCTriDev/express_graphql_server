const APIError = require('./api.helper')
const groupBy = (arr, keyGetter) => {
    const map = new Map()
    arr.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map
}

const refetch = (refetchCount, fn, input, status, message) => {
    if (refetchCount < 3) {
        switch (refetchCount) {
            case 1:
                console.log('Ah shit! Here we go again!')
                break
            case 2:
                console.log('Oh no! No no no no no no!')
                break
            default:
                console.log('Good night! It is enough time coding today!')
        }
        return fn(input)
    } else return new APIError({status: status, message: message})
}

module.exports = {
    groupBy,
    refetch,
}
