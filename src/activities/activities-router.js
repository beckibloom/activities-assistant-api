const express = require('express')
const ActivitiesService = require('./activities-service')
// const { requireAuth } = require('../middleware/jwt-auth')

const activitiesRouter = express.Router()

activitiesRouter
  .route('/:org_id')
  .get((req,res,next) => {
    ActivitiesService.getActivitiesByOrg(req.app.get('db'), req.params.org_id)
      .then(activities => {
        res.json(activities.map(ActivitiesService.serializeActivity))
      })
    .catch(next)
  })

activitiesRouter
  .route('/:org_id/:activity_id')
  .all(checkActivityExists)
  .get((req,res) => {
    res.json(ActivitiesService.serializeActivity(res.activity)
    )
  })

async function checkActivityExists(req, res, next) {
  try {
    const activity = await ActivitiesService.getById(
      req.app.get('db'),
      req.params.activity_id
    )

    if (!activity)
      return res.status(404).json({
        error: `Activity doesn't exist`
      })

    res.activity = activity
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = activitiesRouter