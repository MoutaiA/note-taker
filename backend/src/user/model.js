const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            return validator.isEmail(value) ? true : false
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User