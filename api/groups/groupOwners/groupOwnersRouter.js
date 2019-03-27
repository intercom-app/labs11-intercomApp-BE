const router = require('express').Router();

const groupsModel = require('./groupOwnersModel');

// api/groups/:id/groupOwners

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const owners = await groupsModel.getGroupOwners(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let groupId = req.groupId;
    let owner = {...req.body, groupId};
    try {
        const updatedGroup = await groupsModel.addGroupOwner(owner);
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/groupOwners/:id

router.delete('/:id', async (req, res) => {
    let groupId = req.groupId;
    let userId = req.params.id;
    try {
        const updatedGroup = await groupsModel.deleteGroupOwner(userId, groupId);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;