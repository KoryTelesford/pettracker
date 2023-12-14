import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [name , setName] = useState("");
  const [URL , setURL] = useState("");
  const [species , setSpecies] = useState("");
  const [is_friendly , setIs_friendly] = useState(false);


  const handleSubmit = async(e) => {
    //Preventing Refresh
    e.preventDefault();
    try {
        const body = {name, URL, species, is_friendly};
        //Fetches automatically do a GET request, we want to change it to do a POST request so we could add a value to the database.
        const response = await fetch("http://localhost:8000/pets", {
            mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        window.location = "/";
        console.log(response)
    } catch (error) {
        console.error(error.message)
    }
}

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
              onChange={e => setIs_friendly(e.target.value)}
              />

              <label for="friendlycheck">Are They Friendly?</label>

              <button type='submit'> Add Pet! </button>

          </form>

        </div> 
          
      {/* Pet List */}

      <div className='Pet List'>
        <h2>Pet List</h2>
        <div class="row">
          <div class="column">
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
          </div>
        </div>
    </div>
  </div>
  );
}

export default App;
