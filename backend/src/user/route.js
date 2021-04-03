const express = require('express')
const User = require('./model')
const jwt = require('jsonwebtoken')

const jwtKey = 'mySecretKey'
const jwtExpires = 300

const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send({
            message: 'The information send are invalid or null'
        })
    }

    await User.findOne({ username, password })
        .then(user => {
            if (user) {
                const id = user._id
                const token = jwt.sign({ id }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpires
                })
                res.cookie('token', token, { maxAge: jwtExpires * 1000 })
                res.status(200).send()
            } else {
                throw new Error('No user found')
            }
        })
        .catch(e => {
            console.error(e)
            res.status(500).send({
                message: 'No user found for the credentials specified',
                error: e
            })
        })
})

router.get('/logout', async (req, res) => {
    if (req.cookies.token) {
        delete req.cookies.token
    }
    res.status(200).send()
})

router.get('/user', async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        res.status(404).send({
            message: 'Error: you\'re not supposed to be here!'
        })
    }

    jwt.verify(token, jwtKey, async (err, data) => {
        if (err) {
            res.status(404).send({
                message: err
            })
        }

        await User.findById(data.id)
            .then(user => {
                if (user) {
                    res.status(200).send({
                        message: 'This is the user you have asked for',
                        user
                    })
                } else {
                    throw new Error('There is no user with this id, please make sure to enter the right id')
                }
            })
            .catch(e => res.status(404).send({
                message: 'Error while trying to get the user',
                user: e
            }))
    })
})

router.post('/user', async (req, res) => {
    const { body } = req
    const newUser = await User(body)

    try {
        if (newUser) {
            await newUser.save()
                .then(user => {
                    res.status(200).send({
                        message: 'The user has successfully created',
                        user
                    })
                })
                .catch(e => res.status(400).send({
                    message: 'An error occurred while trying to save the user in the database',
                    error: e
                }))
        } else {
            throw new Error('The user does not exist')
        }
    } catch (e) {
        res.status(500).send({
            message: 'An error occurred',
            error: e
        })
    }
})

router.put('/user', async (req, res) => {
    if (!req.cookies.token) {
        res.status(404).send({
            message: 'No token found'
        })
    }

    const { token } = req.cookies
    jwt.verify(token, jwtKey, async (err, data) => {
        if (err) {
            res.status(404).send('An error occurred')
        }

        const id = data.id

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
})

router.delete('/user', async (req, res) => {
    if (!req.cookies.token) {
        res.status(404).send({
            message: 'Unable to find the user'
        })
    }

    const { token } = req.cookies

    jwt.verify(token, jwtKey, async (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'An error occurred',
                error: err
            })
        }
        await User.findByIdAndDelete(data.id)
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
})

module.exports = router
