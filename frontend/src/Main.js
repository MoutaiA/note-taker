import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Home from './Home'
import User from './User'

function Main() {
    return (
        <Router>
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/user" component={User} />
                </Switch>
            </main>
        </Router>
    )
}

export default Main