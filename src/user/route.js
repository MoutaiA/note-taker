const express = require('express')
const path = require('path')
const User = require('./model')

const router = express.Router()

router.get('/user', async (req, res) => {
    const { name, password } = req.query
    await User.findOne({ name, password })
        .then(user => {
            if (user) {
                res.status(200).sendFile(path.join(__dirname, '../../public', '/html/user.html'))
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
        .then(() => res.status(200).send({ user }))
        .catch(e => {
            res.status(400).send(`The user ${e.keyValue.name} is already in the database`)
        })
})

router.put('/user', async (req, res) => {
    const { name, password } = req.body
    await User.updateOne({ name, password })
        .then(user => res.status(200).send({ user }))
        .catch(e => res.status(400).send(`The user ${e} can't be found!`))
})

router.delete('/user', async (req, res) => {
    const { name, password } = req.body
    await User.deleteOne({ name, password })
        .then(user => {
            if (user.deletedCount === 1) {
                res.redirect(303, 'http://localhost:3000/')
            } else {
                throw new Error('No user deleted')
            }
        })
        .catch(e => res.status(404).send(e))
})

module.exports = router