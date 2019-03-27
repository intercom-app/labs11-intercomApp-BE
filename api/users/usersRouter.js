const router = require('express').Router();

const usersModel = require('./usersModel');

function checkUser(req, res, next) {
    // if (usersModel.getUserByEmail(email)){
    // console.log(req.body.email)
    // console.log('checkuser', usersModel.getUserByEmail(req.body.email))
    usersModel.getUserByEmail(req.body.email)
        .then(foundUser => {
            console.log('foundUser', foundUser)
            if(foundUser === undefined){
                next();
            }
        })
        .catch(err =>{
            console.log(err)
        })
    
    // }
}

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
    // try {
    //     console.log('sssu',usersModel.getUserById(id))
    //     const user = await usersModel.getUserById(id);
    //     res.status(200).json(user);
    // } catch (err) {
    //     res.status(500).json({ error: 'Error getting the user.' });
    // }
    console.log('sssu',usersModel.getUserById(id))

    usersModel.getUserById(id)
    .then(foundUser => {
        // console.log(foundUser)
        if (foundUser === undefined) {
            res.status(404).json({
                error: `No user with id${id} found. Can't retrieve it!`
            });
            return;
        }
        res.json( foundUser );
    })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The Uuer information could not be retrieved."
                });
        });

});

router.post('/', checkUser, async (req, res) => {
    const user = {
        email: req.body.email,
    }
    console.log('user', user)
    
    console.log('after next')
    // try {
        usersModel.addUser(user)
        .then(newUser => {
            console.log(newUser)
            res.status(201).json(newUser);
            console.log(`${newUser} got added`)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    // }

        // console.log('newUser',newUser)
        // res.status(201).json(newUser);

    // } 
    // catch (err) {
    //     res.status(500).json(err);
    // }
});

module.exports = router;