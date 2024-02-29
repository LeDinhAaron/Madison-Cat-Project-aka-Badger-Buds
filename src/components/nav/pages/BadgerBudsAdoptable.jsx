import React, { useState, useContext, useEffect } from 'react';
import BadgerBudSummary from './BadgerBudSummary';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import {Col, Container, Row} from 'react-bootstrap';

export default function BadgerBudsAdoptable(props) {
    const badgerbuds = useContext(BadgerBudsDataContext);

    const [savedCatIds, setSavedCatIds] = useState(
      JSON.parse(sessionStorage.getItem('savedCatIds')) || []
    );

    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];

    useEffect(() => {
      sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
    }, [savedCatIds]);

    const moveBuddyToBasket = (id) => {
      setSavedCatIds((prevSavedCatIds) => [...prevSavedCatIds, id]);
    };

    const availableBuddies = badgerbuds.filter(
      (buddy) => !savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)
    );

    return (
      <div>
        <Container>
          <h1>Available Badger Buds</h1>
          {availableBuddies.length === 0 ? (
        <p>No buds are available for adoption!</p>
      ) : (
        <p>The following cats are looking for a loving home! Could you help?</p>
      )}
          <Row>
            {availableBuddies.map((buddy) => (
              <Col key={buddy.id} xs={6} md={4} lg={3} xxl={2}>
                <BadgerBudSummary 
                buddy={buddy}
                onSave={moveBuddyToBasket}
                />
              </Col>
            ))}
          </Row>
        </Container>
        </div>
      );
}

//get all buds in summary
//map it with badgerbudsummary
//use session storage to make sure which cats need to show