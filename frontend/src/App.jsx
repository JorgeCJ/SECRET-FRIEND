import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
  baseURL: 'https://secret-friend-backend.vercel.app/'
});

function App() {
  const [secretFriendData, setSecretFriendData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newGift, setNewGift] = useState('');

  useEffect(() => {
    api.get('/secretfriend').then((res) => {
      console.log(res);
      setSecretFriendData(res.data)
    })
  }, [])

  function addInformation() {
    const newSecretFriendData = {
      name: newName,
      gift: newGift,
      id: uuidv4(),
    };

    api.post('/secretfriend', newSecretFriendData).then((res) => {
      setSecretFriendData([...secretFriendData, newSecretFriendData]);
      console.log(res);
    });
  }

  return (
    <>
      <div className="container">
        <div className='centering'>
          <h1>Secret Friend</h1>
          <h2>Put the gift you will give to your secret friend.</h2>
          <input placeholder='Name' onChange={event => setNewName(event.target.value)} />
          <input placeholder='Gift' onChange={event => setNewGift(event.target.value)} />
          <button onClick={addInformation}>Add information</button>
        </div>
        <div>
          <h2>See the information below. Maybe this secret gift is for you!</h2>
          <ul>
            {secretFriendData.map(data => (
              <li key={data.id}> Name: {data.name} - Gift: {data.gift}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;
