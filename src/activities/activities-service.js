const xss = require('xss')

const ActivitiesService = {
  getAllActivities(db) {
    return db
      .from('activities_activities')
      .select(
        'id',
        'org_id',
        'title',
        'activity_day',
        'activity_time',
        'ages',
        'activity_group',
        'activity_location',
        'cost',
        'dates',
        'thumbnail',
        'activity_description',
        'preparation',
        'contact'
      )
  },

  getActivitiesByOrg(db, org_id) {
    return db
      .from('activities_activities')
      .select(
        'id',
        'org_id',
        'title',
        'activity_day',
        'activity_time',
        'ages',
        'activity_group',
        'activity_location',
        'cost',
        'dates',
        'thumbnail',
        'activity_description',
        'preparation',
        'contact'
      )
      .where('org_id', org_id)
  },

  serializeActivity(activity) {
    return {
      id: activity.id,
      orgId: activity.org_id,
      title: xss(activity.title),
      day: xss(activity.activity_day),
      time: xss(activity.activity_time),
      ages: xss(activity.ages),
      group: xss(activity.activity_group),
      location: xss(activity.activity_location),
      cost: activity.cost,
      dates: xss(activity.dates),
      thumbnail: xss(activity.thumbnail),
      details: {
        description: xss(activity.activity_description),
        preparation: xss(activity.preparation),
        contact: xss(activity.contact)
      }
    }
  },

  getById(db,id) {
    return ActivitiesService.getAllActivities(db)
      .where('id', id)
      .first()
  },

  insertActivity(db, newActivity) {
    return db
      .insert(newActivity)
      .into('activities_activities')
      .returning('*')
      .then(([activity]) => activity)
      .then(activity =>
        ActivitiesService.getById(db, activity.id)
      )
  },
}

module.exports = ActivitiesService