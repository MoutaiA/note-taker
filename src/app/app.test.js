const app = require('./app')
const request = require('supertest')

describe('Test the root path', () => {
    it('Should response the GET method for the root', () => {
        return request(app)
            .get('/')
            .expect(200)
    })

    it('Should response the GET method for the favicon', () => {
        return request(app)
            .get('/favicon')
            .expect(404)
    })
})

it('Should response the GET method for the 404 status code', () => {
    return request(app)
        .get('/*')
        .expect(404)
})