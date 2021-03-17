const mongoose = require('mongoose')
const User = require('../user/model')

const userOne = {
    name: 'User1',
    password: '12345678'
}

const userTwo = {
    name: 'User2',
    password: '12345678'
}

beforeAll(done => {
    done()
})

afterAll(done => {
    mongoose.connection.close()
    done()
})


const setupDB = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOne,
    userTwo,
    setupDB
}