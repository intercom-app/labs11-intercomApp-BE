const router = require('express').Router();

const groupsModel = require('./groupCallParticipantsModel');

// api/groups/:id/callParticipants

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const participants = await groupsModel.getParticipants(id);
        res.status(200).json(participants);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let groupId = req.groupId;
    let participant = {...req.body, groupId};
    try {
        const updatedGroup = await groupsModel.addParticipant(participant);
        res.status(201).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/callParticipants/:id

router.delete('/:id', async (req, res) => {
    let groupId = req.groupId;
    let userId = req.params.id;
    try {
        const updatedGroup = await groupsModel.deleteParticipant(userId, groupId);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;