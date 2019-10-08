const xss = require('xss')

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
}

module.exports = OrgsService