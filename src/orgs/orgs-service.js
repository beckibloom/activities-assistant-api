const xss = require('xss')
const ActivitiesService = require('../activities/activities-service')

const OrgsService = {
  getAllOrgs(db) {
    return db
      .select('id', 'org_name')
      .from('activities_orgs')
  },

  serializeOrgs(org) {
    return {
      id: org.id,
      org_name: xss(org.org_name)
    }
  },

  getById(db, id) {
    return OrgsService.getAllOrgs(db)
      .where('id', id)
      .first()
  },

  insertOrg(db, newOrg) {
    return db
      .insert(newOrg)
      .into('activities_orgs')
      .returning('*')
      .then(([org]) => org)
  }
}

module.exports = OrgsService