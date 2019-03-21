const db = require('../../data/dbConfig.js');

module.exports = {
    getTeam: function() {
        return db('teamMembers');
    }
};