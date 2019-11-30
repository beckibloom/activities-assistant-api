# Activities Assistant Server

## Table of Contents

1. [Description](#Description)
1. [API](#API)
1. [Technologies](#Technologies)

[Live App](https://activities-assistant.beckibloom.now.sh/)

## Description

Managing enrichment programs and choosing the best activities for your child can seem like a daunting task. With Activities Assistant, you can forget about mailing lists or paging through stacks of fliers. We make it easy to advertise your activities to your community, giving everyone a one-stop-shop to find just the right enrichment for their little ones.

As an activity coordinator, you can register for an account and add all of your activity information to your organization's Activity List. As a member of the community interested in attending activities, you can view the activities offered by your organization(s) of interest.

> View the Client Repo for Activities Assistant [here](https://github.com/beckibloom/activities-assistant-client)

## API

```

/api
.
--/activities
  --GET
    -/:org_id
    -/:org_id/:activity_id
  --DELETE
    -/:org_id/:activity_id
  --PUT
    -/:org_id/:activity_id
  --POST
    -/:org_id
--/auth
    --POST
      -/login
--/orgs
    --GET
      -/
    --POST
      -/
--/users
    --GET
      -/orgID
      -/:username
    --POST
      -/:org_id

```

## Technologies

- React
- HTML
- CSS
- Node
- Express
- PostgreSQL
- Mocha/Chai/Jest
- Heroku/Now CLI
- Zeit