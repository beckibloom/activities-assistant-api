require('dotenv').config();
const app = require('../src/app');
const supertest = require('supertest');
const request = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');
const xss = require('xss');

describe('Users Endpoints: Seeding database', () => {
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

      it.skip(`responds with 201 and user's associated org_id`, () => {
        const expectedUser = testUsers[0];
        const expectedOrgId = { org_id: testOrgs[0].id };
        return supertest(app)
          .get(`/api/users/${expectedUser.user_name}`)
          .expect(201, expectedOrgId)
      });
    });

    //not sure why this one isn't working. Maybe the testUser object is not created right? Server is expecting req.body with {password, user_name}. Or, perhaps helpers.makeFixtures() is not working as expected on line 10?
    describe(`POST /:org_id`, () => {
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
    // // let authToken;
    // // const authenticatedUser = request.agent(app);
    describe(`GET /orgID`, () => {
      it(`responds with 200 and user's associated org_id`, () => {
        //send authToken
        //response is expected user's org_id
      });
    });
  });
});

describe.skip('Users Endpoints: Using existing database', () => {
  const userCredentials = {
    user_name: 'DemoUser',
    password: 'HelloW0rld!'
  };

  let authToken;

  const authenticatedUser = request.agent(app);

  context('Given user has not been authenticated', () => {
    const db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  
    app.set('db', db);

    describe('GET /:username', () => {
      it(`responds with 201 and the expected user's orgId`, () => {

      });
    });

    describe('POST /:orgId', () => {
      it(`responds with 201 and the expected user object`, () => {

      });
    });
  });

  context('Given user has authenticated', () => {
    const db = knex({
      client: 'pg',
      connection: process.env.CONNECTION_URL,
    });
  
    app.set('db', db);

    before((done) => {
      authenticatedUser
        .post('/api/login')
        .send(userCredentials)
        .end((err, response) => {
          authToken = response.body.authToken;
          done();
        })
    })

    describe('GET /orgID', () => {
      it('requires user to be authenticated', () => {
        return supertest(app)
          .get('/api/orgID')
          .expect(400);
      });

      it(`responds with 201 and the expected user's orgId`, () => {

      });
    });
  });
});