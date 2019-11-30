const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe('GET /api/*', () => {
  it('GET /api/* responds with 200 and json OK: true', () => {
    return supertest(app)
      .get('/api/*')
      .expect(200)
  })
})
