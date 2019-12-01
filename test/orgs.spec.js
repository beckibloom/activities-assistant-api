require('dotenv').config();
const app = require('../src/app');
const supertest = require('supertest');
const knex = require('knex');
const helpers = require('./test-helpers');

describe('Orgs Endpoints', () => {
  let db;
  const testOrgs = helpers.makeOrgsArray();
  
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

  describe(`GET /api/orgs/`, () => {

    context(`Given no orgs`, () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/orgs/')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, []);
      });
    });

    context(`Given orgs in the database`, () => {
      beforeEach('insert orgs', () => {
        helpers.seedOrgs(db, testOrgs);
      });

      it('responds with 200 and all orgs', () => {
        const expectedOrgs = testOrgs;
        return supertest(app)
          .get('/api/orgs/')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, expectedOrgs);
      });
    });
  });

  describe(`POST /api/orgs/`, () => {
    it('creates an org, responding with 201 and new org', () => {
      const testOrg = testOrgs[0];
      return supertest(app)
        .post('/api/orgs/')
        .send(testOrg)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .expect(res => {
          db
            .from('activities_orgs')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(org => {
              expect(org.id).to.eql(testOrg.id)
              expect(org.org_name).to.eql(testOrg.org_name)
            });
        });
    });
  });
});