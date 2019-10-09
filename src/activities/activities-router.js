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

module.exports = activitiesRouter