require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const orgsRouter = require('./orgs/orgs-router');
const activitiesRouter = require('./activities/activities-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const app = express();

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/orgs', orgsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const errorHandler = (error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: "Server error" } }
  } else {
    response = { message: error.message, error }
  };
  res.status(500).json(response);
}

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).send('Hello! Welcome to Activities Assistant.');
});

module.exports = app;