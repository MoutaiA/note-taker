const inquirer = require('inquirer')
const { remove } = require('fs-extra')
const { publicDataPath, questions, isUserAlreadyExist, isValidCredentials } = require('./common')

const removeDir = user => {
    remove(`${publicDataPath}${user.username}-Dir`, err => {
        if (err)
            return console.error(err)
        console.log('The user has been removed')
    })
}

const removeUser = () => {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer['username'] && answer['password']) {
                if (isUserAlreadyExist(answer)) {
                    if (isValidCredentials(answer)) {
                        removeDir(answer)
                    } else {
                        throw new Error('The given credentials are invalid!')
                    }
                } else {
                    throw new Error('The user doesn\'t exist or has already been removed!')
                }
            } else {
                throw new Error('Error login!')
            }
        })
}

module.exports = {
    removeUser
}