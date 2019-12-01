const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello! Welcome to Activities Assistant."', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello! Welcome to Activities Assistant.')
  })
})