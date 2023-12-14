// REMEMBER: up and down are functions that MUST return promises
// You'll probably want to delete this file, it just has some examples to copy if you need
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pets', (table) => {
    table.increments(); // this is the id of the pets
    table.string('name'); // pet name
    table.string('URL'); // pet URL
    table.string('species'); // species
    table.boolean('is_friendly').defaultTo(false); // Is Friendly

    /* add a foreign key that links to a hypothetical users table */
    // You must first have created a users table with a key called id!
    // table.integer('user_id').index().references('id').inTable('users');
  });
};

// What goes up must come down: all down does is reverse up's actions
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pets');
};
