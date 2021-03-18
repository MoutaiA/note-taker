const app = require('./app')
const request = require('supertest')

describe('Test the root path', () => {
    it('Should response the GET method for the root', done => {
        return request(app)
            .get('/')
            .expect(200)
            .end(done)
    })

    it('Should response the GET method for the favicon', done => {
        return request(app)
            .get('/favicon')
            .expect(404)
            .end(done)
    })
})

it('Should response the GET method for the 404 status code', done => {
    return request(app)
        .get('/*')
        .expect(404)
        .end(done)
})