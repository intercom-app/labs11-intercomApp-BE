exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('usersGroupsParticipants').del()
    .then(function () {
      // Inserts seed entries
      return knex('usersGroupsParticipants').insert([
        { userId: 1, groupID: 1 },
        { userId: 2, groupID: 1 },
        { userId: 3, groupID: 1 },
        { userId: 4, groupID: 1 },
        { userId: 5, groupID: 1 },
        { userId: 6, groupID: 2 },
        { userId: 7, groupID: 2 },
        { userId: 8, groupID: 2 },
        { userId: 9, groupID: 2 },
        { userId: 10, groupID: 2 },
        { userId: 11, groupID: 3 },
        { userId: 12, groupID: 3 },
        { userId: 13, groupID: 3 },
        { userId: 14, groupID: 3 },
        { userId: 15, groupID: 3 }
      ])
    });
};