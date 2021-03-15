const chalk = require('chalk')
require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const userRouter = require('./user/route')

const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(userRouter)

app.get('/', async (req, res) => {
    res.send('end of get')
})

app.get('/favicon.ico', (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log(chalk.bgGreen.black(`Server is running on port ${port}!`))
})