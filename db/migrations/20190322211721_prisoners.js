exports.up = function(knex, Promise) {
  return knex.schema.createTable("prisoners", tbl => {
    tbl.increments();

    tbl.string("name").notNullable();

    tbl.integer("id_number").notNullable();

    tbl
      .integer("prison_id")
      .notNullable()
      .references("id")
      .inTable("prisons");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("prisoners");
};
