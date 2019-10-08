const express = require('express')
const ActivitiesService = require('./activities-service')
const OrgsService = require('../orgs/orgs-service')
// const { requireAuth } = require('../middleware/jwt-auth')


const activitiesRouter = express.Router()

activitiesRouter
  .route('/:org_id')
  .all(checkOrgExists)
  .get((req,res,next) => {
    ActivitiesService.getActivitiesByOrg(req.app.get('db'), req.params.org_id)
    .then(activities => activities.map(ActivitiesService.serializeActivity))
    .catch(next)
  })

async function checkOrgExists(req,res,next) {
  try {
    const org = await OrgsService.getById(
      req.app.get('db'),
      req.params.org_id
    )

    if (!org)
      return res.status(404).json({
        error: `Org doesn't exist`
      })
    
    res.org = org
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = activitiesRouter