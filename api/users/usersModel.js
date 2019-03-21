const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers: function () {
        return db('users');
    },

    getUserById: function (id) {
        return db('users').where({ id }).first()
    }

};