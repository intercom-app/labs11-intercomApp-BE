exports.seed = function(knex, Promise) {
  //Deletes ALL existing entries
  return knex('users').del()
      .then(function() {
          //Inserts seed entries
          return knex('users').insert([
              {name: 'Adrian Adames', displayName: 'Adrian'},
              {name: 'Chelsea Tolnai', displayName: 'Chealsea'},
              {name: 'Stephen Fargali', displayName: 'Stephen'},
              {name: 'Erin Emer', displayName: 'Erinc'},
              {name: 'Sergey Osipyan', displayName: 'Sergey'},
              {name: 'Lottana X', displayName: 'Lottana'}
          ]);
      });
};

