const express = require('express')
require('../db/mongoose')

const userRouter = require('../user/route')

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(userRouter)

app.get('/favicon.ico', (req, res) => {
    res.send()
})

app.get('/*', (req, res) => {
    const error404 = '<h1>404</h1><a href="/">Back</a>'
    res.status(404).send(error404)
})

module.exports = app