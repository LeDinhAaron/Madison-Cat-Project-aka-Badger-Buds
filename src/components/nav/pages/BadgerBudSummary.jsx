import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import Carousel from 'react-bootstrap/Carousel';

function BadgerBudSummary({buddy, onSave}) {
  const {name, imgIds, age, gender, breed, description} = buddy;

  const [showDetails, setShowDetails] = useState(false)

  //Lecture this week
  const imageUrl = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;
  const imageUrls = imgIds.map((imgId) => `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imgId}`);
  
  const imageStyle = {
    width: '100%',
    //paddingTop: '10%',
    border: '2px solid gray',  
  };

  const divStyle = {
    width: '100%',
    position: 'relative',
    paddingTop: '10%',
    paddingBottom: '10%',
    // paddingLeft: '10%',
    // paddingRight: '10%',
    border: '2px solid gray',
  };

  const calculateAge = (age) => {
    if (age < 12) {
      return `${age} month(s) old`;
    } else {
      const years = Math.floor(age/12);
      const months = age % 12;
      return `${years} years and ${months} months old`;
    }
  };

  function moveToBasket(from, to, buddyId){
    onSave(buddy.id);
    alert(`${buddy.name} has been added to your basket!`);
  }

  /**
   * A majority of the Carousel Code was borrow from this website
   * https://react-bootstrap.netlify.app/docs/components/carousel/
   * and
   * https://www.npmjs.com/package/react-responsive-carousel
   */
  return (
    <div>
      {showDetails ? (
        <Carousel>
          {imageUrls.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <img src={imageUrl} alt={`A cute wittle ittle picture of ${name}`} style={imageStyle} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>
          <img src={imageUrls[0]} alt={`A cute wittle ittle picture of ${name}`} style={imageStyle} />
          <h2>{name}</h2>
          <Button onClick={() => setShowDetails(true)}>Show More</Button>
          <Button onClick={moveToBasket}>Save</Button>
        </div>
      )}
      {showDetails && (
        <div style = {divStyle}>
          <p>Gender: {gender}</p>
          <p>Breed: {breed}</p>
          <p>Age: {calculateAge(age)}</p>
          {description && <p>Description: {description}</p>}
          <Button onClick={() => setShowDetails(false)}>Show Less</Button>
        </div>
      )}
    </div>
  );
}

export default BadgerBudSummary;