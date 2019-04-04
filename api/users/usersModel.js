const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers: function () {
        return db('users');
    },

    getUserById: function (id) {
        return db('users').where({ id }).first()
    },

    getUserByEmail: function (email) {
        return db('users').where({ email }).first()
    },

    addUser: async function (user) {
        const [id] = await db('users').insert(user, 'id');
        return this.getUserById(id)
    },

    updateUser: function(id, changes) {
        return db('users')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getUserById(id) : null));
    },
    
    deleteUser: function(id) {
        return db('users').where({ id }).del();
    },

};