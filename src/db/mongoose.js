const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
console.log(uri)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))