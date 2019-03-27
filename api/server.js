const express = require('express');
const cors = require('cors');
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');

const db = require('../data/dbConfig.js');
const server = express();

server.use(cors());
server.use(express.json());



server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);
server.use('/api/groups', groupRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/test', (req, res) => {
    console.log('req', req.body)
    // console.log('res', res)
    
    
    // res.send('Hello World!');
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