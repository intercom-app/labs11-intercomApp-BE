const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupCallStatus: function(id) {
        return db('groups').select('callStatus').where({ id }).first();
    },

    updateCallStatus: function(id, changes) {
        return db('groups')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getGroupCallStatus(id) : null));
    },
    
};