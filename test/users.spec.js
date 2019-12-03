require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

app.set('db', db);

const userCredentials = {
  user_name: 'Becki_user',
  password: 'BeckisPassword!123'
};

let authToken;

const authenticatedUser = request.agent(app);

function createUniqueString() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

describe('Users Endpoints', () => {
  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })

  context('Given user is not authenticated', () => {
    describe(`GET /:username`, () => {
      //myschooluser should respond with org_id 1
      it(`responds with 201 and user's associated org_id`, () => {
        const expectedOrgId = { org_id: 1 };
        return supertest(app)
          .get(`/api/users/myschooluser`)
          .expect(201, expectedOrgId)
      });
    });

    describe(`POST /:org_id`, () => {
      let orgId;

      before((done) => {
        // POST a new org with unique string
        const newOrgName = createUniqueString();
        console.log({newOrgName});

        authenticatedUser
          .post('/api/orgs/')
          .send({ org_name: newOrgName })
          .then((response) => {
            orgId = response.body.id;
            done();
          })
      })

      it(`creates a user, responding with 201`, () => {
        const newUsername = createUniqueString();
        const testUser = {
          user_name: newUsername,
          password: 'MyP@ssw0rd'
        };

        return supertest(app)
          .post(`/api/users/${orgId}`)
          .send(testUser)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201)
        });
    });
  })

  context('Given user is authenticated', () => {
    describe(`GET /orgID`, () => {
      
      it('should require auth', () => {
        return supertest(app)
          .get('/api/users/orgID')
          .expect(401);
      });

      it(`responds with 200 and user's associated org_id`, () => {
        const expectedOrgId = '3';
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get('/api/users/orgID')
          .expect(201, expectedOrgId)
      });

    });
  });
});