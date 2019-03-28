const router = require('express').Router();

const groupsModel = require('./groupInviteesModel');

// api/groups/:id/groupInvitees

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const owners = await groupsModel.getGroupInvitees(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let groupId = req.groupId;
    let invitee = {...req.body, groupId};
    try {
        const updatedGroup = await groupsModel.addGroupInvitee(invitee);
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/groupInvitees/:id

router.delete('/:id', async (req, res) => {
    let groupId = req.groupId;
    let userId = req.params.id;
    try {
        const updatedGroup = await groupsModel.deleteGroupInvitee(userId, groupId);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;