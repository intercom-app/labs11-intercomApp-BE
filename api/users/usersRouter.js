const router = require('express').Router();

const usersModel = require('./usersModel');

router.get('/', async (req, res) => {
    try {
        const users = await usersModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await usersModel.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error getting the user.' });
    }
});

module.exports = router;