const express = require('express')
const UsersService = require('./users-service')

const {requireAuth} = require('../middleware/jwt-auth');

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .get('/orgID',requireAuth, (req,res,next)=>{
    res
      .status(201)
      .json({org_id:req.user.org_id});
  })
  .get('/:username', jsonBodyParser, (req,res,next) => {
    const username = req.params.username

    if (!username) {
      return res.status(400).json({
        error: 'Missing username in request'
      })
    }
    
    UsersService.getUserOrg(
      req.app.get('db'),
      username
    )
      .then(org_id => {
        res
          .status(201)
          .json({ org_id })
      })
  })
  .post('/:org_id', jsonBodyParser, (req,res,next) => {
    const { password, user_name  } = req.body
    const org_id = req.params.org_id

    for (const field of ['user_name', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
    
    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })
    
    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
              org_id: org_id,
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
            .then(user => {
              res
                .status(201)
                .json(UsersService.serializeUser(user))
            })
          })
      })
      .catch(next)
  })

module.exports = usersRouter