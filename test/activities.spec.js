require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

app.set('db', db)

const userCredentials = {
  user_name: "Becki_user",
  password: "BeckisPassword!123"
}

let authToken;

const authenticatedUser = request.agent(app);

describe.only('Activities Endpoint', () => {

  before('Log in as user', (done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .end((err, response) => {
        authToken = response.body.authToken;
        done()
      })
  });

  describe('POST /:org_id', () => {
    it('responds with 201 and the posted activity and its location', () => {
      return request(app)
        .set('authorization', `bearer ${authToken}`)
        .post('/api/activities/3')
        .send({
            org_id: 3,
            title: "Basketball",
            activity_day: "Monday",
            activity_time: "3:30-4:45 PM",
            ages: "6-8",
            activity_group: "Athletics",
            activity_location: "400 - Gym",
            cost: 400,
            dates: "August 27 to December 19",
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1035px-Basketball_Clipart.svg.png",
            activity_description: "This activity is a great choice because it will help your child get out all their energy before you have to take them home and look after them. No more chasing them around after school to sit down at the dinner table - they will work up an appetite in no time, and have fun doing it! We will practice many amazing fitness skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.",
            preparation: "In preparation for participating in this activity, please plan to bring your PE kit or other comfortable athletic clothes and gym shoes to wear during activity.",
            contact:"If you have any questions, please contact teacher@school.org for more information."
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
    });
  });

  describe('GET /:org_id', () => {
    it('responds with 201 and all activities', () => {

    });
  });

  describe('GET /:org_id/:activity_id', () => {
    it('responds with 201 and the expected activity', () => {
      
    });
  });

  describe('PUT /:org_id/:activity_id', () => {

    it('requires the user to authenticate', () => {

    });

    it('responds with status 204 and activity has been successfully modified', () => {

    });
  }); 

  describe('DELETE /:org_id/:activity_id', () => {

    it('requires the user to authenticate', () => {

    });

    it('responds with status 204 and activity is no longer in database', () => {

    });
  });
});