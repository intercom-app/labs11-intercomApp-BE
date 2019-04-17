const router = require('express').Router();
const stripe = require('stripe')(process.env.SK_TEST);
//const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const usersModel = require('./usersModel');

const userDetailedRouter = require('./userDetailed/userDetailedRouter');
const userBelongedRouter = require('./userGroupsBelongedTo/userBelongedRouter');
const userIvitedRouter = require('./userGroupsInvitedTo/userInvitedRouter');
const userOwnedRouter = require('./userGroupsOwned/userOwnedRouter');

// api/users

router.get('/', async (req, res) => {
    try {
        const users = await usersModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', checkUser, async (req, res) => {
    const user = {
        displayName: req.body.nickname,
        email: req.body.email,
        avatar: req.body.picture
    }

    try {
        const stripeCustomerObject = await stripe.customers.create({
            email:req.body.email,
        });
        //const twilioSubSID = await client.api.accounts.create({
          //friendlyName: req.body.email});
        user.stripeId = await stripeCustomerObject.id;
        //user.twilioSubSID = await twilioSubSID.sid;
        const newUser = await usersModel.addUser(user);
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json(err);
    }
})

function checkUser(req, res, next) {
    const email = req.body.email
    usersModel.getUserByEmail(email)
        .then(foundUser => {
            if(foundUser === undefined){
                next();
            } else {
                res.status(200).json(foundUser);
                return
            }
        })
        .catch(err =>{
            res.status(500).json(err);
        })
}

// api/users/:id

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await usersModel.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await usersModel.updateUser(id, {...req.body});
        const updatedUser = await usersModel.getUserById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await usersModel.deleteUser(id);
        res.status(200).json({ count: `${count} user deleted` });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id/accountBalance', async(req,res) => {
    const id = req.params.id; 
    try {
        const accountBalance = await usersModel.getUserAccountBalance(id);
        res.status(200).json(accountBalance);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id/accountBalance', async(req,res) => {
    const id = req.params.id; 
    const changes = req.body;
    try {
        await usersModel.updateUser(id, {...req.body});
        const updatedUser = await usersModel.getUserById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id/last4', async(req,res) => {
    const id = req.params.id; 
    try {
        const last4 = await usersModel.getLast4(id);
        res.status(200).json(last4);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id/last4', async(req,res) => {
    const id = req.params.id; 
    const changes = req.body;
    try {
        await usersModel.updateUser(id, {...req.body});
        const updatedUser = await usersModel.getUserById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})



// api/users/:id/<subroutes>

router.use('/:id/detailed', function(req, res, next) {
    req.userId = req.params.id;
    next()
}, userDetailedRouter);

router.use('/:id/groupsBelongedTo', function(req, res, next) {
    req.userId = req.params.id;
    next()
}, userBelongedRouter);

router.use('/:id/groupsInvitedTo', function(req, res, next) {
    req.userId = req.params.id;
    next()
}, userIvitedRouter);

router.use('/:id/groupsOwned', function(req, res, next) {
    req.userId = req.params.id;
    next()
}, userOwnedRouter);


module.exports = router;