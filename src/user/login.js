const inquirer = require('inquirer')
const { questions, isUserAlreadyExist, isValidCredentials } = require('./common')

const loginUser = () => {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer['username'] && answer['password']) {
                if (isUserAlreadyExist(answer)) {
                    if (isValidCredentials(answer)) {
                        const { username, password } = answer
                        console.log('User logged!')
                        return { username, password }
                    } else {
                        throw new Error('The credentials provided do not match!')
                    }
                } else {
                    throw new Error('The user does not exist!')
                }
            } else {
                throw new Error('Please fill all the fields before validate!')
            }
        })
}

module.exports = {
    loginUser
}