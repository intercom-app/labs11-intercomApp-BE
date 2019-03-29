
exports.seed = function (knex, Promise) {
  //Deletes ALL existing entries
  return knex('groups')
      .truncate()
      .then(function () {
          //Inserts seed entries
          return knex('groups').insert([
            {name:"Robbyn", phoneNumber:"+18622802766",callStatus:true},
            {name:"Micheil", phoneNumber:"+1",callStatus:true},
            {name:"Rik", phoneNumber:"+1",callStatus:true},
            {name:"Abby", phoneNumber:"+1",callStatus:true},
            {name:"Jen", phoneNumber:"+1",callStatus:true},
            {name:"Kaylee", phoneNumber:"+1",callStatus:true},
            {name:"Gert", phoneNumber:"+1",callStatus:true},
            {name:"Onida", phoneNumber:"+1",callStatus:true},
            {name:"Mira", phoneNumber:"+1",callStatus:true},
            {name:"Eugenio", phoneNumber:"+1",callStatus:true},
            {name:"Lotty", phoneNumber:"+1",callStatus:false},
            {name:"Edward", phoneNumber:"+1",callStatus:false},
            {name:"Peggy", phoneNumber:"+1",callStatus:false},
            {name:"Conn", phoneNumber:"+1",callStatus:false},
            {name:"Querida", phoneNumber:"+1",callStatus:false},
            {name:"Jennine", phoneNumber:"+1",callStatus:false},
            {name:"Waldo", phoneNumber:"+1",callStatus:false},
            {name:"Adela", phoneNumber:"+1",callStatus:false},
            {name:"Audrey", phoneNumber:"+1",callStatus:false},
            {name:"Daphne", phoneNumber:"+1",callStatus:false}]);
      });
};
