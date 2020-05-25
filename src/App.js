import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const DisplayPlaces = (props) => {
  return (
    <div className="placesList">
      <Accordion>
        {props.places.map(place => {
          return (
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  {place.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{place.rating}</Card.Body>
              </Accordion.Collapse>
            </Card>
          )
        })}
      </Accordion>
    </div>
  );
}

function App() {
  const [getPlaces, setPlaces] = React.useState(
    [{
      name: "The Virginian",
      rating: "4.3/5",
      location: "1521 University Ave",
      price: "$$",
      type: "American restaurant",
    }, {
      name: "Roots",
      rating: "4.7/5",
      location: "1329 Main St W",
      price: "$",
      type: "Restaurant",
    }, {
      name: "Christians",
      rating: "4/5",
      location: "100 14th St NW",
      price: "$",
      type: "Pizza Restaurant",
    }]);

  return (
    <div className="App">

      <DisplayPlaces places={getPlaces} />

    </div>
  );
}

export default App;
