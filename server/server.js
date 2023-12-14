const express = require('express');
const knex = require('knex');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '2345',
      database: 'pet_tracker'
    }
});

app.use(express.json());

app.get('/pets', async (req, res) => {
    const pets = await db('pets').select('*');
    res.json(pets);
  });
  
app.post('/pets', async (req, res) => {
    const { name, URL, species, is_friendly } = req.body;
    const [pet] = await db('pets').insert({ name, URL, species, is_friendly }).returning('*');
    res.json(pet);
});

app.delete('/pets/:id', async (req, res) => {
    const { id } = req.params;
    await db('pets').where({ id }).del();
    res.send(`Pet with ID ${id} has been deleted.`);
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});