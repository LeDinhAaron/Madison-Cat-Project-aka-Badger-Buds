import React, { useState, useContext, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import Button from 'react-bootstrap/Button';

//Lecture Code
export default function MyBasket(props) {
  const badgerbuds = useContext(BadgerBudsDataContext);  
  const [savedBuddies, setSavedBuddies] = useState(getSavedBuddies());

  function getSavedBuddies() {
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    return badgerbuds.filter((buddy) => savedCatIds.includes(buddy.id));
  }

  const unselectBuddy = (id) => {
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const updatedSavedCatIds = savedCatIds.filter((savedId) => savedId !== id);
    sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));

    const updatedSavedBuddies = savedBuddies.filter((buddy) => buddy.id !== id);
    setSavedBuddies(updatedSavedBuddies);

    const removedBuddy = badgerbuds.find((buddy) => buddy.id === id);
    alert(`${removedBuddy.name} has been removed from your basket and is now very very lonely and sad without an owner!`);
  };


  const adoptBuddy = (id) => {
    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
    adoptedCatIds.push(id);
    sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));

    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const updatedSavedCatIds = savedCatIds.filter((savedId) => savedId !== id);
    sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));

    const updatedSavedBuddies = savedBuddies.filter((buddy) => buddy.id !== id);
    setSavedBuddies(updatedSavedBuddies);

    const adoptedBuddy = badgerbuds.find((buddy) => buddy.id === id);
    alert(`${adoptedBuddy.name} has been adopted!`);
  };


  return (
    <div>
      <h1>Badger Buds Basket</h1>
      {savedBuddies.length === 0 ? (
        <p>You have no buds in your basket!</p>
      ) : (
        <p>These cute cats could be all yours!</p>
      )}
      {savedBuddies.map((buddy) => (
        <div key={buddy.id}>
            <img
            src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`}
            alt={`A cute wittle ittle picture of ${buddy.name}`}
            style={{ width: '250px', border: '2px solid gray' }}
          />
          <h2>{buddy.name}</h2>
          <Button onClick={() => unselectBuddy(buddy.id)}>Unselect</Button>
          <Button onClick={() => adoptBuddy(buddy.id)}>Adopt</Button>
        </div>
      ))}
    </div>
  );
}
