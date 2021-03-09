const { createUser } = require('./utils/user/create-user')
const { removeUser } = require('./utils/user/remove-user')

const args = require('minimist')(process.argv.slice(2))

const main = async () => {
    if (args['create']) {
        createUser()
    }

    if (args['remove']) {
        removeUser()
    }
}

main()