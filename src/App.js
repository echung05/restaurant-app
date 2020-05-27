import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './InputForm'
import Leaflet from "./Leaflet.js"
require('dotenv').config();

const DisplayPlaces = (props) => {
  return (
    <Card style={{ margin: "0 auto", width: "50vh", textAlign: "left", float: "none" }}>
      <Accordion>
        {props.places.map((place, index) => {
          return (
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                  <div>{place.name}</div>
                  <div style={{ fontSize: "12px", textAlign: "left", fontWeight: "bold" }}>
                    {
                      place.price_level === 4 ? <div>$$$$</div> :
                        place.price_level === 3 ? <div>$$$</div> :
                          place.price_level === 2 ? <div>$$</div> :
                            <div>$</div>
                    }
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>
                  <div style={{ fontSize: "12px", textAlign: "left" }}>{place.rating} &#9733; ({place.user_ratings_total}) on Yelp</div>
                  <div style={{ fontSize: "12px", textAlign: "left", fontWeight: "bold" }}>{place.vicinity}</div>
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
      <Leaflet coords={getCoords} places={getPlaces} />
      <div style={{ marginTop: "2vh" }}><DisplayPlaces places={getPlaces} /></div>
    </div >
  );
}

export default App;