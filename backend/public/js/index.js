const updateForm = document.getElementById('update')
const deleteForm = document.getElementById('delete')

updateForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = updateForm[0].value
    const password = updateForm[1].value

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    }

    fetch('http://localhost:3000/user', options)
        .then(res => res.json())
        .catch(err => console.error(err))
})

deleteForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = deleteForm[0].value
    const password = deleteForm[1].value

    const url = location.href

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    }

    fetch(url, options)
        .then(res => {
            if (res.url) {
                document.location.href = res.url
            }
        })
        .catch(err => console.error(err))
})