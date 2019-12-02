const bcrypt = require('bcryptjs');

function makeOrgsArray() {
  return [
    {
      id: 1,
      org_name: "My School",
    },
    {
      id: 2,
      org_name: "Another School",
    },
    {
      id: 3,
      org_name: "Park District",
    }
  ];
};

function makeUsersArray(orgs) {
  return [
    {
      id: 1,
      user_name: "MySchoolUser",
      password: bcrypt.hash("HelloW0rld!", 12),
      org_id: orgs[0].id
    },
    {
      id: 2,
      user_name: "AnotherUser",
      password: bcrypt.hash("H3lloWorld!", 12),
      org_id: orgs[1].id
    },
    {
      id: 3,
      user_name: "ParkUser",
      password: bcrypt.hash("He11oWorld!", 12),
      org_id: orgs[2].id
    },
  ];
};

function makeActivitiesArray(orgs) {
  return [
    {
      id: 1,
      orgId: orgs[0].id,
      title: "Basketball",
      day: "Monday",
      time: "3:30-4:45 PM",
      ages: "6-8",
      group: "Athletics",
      location: "400 - Gym",
      cost: 400,
      dates: "August 27 to December 19",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1035px-Basketball_Clipart.svg.png",
      details: {
        description: "This activity is a great choice because it will help your child get out all their energy before you have to take them home and look after them. No more chasing them around after school to sit down at the dinner table - they will work up an appetite in no time, and have fun doing it! We will practice many amazing fitness skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.",
        preparation: "In preparation for participating in this activity, please plan to bring your PE kit or other comfortable athletic clothes and gym shoes to wear during activity.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    },
    {
      id: 2,
      orgId: orgs[0].id,
      title: "Homework Club",
      day: "Monday",
      time: "3:30-4:45 PM",
      ages: "9-11",
      group: "General Enrichment",
      location: "510 - Ms. Covello's Room",
      cost: 0,
      dates: "August 27 to December 19",
      thumbnail: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png",
      details: {
        description: "This activity is a great choice because it will help your child finish their homework with the help of their peers and teachers. No more arguing at home over getting homework done - they will complete their work here at school, and feel encouraged to learn and grow! We will practice many amazing studying strategies, including X, Y, and Z, and we will also practice resilience and critical thinking.",
        preparation: "In preparation for participating in this activity, please plan to bring your homework, planner, and writing utensil.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }     
    },
    {
      id: 3,
      orgId: orgs[0].id,
      title: "Chess Club",
      day: "Thursday",
      time: "3:30-4:45 PM",
      ages: "6-8",
      group: "General Enrichment",
      location: "310 - Ms. Arnott's Room",
      cost: 350,
      dates: "August 27 to December 19",
      thumbnail: "https://us.123rf.com/450wm/mix3r/mix3r1505/mix3r150500315/40632827-stock-vector-chess-pieces-business-sign-corporate-identity-template-for-chess-club-or-chess-school-standard-chess.jpg?ver=6",
      details: {
        description: "This activity is a great choice because it will help your child use critical thinking to solve complex problems. We will practice key strategies for playing this ancient game, including X, Y, and Z, and we will also practice teamwork and make friends.",
        preparation: "There is nothing to prepare before coming to this activity.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    },
    {
      id: 4,
      orgId: orgs[0].id,
      title: "Choir",
      day: "Wednesday",
      time: "3:30-4:45 PM",
      ages: "9-11",
      group: "Performing Arts",
      location: "314 - Music",
      cost: 0,
      dates: "August 27 to December 19",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1CXaWvLUDqggrACEiyx-kavT6foyconA7odMNyKDHtFc-Sb9X",
      details: {
        description: "This activity is a great choice because it will help your child grow their confidence and self-expression. Learning to use their voice in a positive way in choir will lead to more confidence in many aspects of their life, as well as giving them an outlet to express themselves and connect with art and friends. We will practice many musical skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.",
        preparation: "There is nothing to prepare for this activity.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    },
    {
      id: 5,
      orgId: orgs[0].id,
      title: "Science Club",
      day: "Tuesday",
      time: "3:30-4:45 PM",
      ages: "3-5",
      group: "STEAM",
      location: "401 - Science",
      cost: 400,
      dates: "August 27 to December 19",
      thumbnail: "http://images.clipartpanda.com/science-clip-art-c39d8747b92efcfb9921b0dc55d81c7f.jpg",
      details: {
        description: "This activity is a great choice because it will encourage your child's curiosity about the world and engage their critical thinking. We will have fun doing experiments such as X, Y, and Z, and creating things like A, B, and C!",
        preparation: "In preparation for participating in this activity, please plan to bring a smock or old t-shirt to protect your child's uniform from getting messy with our experiments.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    },
    {
      id: 6,
      orgId: orgs[1].id,
      title: "Girls Soccer",
      day: "Friday",
      time: "7:30-8:15 AM",
      ages: "9-11",
      group: "Athletics",
      location: "400 - Gym",
      cost: 0,
      dates: "August 27 to December 19",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQE7vg3mg2Ckc77kohjbD7XNSF9FnF_n9xX4qHL87_u5j0rA9I5",
      details: {
        description: "This activity is a great choice because it will help your child get out all their energy before the school day begins. We will practice many amazing fitness skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.",
        preparation: "In preparation for participating in this activity, please plan to bring your PE kit or other comfortable athletic clothes and gym shoes to wear during activity.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    },
    {
      id: 7,
      orgId: orgs[2].id,
      title: "Taekwondo",
      day: "Wednesday",
      time: "3:30-4:45 PM",
      ages: "6-8",
      group: "Athletics",
      location: "200 - Canteen",
      cost: 450,
      dates: "August 27 to December 19",
      thumbnail: "https://i.pinimg.com/originals/f0/4f/40/f04f40f4a9a51e9955209c6bf70f1874.jpg",
      details: {
        description: "This activity is a great choice for any child. Taekwondo promotes good discipline and allows children to work toward their goals by earning higher belts as their skills advance. We will practice many amazing fitness skills, including X, Y, and Z, and we will also practice excellent teamwork and cooperation.",
        preparation: "In preparation for participating in this activity, please plan to bring your Taekwondo uniform and gym shoes to wear during activity. If you do not have a Taekwondo uniform, you may order one with your instructor on the first day of class.",
        contact:"If you have any questions, please contact teacher@school.org for more information."
      }
    }
  ];
};

function makeExpectedActivities(orgId, activities) {
  const expectedActivities = activities.filter(activity => activity.org_id === orgId);

  return expectedActivities;
};

// make sure that comparison values are both integers
function makeExpectedActivity(orgId, activities, activityId) {
  const expectedActivities = activities.filter(activity => activity.org_id === orgId);

  const expectedActivity = expectedActivities.find(activity => activity.id === activityId);

  return expectedActivity;
};

function makeFixtures() {
  const testOrgs = makeOrgsArray();
  const testUsers = makeUsersArray(testOrgs);
  const testActivities = makeActivitiesArray(testOrgs);
  return { testOrgs, testUsers, testActivities };
};

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      activities_activities,
      activities_users,
      activities_orgs
      RESTART IDENTITY CASCADE`
  )
};

function seedOrgs(db, orgs) {
  return db.into('activities_orgs')
    .insert(orgs)
    .then(() => {
      //updating the auto sequence to stay in sync
      db.raw(
        `SELECT setval
        ('activities_orgs_id_seq', ?)`
        [orgs[orgs.length - 1].id], 
      )
    })
};


function seedActivities(db, orgs, activities) {
  return db.transaction(async trx => {
    await seedOrgs(trx, orgs);
    await trx
      .insert(activities)
      .into('activities_activities');
    await trx.raw(
      `SELECT setval
      ('activities_activities_id_seq', ?)`
      [activities[activities.length - 1].id], 
    );
  })
};

function seedUsers(db, orgs, users) {
  return db.transaction(async trx => {
    await seedOrgs(trx, orgs);
    await trx
      .insert(users)
      .into('activities_users');
    await trx.raw(
      `SELECT setval
      ('activities_users_id_seq', ?)`
      [users[users.length - 1].id], 
    );
  });
};

module.exports = {
  makeOrgsArray,
  makeUsersArray,
  makeActivitiesArray,
  makeExpectedActivities,
  makeExpectedActivity,
  makeFixtures,
  cleanTables,
  seedOrgs,
  seedUsers,
  seedActivities,
};