const request = require('supertest')
const app = require('../app/app')
const User = require('./model')
const { userOne, setupDB } = require('../fixtures/db')

beforeEach(setupDB)

describe('GET /user', () => {
    it('Should response the GET method', () => {
        return request(app)
            .get('/user')
            .query({
                name: userOne.name,
                password: userOne.password
            })
            .expect(200)
    })
})