const path = require('path')
const fs = require('fs')

const publicDataPath = path.join(__dirname, '../../data/')

const questions = [{
    type: 'input',
    question: 'What is your username?\t',
    name: 'username',
}, {
    type: 'input',
    question: 'What is your password?\t',
    name: 'password',
}]

const isUserAlreadyExist = user => {
    const userPath = `${publicDataPath}${user.username}-Dir`

    if (fs.existsSync(userPath)) {
        return true
    }
    return false
}

const isValidCredentials = user => {
    const userPath = `${publicDataPath}${user.username}-Dir/user.json`
    const userData = JSON.parse(fs.readFileSync(userPath, 'utf8'))

    if (userData.user !== user.username) {
        return false
    }
    if (userData.password !== user.password) {
        return false
    }

    return true
}

module.exports = {
    publicDataPath,
    questions,
    isUserAlreadyExist,
    isValidCredentials
}