const router = require('express').Router();

const groupsModel = require('./groupsModel');

router.get('/', async (req, res) => {
    try {
        const groups = await groupsModel.getAllGroups();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


// server.get('api/groups/:id',(req,res) => {
//     const id = req.params.id;  
//     db('groups')
//         .where({id:id})
//         .select() 
//         .then(group => {
//             res.status(200).json(group);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });

// server.get('api/groups/:id/groupMembers',(req,res) => {
//     const id = req.params.id;  
//     db('groups')
//         .where({id:id})
//         .then(group => {
//             if (group) {
//                 db('usersGroupsMembership')
//                     .select('userId')
//                     .where({'groupId':id})
//                     .then(users => {
//                         res.status(200).json(users)
//                     })
//             }
//             else {
//                 res.status(404).json({err: 'group id not found'})
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });

// server.get('api/groups/:id/groupOwners',(req,res) => {
//     const id = req.params.id;  
//     db('groups')
//         .where({id:id})
//         .then(group => {
//             if (group) {
//                 db('usersGroupsOwnership')
//                     .select('userId')
//                     .where({'groupId':id})
//                     .then(users => {
//                         res.status(200).json(users)
//                     })
//             }
//             else {
//                 res.status(404).json({err: 'group id not found'})
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });

// server.get('api/groups/:id/activities',(req,res) => {
//     const id = req.params.id;  
//     db('groups')
//         .where({id:id})
//         .then(group => {
//             if (group) {
//                 db('activities')
//                     // .select('userId')
//                     .select()
//                     .where({'groupId':id})
//                     .then(activities => {
//                         res.status(200).json(activities)
//                     })
//             }
//             else {
//                 res.status(404).json({err: 'group id not found'})
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });

// server.get('api/groups/:id/callStatus',(req,res) => {
//     const id = req.params.id;  
//     db('groups')
//         .where({id:id})
//         .select('callStatus')
//         .then(callStatus => {
//             res.status(200).json(callStatus)
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// });