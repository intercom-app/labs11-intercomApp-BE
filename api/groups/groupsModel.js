const db = require('../../data/dbConfig.js');

module.exports = {
    getAllGroups: function() {
        return db('groups');
    }
};