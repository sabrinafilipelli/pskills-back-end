exports.up = function(knex, Promise) {
  return knex.schema.createTable("prisons", tbl => {
    tbl.increments();

    // Used as username for login
    tbl
      .string("location")
      .notNullable()
      .unique("uq_prison_location");

    // number of prisoners
    tbl.integer("population").notNullable();

    tbl.string("password").notNullable();

    tbl.integer("zipcode");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("prisons");
};
