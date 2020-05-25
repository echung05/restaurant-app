import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './InputForm'
require('dotenv').config();

const DisplayPlaces = (props) => {
  //const [getIndex, setIndex] = React.useState(0);
  return (
    <Card style={{ width: "50vh", marginLeft: "36vw", textAlign: "left" }}>
      <Accordion>
        {props.places.map(place => {
          return (
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <div>{place.name}</div>
                  <div style={{ fontSize: "12px", textAlign: "left" }}>
                    {
                      place.price_level === 4 ? <div>$$$$</div> :
                        place.price_level === 3 ? <div>$$$</div> :
                          place.price_level === 2 ? <div>$$</div> :
                            <div>$</div>
                    }
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div style={{ fontSize: "12px", textAlign: "left" }}>{place.rating} ({place.user_ratings_total}) on yelp</div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )
        })}
      </Accordion>
    </Card>
  );
}

function App() {

  const [getPlaces, setPlace] = React.useState([]);
  const [getCoords, setCoords] = React.useState();


  return (
    <div className="App" >
      <h1 className="header" style={{ fontWeight: "bold", marginTop: "2vh" }}>HOOS Eating</h1>


      <div style={{ marginTop: "2vw" }}><InputForm places={getPlaces} setPlaces={setPlace} setCoords={setCoords} /></div>
      <div><DisplayPlaces places={getPlaces} /></div>

    </div >
  );
}

export default App;