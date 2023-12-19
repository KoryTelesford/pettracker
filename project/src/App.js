import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [name , setName] = useState("");
  const [URL , setURL] = useState("");
  const [species , setSpecies] = useState("");
  const [is_friendly , setIs_friendly] = useState(false);
  const [pets, setPets] = useState([]);



  const handleSubmit = async(e) => {
    //Preventing Refresh
    e.preventDefault();
    try {
        const body = {name, URL, species, is_friendly};
        //Fetches automatically do a GET request, we want to change it to do a POST request so we could add a value to the database.
        const response = await fetch("http://localhost:8000/pets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        window.location = "/";
        console.log(response)
    } catch (error) {
        console.error(error.message)
    }

    console.log(name, URL, species, is_friendly)
}

const deletePetFu = async (id) => {
  try {
      const deletePet = await fetch(`http://localhost:8000/pets/${id}`, {
          method: "DELETE",
      });
      // window.location = "/";
      console.log(deletePet)
      // Gets the todo condition Filter sets up a condition, if todo fits that condition then 
      // it returns those that fits that condition.
      // if todo .todo_ids does not equal to the id that is not equal to the id that was speceficed inside the argument then spit out the result. AKA its going to show every ID except the one that is trying to be deleted. 
      
      
      //Filter through everything, then create a new array unless it contains the arrray which we passed in. If it does filter it out and dont include it in our array. 
      //It will also delete it from the server too, as it made a DELTE request we had to delete it from the local side.
      setPets(pets.filter(pet => pet.id !== id));
  } catch (error) {
      console.error(error.message);
  }
}

const getPet = async () => {
  try {
      const response = await fetch("http://localhost:8000/pets");
      const jsonData = await response.json();

      setPets(jsonData);
  } catch (error) {
      console.error(error.message);
  }
}

// Calls to do everytime the page renders, the brackets make it only call it once otherwise it would be an infinite loop.
useEffect(() => {
  getPet();
}, []);

console.log(pets)

  return (
    <div className="App">
      <h1>Pet Tracker</h1>
      {/* Add New Pet */}

      <div className='AddNewPet'>
          <h2>Add a new Pet!</h2>

          <form onSubmit={handleSubmit}>
          
            <label for="name">Pet Name:</label>
            <input type="text" id="name" name="name" 
            value={name} 
            onChange={e => setName(e.target.value)}
            placeholder='Pet Name' required/>
            
            <label for="picture">Profile Picture:</label>
            <input type="text" id="picture" name="picture" 
            value={URL} 
            onChange={e => setURL(e.target.value)}
            placeholder='Profile URL'/>
            

            <fieldset className='speciesCheckbo'
            value={species} 
            onChange={e => setSpecies(e.target.value)}
            >
              <legend>Species</legend>

              <div>
                <input type="radio" id="huey" name="species" value="cat" />
                <label for="huey">Cat</label>
              </div>

              <div>
                <input type="radio" id="dewey" name="species" value="dog" />
                <label for="dewey">Dog</label>
              </div>

              <div>
                <input type="radio" id="louie" name="species" value="bird" />
                <label for="louie">Bird</label>
              </div>
            </fieldset>
              
              <input type="checkbox" id="friendlycheck" name="friendlycheck" 
              value={is_friendly} 
              onChange={e => console.log(e.target.value)}
              />

              <label for="friendlycheck">Are They Friendly?</label>

              <button type='submit'> Add Pet! </button>

          </form>

        </div> 
          
      {/* Pet List */}

      <div className='Pet List'>
        <h2>Pet List</h2>
        <div class="row">
          {
            pets.map(pet => (
              <div class="column" key={pet.id}>
                <h2>Fluffy</h2>
                <img src={pet.URL} />
                <p>{pet.is_friendly === true ? 'Friendly' : 'Not so friendly...'}</p>
                <p>Species: {pet.species}</p>
                <button onClick={() => deletePetFu(pet.id)}>Remove</button>
              </div>
            ))
          }
          {/* <div class="column">
            <h2>Fluffy</h2>
            <img src='' />
            <p>Not so friendly...</p>
            <p>Species: cat</p>
            <button>Remove</button>
          </div>
          <div class="column">
            <h2>Rex</h2>
            <img src='' />
            <p>Friendly!</p>
            <p>Species: dog</p>
            <button>Remove</button>
          </div>
          <div class="column">
            <h2>Screamin' Blue</h2>
            <img src='' />
            <p>Not so friendly...</p>
            <p>Species: bird</p>
            <button>Remove</button>
          </div> */}
        </div>
    </div>
  </div>
  );
}

export default App;
