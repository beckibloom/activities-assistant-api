require('dotenv').config();
const app = require('../src/app');
const supertest = require('supertest');
const request = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');
const xss = require('xss');

describe('Users Endpoints', () => {
  let db;
  const { testOrgs, testUsers, testActivities } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  context('Given user is not authenticated', () => {
    describe(`GET /:username`, () => {
      beforeEach('insert users', () => {
        helpers.seedUsers(db, testOrgs, testUsers)
      })

      it(`responds with 201 and user's associated org_id`, () => {
        const expectedUser = testUsers[0];
        const expectedOrgId = { org_id: testOrgs[0].id };
        return supertest(app)
          .get(`/api/users/${expectedUser.user_name}`)
          .expect(201, expectedOrgId)
      });
    });

    describe(`POST /:org_id`, () => {
      beforeEach('insert orgs', () => {
        helpers.seedOrgs(db, testOrgs);
      });

      it(`creates a user, responding with 201 and user object`, () => {
        const testUser = {
          password: testUsers[0].password,
          user_name: testUsers[0].user_name,
        };
        const orgId = testUsers[0].org_id;
        const expectedUser = {
          id: testUsers[0].id,
          user_name: xss(testUsers[0].user_name),
          org_id: testUsers[0].org_id,
        };
        return supertest(app)
          .post(`/api/users/${orgId}`)
          .send(testUser)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201)
          .expect(res => {
            db
              .from('activities_users')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then(user => {
                expect(user).to.eql(expectedUser)
                expect(user.id).to.eql(expectedUser.id)
                expect(user.user_name).to.eql(expectedUser.user_name)
                expect(user.org_id).to.eql(expectedUser.org_id)
              })
          })
        });
    });
  })

  context('Given user is authenticated', () => {
    let authToken;
    const userCredentials = {
      user_name: testUsers[0].user_name,
      password: testUsers[0].password
    }
    const authenticatedUser = request.agent(app);

    before('insert users', () => {
      helpers.seedUsers(db, testOrgs, testUsers);
    })
    
    describe(`GET /orgID`, () => {

      // Log in is returning 400 as if user/password is incorrect or not found
      before('Log in as user', (done) => {
        authenticatedUser
          .post('/api/auth/login')
          .set('content-type', 'application/json')
          .send(userCredentials)
          .end((err, res) => {
            authToken = res.authToken;
            done();
          });
      });
      
      it('should require auth', () => {
        return supertest(app)
          .get('/api/users/orgID')
          .expect(401);
      });

      it(`responds with 200 and user's associated org_id`, () => {
        return authenticatedUser
          .set('authorization', `bearer ${authToken}`)
          .get('/api/users/orgID')
          .expect(200, testUsers[0].org_id)
      });

    });
  });
});