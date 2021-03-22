import React, { Fragment } from 'react'

function Home() {
    const handleSubmit = e => {
        const name = e.target[0].value
        const password = e.target[1].value
        window.location.href = `http://localhost:3000/user?name=${name}&password=${password}`
        e.preventDefault()
    }

    return (
        <Fragment>
            <form id="login" onSubmit={handleSubmit.bind(this)}>
                <label>login: </label>
                <input type="text" required name="name" />
                <label>password: </label>
                <input type="password" required name="password" />
                <button type="submit">Send</button>
            </form>

            <form id="create" onSubmit={handleSubmit.bind(this)}>
                <label>login: </label>
                <input type="text" required name="name" />
                <label>password: </label>
                <input type="text" required name="password" />
                <button type="submit">Send</button>
            </form>
        </Fragment>
    )
}

export default Home
