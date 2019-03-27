const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupCallStatus: function(id) {
        return db('groups').select('callStatus').where({ id }).first();
    },
    
};