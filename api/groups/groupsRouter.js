const router = require('express').Router();

const groupsModel = require('./groupsModel');

const groupMembersRouter = require('./groupMembers/groupMembersRouter');
const groupOwnersRouter = require('./groupOwners/groupOwnersRouter');
const groupInviteesRouter = require('./groupInvitees/groupInviteesRouter');
const groupActivitiesRouter = require('./groupActivities/groupActivitiesRouter');
const groupCallStatusRouter = require('./groupCallStatus/groupCallStatusRouter');
const groupCallParticipants = require('./groupCallParticipants/groupCallParticipantsRouter');

// api/groups

router.get('/', async (req, res) => {
    try {
        const groups = await groupsModel.getAllGroups();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let group = req.body;
    try {
        const newGroup = await groupsModel.addGroup(group);
        res.status(201).json(newGroup);

    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const group = await groupsModel.getGroupByID(id);
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await groupsModel.updateGroup(id, {...req.body});
        const updatedGroup = await groupsModel.getGroupByID(id);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await groupsModel.deleteGroup(id);
        res.status(200).json({ count: `${count} group deleted` });
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/<subroutes>

router.use('/:id/groupMembers', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupMembersRouter);

router.use('/:id/groupOwners', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupOwnersRouter);

router.use('/:id/groupInvitees', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupInviteesRouter);

router.use('/:id/activities', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupActivitiesRouter);

router.use('/:id/callStatus', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupCallStatusRouter);

router.use('/:id/callParticipants', function(req, res, next) {
    req.groupId = req.params.id;
    next()
}, groupCallParticipants);

module.exports = router;