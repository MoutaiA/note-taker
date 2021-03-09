const fs = require('fs')

const createNote = () => {
    const data = `{
        "title": ${args.title},
        "body": ${args.body}
    }`
    fs.writeFile(`src/data/${user.username}-Dir/note.json`, data, (err) => {
        if (err)
            return console.error(err)
        console.log('Note created')
    })
}