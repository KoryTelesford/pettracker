const knex = require('./knex');

class Example {
  // This is just an example query, obviously you need to change it, but it shows you how to use knex.raw and dynamic values
  static async create(data) {
    try {
      const query = `INSERT INTO examples (data) values (?) returning *`;
      const { rows: [newToDo] } = await knex.raw(query, [data]);
      return newToDo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Example;
