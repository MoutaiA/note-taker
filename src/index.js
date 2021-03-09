const http = require('http')
const chalk = require('chalk')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const { url } = req

    switch (url) {
        case '/':
            res.end('hello, world')
            break
        default:
            res.end('error 404')
            break
    }
})

server.listen(port, () => {
    console.log(chalk.bgGreen.black(`Server up on port ${port}`))
})