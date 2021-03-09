const inquirer = require('inquirer')
const fs = require('fs')
const { publicDataPath, questions, isUserAlreadyExist } = require('./common')

const createUserDir = async user => {
    fs.mkdir(`${publicDataPath}${user.username}-Dir`, (err) => {
        if (err)
            return console.error(err)
        console.log('User folder created!')
    })
}

const createUserConfig = async user => {
    const data = `{"user": "${user.username}",\n"password": "${user.password}"}`
    fs.appendFile(`${publicDataPath}${user.username}-Dir/user.json`, data, err => {
        if (err)
            return console.error(err)
        console.log('User config folder created!')
    })
}

const createUserHandler = async user => {
    createUserDir(user)
    createUserConfig(user)
}

const createUser = async () => {
    console.log('Hello, this is the CLI for helping you to create an user account!')

    inquirer.prompt(questions)
        .then(answer => {
            if (answer['username'] && answer['password']) {
                if (!isUserAlreadyExist(answer)) {
                    createUserHandler(answer)
                } else {
                    throw new Error('Error: User already exists')
                }
            } else {
                throw new Error('Failed to create a user!')
            }
        })
        .catch(e => console.error(e))
}

module.exports = {
    createUser
}