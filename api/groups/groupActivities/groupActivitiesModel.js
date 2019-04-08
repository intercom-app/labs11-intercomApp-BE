const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupActivity: function(groupId) {
        return db('activities')
            .select(
                'activities.id',
                'activities.activity', 
                'activities.createdAt', 
                'users.displayName',
            )
            .where({ groupId })
            .orderBy('activities.createdAt','DESC')
            .join('users', 'activities.userId', 'users.id')
    },

    getGroupActivityDetailed: function(groupId) {
        return db('activities')
            .select(
                'activities.id as activityId',
                'activities.createdAt as activityCreatedAt', 
                'activities.activity', 
                'users.*',
            )
            .where({ groupId })
            .orderBy('activities.createdAt','DESC')
            .join('users', 'activities.userId', 'users.id')
    },

    addGroupActivity: async function(activity) {
        await db('activities').insert(activity);
        return this.getGroupActivity(activity.groupId);
    },
    
};