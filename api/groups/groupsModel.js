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
    
};