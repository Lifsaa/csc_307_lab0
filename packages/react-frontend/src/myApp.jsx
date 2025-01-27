import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';


function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
    }

    function updateList(person) {
      postUser(person)
        .then(response =>{
          if(response.status ===201) {
            return response.json();
          }
        })
        .then(newUser => {
          if(newUser) {
            setCharacters([...characters, newUser]);
          }
        }).catch(error => console.error("Error", error))
    }
          
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
    
      return promise;
    }

    useEffect(() => {
        console.log('Fetching all the users');
        fetch("http://localhost:8000/users")
            .then(res => {
                console.log('Raw response:', res);
                return res.json();
            })
            .then(data => {
                console.log('Parsed data:', data);
                setCharacters(data.users_list || []);
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    console.log('Current characters state:', characters);

    return (
        <div className="container">
            <h1>React Users Table</h1>
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;