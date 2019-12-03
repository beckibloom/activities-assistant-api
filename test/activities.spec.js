require('dotenv').config();
const app = require('../src/app');
const request = require('supertest');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

const userCredentials = {
  user_name: 'Becki_user',
  password: 'BeckisPassword!123'
};

let authToken;

const authenticatedUser = request.agent(app);

function getFirstActivityId(db) {
  return db
    .from('activities_activities')
    .where('org_id', 3)
    .first('id');
};


describe.only('Activities Endpoint', () => {

  before((done) => {
    authenticatedUser
      .post('/api/auth/login')
      .send(userCredentials)
      .then((response) => {
        authToken = response.body.authToken;
        done();
      })
  })
  
  // GET requests are public and test routes only make GET requests to org_id 1
  describe('GET /:org_id', () => {
    it('responds with 201 and all activities', () => {
      const expectedActivities = [ { id: 5,
        orgId: 1,
        title: 'Science Club',
        day: 'Tuesday',
        time: '3:30-4:45 PM',
        ages: '3-5',
        group: 'STEAM',
        location: '401 - Science',
        cost: 400,
        dates: 'August 27 to December 19',
        thumbnail:
         'http://images.clipartpanda.com/science-clip-art-c39d8747b92efcfb9921b0dc55d81c7f.jpg',
        details:
         { description:
            'This activity is a great choice because it will encourage your childs curiosity about the world and engage their critical thinking. We will have fun doing experiments such as X, Y, and Z, and creating things like A, B, and C!',
           preparation:
            'In preparation for participating in this activity, please plan to bring a smock or old t-shirt to protect your childs uniform from getting messy with our experiments.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 3,
        orgId: 1,
        title: 'Chess is fun',
        day: 'Thursday',
        time: '3:30-4:45 PM',
        ages: '6-8',
        group: 'General Enrichment',
        location: '310 - Ms. Arnotts Room',
        cost: 350,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://us.123rf.com/450wm/mix3r/mix3r1505/mix3r150500315/40632827-stock-vector-chess-pieces-business-sign-corporate-identity-template-for-chess-club-or-chess-school-standard-chess.jpg?ver=6',
        details:
         { description:
            'This activity is a great choice because it will help your child use critical thinking to solve complex problems. We will practice key strategies for playing this ancient game, including X, Y, and Z, and we will also practice teamwork and make friends.',
           preparation:
            'There is nothing to prepare before coming to this activity.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 1,
        orgId: 1,
        title: 'New Basketball',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '6-8',
        group: 'Athletics',
        location: '400 - Gym',
        cost: 400,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1035px-Basketball_Clipart.svg.png',
        details:
         { description:
            'This activity is a great choice because it will help your child get out all their energy before you have to take them home and look after them. No more chasing them around after school to sit down at the dinner table - they will work up an appetite in no time, and have fun doing it! We will practice many amazing fitness skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your PE kit or other comfortable athletic clothes and gym shoes to wear during activity.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 15,
        orgId: 1,
        title: 'hello new club',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '9-11',
        group: 'General Enrichment',
        location: '510 - Ms. Covello\'s Room',
        cost: 0,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png',
        details:
         { description:
            'This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 19,
        orgId: 1,
        title: 'another new club',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '9-11',
        group: 'General Enrichment',
        location: '510 - Ms. Covello\'s Room',
        cost: 0,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png',
        details:
         { description:
            'This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 20,
        orgId: 1,
        title: 'another new club1',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '9-11',
        group: 'General Enrichment',
        location: '510 - Ms. Covello\'s Room',
        cost: 0,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png',
        details:
         { description:
            'This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } },
      { id: 21,
        orgId: 1,
        title: '21 but make it fun',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '9-11',
        group: 'General Enrichment',
        location: '510 - Ms. Covello\'s Room',
        cost: 0,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png',
        details: { 
           description:
            'This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' } } ];
      return authenticatedUser
        .get('/api/activities/1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201, expectedActivities)
    });
  });

  // GET requests are public and test routes only make GET requests to org_id 1
  describe('GET /:org_id/:activity_id', () => {
    it('responds with 201 and the expected activity', () => {
      const expectedActivity = { 
        id: 21,
        orgId: 1,
        title: '21 but make it fun',
        day: 'Monday',
        time: '3:30-4:45 PM',
        ages: '9-11',
        group: 'General Enrichment',
        location: '510 - Ms. Covello\'s Room',
        cost: 0,
        dates: 'August 27 to December 19',
        thumbnail:
         'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png',
        details: { 
           description:
            'This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.',
           preparation:
            'In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.',
           contact:
            'If you have any questions, please contact teacher@school.org for more information.' }};
       return authenticatedUser
          .get('/api/activities/1/21')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(201, expectedActivity)
    });
  });

  //POST requests use requireAuth and should only interact with the org_id 3 (Becki_user)
  describe('POST /:org_id', () => { 
    it('responds with 201 and the posted activity and its location', () => {
      return authenticatedUser
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

  //PUT requests use requireAuth and should only interact with the org_id 3 (Becki_user)
  describe('PUT /:org_id/:activity_id', () => {
    let activityId;

    before((done) => {
      authenticatedUser
        .get('/api/activities/3')
        .then((response) => {
          activityId = response.body[0].id;
          done();
        })
    })

    it('requires the user to authenticate', () => {
      const updatedActivity = { 
        org_id: 3,
        title: 'new title for activity id 21',
        activity_day: 'Tuesday',
        activity_time: '5-6 PM',
        ages: '3-5',
        activity_group: 'STEAM',
        activity_location: 'Room 108',
        cost: 50,
        dates: 'Jan 6 to Apr 3',
        thumbnail:
         'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&w=1000&q=80',
        details: { 
           activity_description:
            'This activity needs a new description.',
           preparation:
            'Here is some information about how to prepare.',
           contact:
            'Do not contact me about this activity.' }};

      return supertest(app)
        .put(`/api/activities/3/${activityId}`)
        .send(updatedActivity)
        .expect(401);
    });

    it('responds with status 204 and activity has been successfully modified', () => {
      const updatedActivity = { 
        org_id: 3,
        title: 'new title for activity id 21',
        activity_day: 'Tuesday',
        activity_time: '5-6 PM',
        ages: '3-5',
        activity_group: 'STEAM',
        activity_location: 'Room 108',
        cost: 50,
        dates: 'Jan 6 to Apr 3',
        thumbnail:
         'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?ixlib=rb-1.2.1&w=1000&q=80',
        details: { 
           activity_description:
            'This activity needs a new description.',
           preparation:
            'Here is some information about how to prepare.',
           contact:
            'Do not contact me about this activity.' }};

      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .put(`/api/activities/3/${activityId}`)
        .send(updatedActivity)
        .expect(204)
    });
  }); 

  //DELETE requests use requireAuth and should only interact with the org_id 3 (Becki_user)
  describe('DELETE /:org_id/:activity_id', () => {
    let activityIdToDelete;

    before((done) => {
      authenticatedUser
        .get('/api/activities/3')
        .then((response) => {
          activityIdToDelete = response.body[0].id;
          done();
        })
    })

    it('requires the user to authenticate', () => {
      return supertest(app)
        .delete(`/api/activities/1/${activityIdToDelete}`)
        .expect(401);
    });

    it('responds with status 204 and activity is no longer in database', () => {
      return authenticatedUser
        .set('authorization', `bearer ${authToken}`)
        .delete(`/api/activities/1/${activityIdToDelete}`)
        .expect(204)
    });
  });
});