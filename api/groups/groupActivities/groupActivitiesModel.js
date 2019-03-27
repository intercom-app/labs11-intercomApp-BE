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
        const [id] = await db('activities').insert(activity, 'id');
        return db('activities').where({ id }).first();
    },
    
};