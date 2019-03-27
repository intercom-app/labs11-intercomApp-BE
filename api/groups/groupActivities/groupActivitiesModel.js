const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupActivity: function(groupId) {
        return db('activities').where({ groupId })
    },
    
};