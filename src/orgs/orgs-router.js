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

module.exports = orgsRouter