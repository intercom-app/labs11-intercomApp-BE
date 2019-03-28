const db = require('../../data/dbConfig.js');

module.exports = {

    getAllGroups: function() {
        return db('groups');
    },

    addGroup: async function(group) {
        const [id] = await db('groups').insert(group, 'id');
        return db('groups').where({ id }).first();
    },

    getGroupByID: function(id) {
        return db('groups').where({ id }).first();
    }, 
    
    updateGroup: function(id, changes) {
        return db('groups')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getGroupByID(id) : null));
    },
    
    deleteGroup: function(id) {
        return db('groups').where({ id }).del();
    },
};