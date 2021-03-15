const express = require('express')
const User = require('./model')

const router = express.Router()

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    await User.findById(id)
        .then(user => res.status(200).send(user))
        .catch(e => res.status(404).send(e))
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
        .then(() => res.status(200).send())
        .catch(e => res.status(400).send(e))
})

module.exports = router