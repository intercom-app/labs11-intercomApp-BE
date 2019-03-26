const express = require('express');
const cors = require('cors');

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');

const db = require('../data/dbConfig.js');
const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});




server.get('api/users',(req,res) => {
    db('users')
        .select().table('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/users/:id', (req,res) => {
    const id = req.params.id; //could also destructure like so: const { id } = req.params;
    db('users')
        .where({id:id})
        .select()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/users/:id/groupsBelongedTo', (req,res) => {
    const id = req.params.id;  
    db('users')
        .where({id:id})
        .then(user => {
            if (user) {
                db('usersGroupsMembership')
                    .select('groupId')
                    .where({'userId':id})
                    .then(groups => {
                        res.status(200).json(groups)
                    })
            }
            else {
                res.status(404).json({err: 'user id not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/users/:id/groupsOwned', (req,res) => {
    const id = req.params.id;  
    db('users')
        .where({id:id})
        .then(user => {
            if (user) {
                db('usersGroupsOwnership')
                    .select('groupId')
                    .where({'userId':id})
                    .then(groups => {
                        res.status(200).json(groups)
                    })
            }
            else {
                res.status(404).json({err: 'user id not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// server.get('/users/:id/groupsInvitedTo', (req,res) => {
//     const id = req.params.id; //// or we could destructure it like so: const { id } = req.params;
//     db('users')
//         .where({id:id})
//         .then(user => {
//             if (user) {
//                 db('usersGroupsInvitations')
//                     .select('groupId')
//                     .where({'userId':id})
//                     .then(groups => {
//                         res.status(200).json(groups)
//                     })
//             }
//             else {
//                 res.status(404).json({err: 'user id not found'})
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });




server.get('api/groups',(req,res) => {
    db('groups')
        .select().table('groups')
        .then(groups => {
            res.status(200).json(groups);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/groups/:id',(req,res) => {
    const id = req.params.id;  
    db('groups')
        .where({id:id})
        .select() 
        .then(group => {
            res.status(200).json(group);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/groups/:id/groupMembers',(req,res) => {
    const id = req.params.id;  
    db('groups')
        .where({id:id})
        .then(group => {
            if (group) {
                db('usersGroupsMembership')
                    .select('userId')
                    .where({'groupId':id})
                    .then(users => {
                        res.status(200).json(users)
                    })
            }
            else {
                res.status(404).json({err: 'group id not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/groups/:id/groupOwners',(req,res) => {
    const id = req.params.id;  
    db('groups')
        .where({id:id})
        .then(group => {
            if (group) {
                db('usersGroupsOwnership')
                    .select('userId')
                    .where({'groupId':id})
                    .then(users => {
                        res.status(200).json(users)
                    })
            }
            else {
                res.status(404).json({err: 'group id not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/groups/:id/activities',(req,res) => {
    const id = req.params.id;  
    db('groups')
        .where({id:id})
        .then(group => {
            if (group) {
                db('activities')
                    // .select('userId')
                    .select()
                    .where({'groupId':id})
                    .then(activities => {
                        res.status(200).json(activities)
                    })
            }
            else {
                res.status(404).json({err: 'group id not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/groups/:id/callStatus',(req,res) => {
    const id = req.params.id;  
    db('groups')
        .where({id:id})
        .select('callStatus')
        .then(callStatus => {
            res.status(200).json(callStatus)
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.get('api/activities',(req,res) => {
    db('activities')
        .select().table('activities')
        .then(activities => {
            res.status(200).json(activities);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('api/activities/:id',(req,res) => {
    const id = req.params.id;  
    db('activities')
        .where({id:id})
        .select() 
        .then(activity => {
            res.status(200).json(activity);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = server;