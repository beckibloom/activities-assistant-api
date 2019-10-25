const express = require('express')
const OrgsService = require('./orgs-service')

const orgsRouter = express.Router()
const jsonBodyParser = express.json()

orgsRouter
  .route('/')
  .get((req,res,next) => {
    OrgsService.getAllOrgs(req.app.get('db'))
      .then(orgs => {
          res.json(orgs.map(OrgsService.serializeOrgs))
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req,res,next) => {
    const { org_name } = req.body
    const newOrg = { org_name }

    for (const [key, value] of Object.entries(newOrg))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    
    OrgsService.insertOrg(
      req.app.get('db'),
      newOrg
    )
      .then(org => {
        res
          .status(201)
          .json(OrgsService.serializeOrgs(org))
      })
      .catch(next)
  })

module.exports = orgsRouter