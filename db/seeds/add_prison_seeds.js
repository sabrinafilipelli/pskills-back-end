const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisons').truncate()
    .then(() => {
      return bcrypt.hashSync('abcdef123456', 14);
    })
    .then(function (hash) {
      // Inserts seed entries
      return knex('prisons').insert([
        {
          location: 'FCI Florence',
          population: 1377,
          password: hash,
          zipcode: 81226
        },
        {
          location: 'FCI Englewood',
          population: 1073,
          password: hash,
          zipcode: 80123
        },
      ]);
    });
};
