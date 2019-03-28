// ***** RESETS DATABASE FOR TESTING ***** //

const db = require('../data/dbConfig.js');

// *** User Variables *** //

const user1 = {
    firstName: 'Chelsea',
    lastName: 'Tolnai',
    displayName: 'CATolnai',
    email: 'CATolnai@test.com'
};

const user2 = {
    firstName: 'Erinc',
    lastName: 'Emer',
    displayName: 'EEmer',
    email: 'EEmer@test.com'
};

const user3 = {
    firstName: 'Stephen',
    lastName: 'Fargali',
    displayName: 'Stefarg',
    email: 'Stefarg@test.com'
};

const user1Exists = {
    nickname: 'CATolnai',
    email: 'CATolnai@test.com'
}

const user2Exists = {
    nickname: 'EEmer',
    email: 'EEmer@test.com'
};

const user3NoExists = {
    nickname: 'Stefarg',
    email: 'Stefarg@test.com'
};

// *** Group Variables *** //

const group1 = {
    name: 'Group1',
};

const group2 = {
    name: 'Group2',
};

// *** Group Acitivities Variables *** //

const activity1 = {
    groupId: 1,
    userId: 1,
    activity: 'group created'
};

const activity2 = {
    groupId: 1,
    userId: 2,
    activity: 'joined group'
};

// *** Group Owner Variables *** //

const newOwner1 = {
    userId: 1,
    groupId: 1
};

const newOwner2 = {
    userId: 2,
    groupId: 1
};

// *** Group Member Variables *** //

const newMember1 = {
    userId: 1,
    groupId: 1
};

const newMember2 = {
    userId: 2,
    groupId: 1
};

// *** Group Invitees Variables *** //

const newInvitee1 = {
    userId: 1,
    groupId: 1
};

const newInvitee2 = {
    userId: 2,
    groupId: 1
};

// *** Function to reset and insert dummay data *** //

const dbReset = async () => {
    await db('users').truncate();
    await db('users').insert(user1);
    await db('users').insert(user2);
    
    await db('groups').truncate();
    await db('groups').insert(group1);
    await db('groups').insert(group2);

    await db('activities').truncate();
    await db('activities').insert(activity1);
    await db('activities').insert(activity2);

    await db('usersGroupsOwnership').truncate();
    await db('usersGroupsOwnership').insert(newOwner1);

    await db('usersGroupsMembership').truncate();
    await db('usersGroupsMembership').insert(newMember1);

    await db('usersGroupsInvitations').truncate();
    await db('usersGroupsInvitations').insert(newInvitee1);
}

module.exports = {
    user1,
    user2,
    user3,
    user1Exists,
    user2Exists,
    user3NoExists,
    group1,
    group2,
    activity1,
    activity2,
    newOwner1,
    newOwner2,
    newMember1,
    newMember2,
    newInvitee1,
    newInvitee2,
    dbReset
}