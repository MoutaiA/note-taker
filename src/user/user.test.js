const request = require('supertest')
const app = require('../app/app')
const { userOne, userTwo, setupDB } = require('../fixtures/db')

const { name, password } = userOne

beforeEach(setupDB)

describe('GET /user', () => {
    it('Should response the GET method', () => {
        return request(app)
            .get('/user')
            .query({ name, password })
            .expect(200)
    })
})

describe('POST /user', () => {
    it('Should create a user', () => {
        return request(app)
            .post('/user')
            .send({
                name: userTwo.name,
                password: userTwo.password
            })
            .expect(200)
    })
})

describe('PUT /user', () => {
    it('Should update a user', () => {
        return request(app)
            .put('/user')
            .send({ name: 'User0', password })
            .expect(200)
    })
})

describe('DELETE /user', () => {
    it('Should delete a user', () => {
        return request(app)
            .delete('/user')
            .send({ name, password })
            .expect(303)
    })
})