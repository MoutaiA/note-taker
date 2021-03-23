const express = require('express')
const path = require('path')
const User = require('./model')

const router = express.Router()

router.get('/user', async (req, res) => {
    const { username, password } = req.query
    await User.findOne({ username, password })
        .then(user => {
            if (user) {
                res.status(200).send({ user })
            } else {
                throw new Error('User could not be found')
            }
        })
        .catch(e => {
            res.status(404).send(e)
        })
})

router.post('/user', async (req, res) => {
    const { body } = req
    const user = new User(body)
    await user.save()
        .then(() => res.redirect(`http://localhost:3000/user?username=${user.name}&password=${user.password}`))
        .catch(e => {
            res.status(400).send(`The user ${e.keyValue.username} is already in the database`)
        })
})

router.put('/user/:id', async (req, res) => {
    const { id } = req.params
    const fieldsToUpdate = Object.entries(req.body)

    await User.findById(id)
        .then(response => {
            if (response) {
                fieldsToUpdate.forEach(field => response[field[0]] = field[1])
                response.save()
                res.send({
                    message: 'The user have been updated successfully',
                    user: response
                })
            } else {
                throw new Error('The user can\'t be found')
            }
        })
        .catch(e => {
            console.log(e)
            res.status(404).send({
                message: 'Please, provided valid information',
                e
            })
        })
})

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params

    await User.findByIdAndDelete(id)
        .then(user => {
            if (user) {
                res.status(200).send({
                    message: 'The user has been successfully deleted',
                    user
                })
            } else {
                throw new Error('The user could not be found')
            }
        })
        .catch(e => res.status(404).send({
            message: 'An error has occurred while deleting the user',
            user: e
        }))
})

module.exports = router