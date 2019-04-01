
exports.seed = function (knex, Promise) {
  //Deletes ALL existing entries
  return knex('groups')
      .truncate()
      .then(function () {
          //Inserts seed entries
          return knex('groups').insert([
            {name:"Robbyn", callStatus:true},
            {name:"Micheil",callStatus:true},
            {name:"Rik",callStatus:true},
            {name:"Abby",callStatus:true},
            {name:"Jen",callStatus:true},
            {name:"Kaylee",callStatus:true},
            {name:"Gert",callStatus:true},
            {name:"Onida",callStatus:true},
            {name:"Mira",callStatus:true},
            {name:"Eugenio",callStatus:true},
            {name:"Lotty",callStatus:false},
            {name:"Edward",callStatus:false},
            {name:"Peggy",callStatus:false},
            {name:"Conn",callStatus:false},
            {name:"Querida",callStatus:false},
            {name:"Jennine",callStatus:false},
            {name:"Waldo",callStatus:false},
            {name:"Adela",callStatus:false},
            {name:"Audrey",callStatus:false},
            {name:"Daphne",callStatus:false}]);
      });
};
