const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupActivity: function(groupId) {
        return db('activities')
            .select(
                'activities.activity', 
                'activities.createdAt', 
                'users.displayName',
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