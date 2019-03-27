const db = require('../../data/dbConfig.js');

module.exports = {

    getAllGroups: function() {
        return db('groups');
    },

    getGroupByID: function(id) {
        return db('groups').where({ id }).first();
    },    
    
};