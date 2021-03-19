const app = require('./app/app')
const chalk = require('chalk')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(chalk.bgGreen.black(`Server is running on port ${port}!`))
})