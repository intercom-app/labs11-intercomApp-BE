

exports.seed = function(knex, Promise) {
  return knex('callSessions')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('callSessions').insert([
        {sid: 2, userId: 1, groupId: 1, startTime:1000000000, endTime:1000000060, duration:60, price:2}, 
        {userId: 1, groupId: 2, startTime:1100000000, endTime:1100000120, duration:120, numOfParticipants:3},  
        {userId: 2, groupId: 3, startTime:1200000000, endTime:1200000180, duration:180, numOfParticipants:5},   
        {userId: 2, groupId: 4, startTime:1300000000, endTime:1300000240, duration:240, numOfParticipants:6},  
        {userId: 3, groupId: 5, startTime:1400000000, endTime:1400000300, duration:300, numOfParticipants:5}
      ]);
    });
};


