const router = require('express').Router();

const groupsModel = require('./groupMembersModel');

// api/groups/:id/groupMembers

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const members = await groupsModel.getGroupMembers(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/detailed', async (req, res) => {
    let id = req.groupId;
    try {
        const members = await groupsModel.getGroupMembersDetailed(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let groupId = req.groupId;
    let member = {...req.body, groupId};
    try {
        const updatedGroup = await groupsModel.addGroupMember(member);
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/groupMembers/:id

router.delete('/:id', async (req, res) => {
    let groupId = req.groupId;
    let userId = req.params.id;
    try {
        const updatedGroup = await groupsModel.deleteGroupMember(userId, groupId);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;