const express = require('express');
const path = require('path');
const ActivitiesService = require('./activities-service');
const { requireAuth } = require('../middleware/jwt-auth');

const activitiesRouter = express.Router();
const jsonBodyParser = express.json();

activitiesRouter
  .route('/:org_id')
  .get((req,res,next) => {
    ActivitiesService.getActivitiesByOrg(req.app.get('db'), req.params.org_id)
      .then(activities => {
        res.status(201).json(activities.map(ActivitiesService.serializeActivity));
      })
    .catch(next);
  });

activitiesRouter
  .route('/:org_id/:activity_id')
  .all(checkActivityExists)
  .get((req,res) => {
    res.status(201).json(ActivitiesService.serializeActivity(res.activity));
  })
  .delete(requireAuth, (req,res,next) => {
    ActivitiesService.deleteActivity(
      req.app.get('db'),
      req.params.activity_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, jsonBodyParser, (req,res,next) => {
    const { org_id, title, activity_day, activity_time, ages, activity_group, activity_location, cost, dates, thumbnail, details } = req.body;
    const activityToUpdate = { org_id, title, activity_day, activity_time, ages, activity_group, activity_location, cost, dates, thumbnail, details };

    const numberOfValues = Object.values(activityToUpdate).filter(Boolean).length;
    if(numberOfValues === 0) {
      return res.status(400).json({
        error:{message:`Request body must contain an activity object value to update`}
      });
    };

    ActivitiesService.updateActivity(
      req.app.get('db'),
      req.params.activity_id,
      activityToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end();
        })
        .catch(next);
  });

activitiesRouter
  .route('/:org_id')
  .post(requireAuth, jsonBodyParser, (req,res,next) => {
    const { org_id, title, activity_day, activity_time, ages, activity_group, activity_location, cost, dates, thumbnail, activity_description, preparation, contact } = req.body;
    const newActivity = { org_id, title, activity_day, activity_time, ages, activity_group, activity_location, cost, dates, thumbnail, activity_description, preparation, contact };

    for (const [key, value] of Object.entries(newActivity))
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      };

    ActivitiesService.insertActivity(
      req.app.get('db'),
      newActivity
    )
      .then(activity => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${activity.id}`))
          .json(ActivitiesService.serializeActivity(activity));
      })
      .catch(next);
  });

async function checkActivityExists(req, res, next) {
  try {
    const activity = await ActivitiesService.getById(
      req.app.get('db'),
      req.params.activity_id
    );

    if (!activity) {
      return res.status(404).json({
        error: `Activity doesn't exist`
      })
    };

    res.activity = activity;
    next();
  } catch (error) {
    next(error);
  };
};

module.exports = activitiesRouter;