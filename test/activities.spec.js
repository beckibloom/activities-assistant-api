require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');

describe('Activities Endpoint', () => {
  let db;

  const { testOrgs, testUsers, testActivities } = helpers.makeFixtures()

  let userCredentials = {
    user_name: testUsers[0].user_name,
    password: testUsers[0].password
  };

  let authToken;

  const authenticatedUser = request.agent(app);

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db))

  //not sure of the right place for this yet
  // before((done) => {
  //   authenticatedUser
  //     .post('/api/login')
  //     .send(userCredentials)
  //     .end((err, response) => {
  //       authToken = response.body.authToken;
  //       done();
  //     });
  // });

  describe('GET /:org_id', () => {
    beforeEach('insert activities', () => {
      helpers.seedActivities(db, testOrgs, testActivities);
    });

    it('responds with 201 and all activities', () => {
      const chosenOrg = testOrgs[0]
      const expectedActivities = helpers.makeExpectedActivities(chosenOrg.id, testActivities)
      return supertest(app)
        .get(`/api/activities/${chosenOrg.id}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201, expectedActivities);
    });
  });

  describe('POST /:org_id', () => {
    it('requires the user to authenticate', () => {

    });

    it('responds with 201 and the posted activity and its location', () => {

    });
  });

  describe('GET /:org_id/:activity_id', () => {
    it('responds with 201 and the expected activity', () => {
      
    });
  });

  describe('DELETE /:org_id/:activity_id', () => {
    it('requires the user to authenticate', () => {

    });

    it('responds with status 204 and activity is no longer in database', () => {

    });
  });

  describe('PUT /:org_id/:activity_id', () => {
    it('requires the user to authenticate', () => {

    });

    it('responds with status 204 and activity has been successfully modified', () => {

    });
  }); 

});