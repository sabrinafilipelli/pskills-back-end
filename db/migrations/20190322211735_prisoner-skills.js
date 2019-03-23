exports.up = function(knex, Promise) {
  return knex.schema.createTable("prisonerSkills", tbl => {
    tbl.increments();

    tbl
      .integer("prisoner_id")
      .notNullable()
      .references("id")
      .inTable("prisoners");

    tbl.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("prisonerSkills");
};
