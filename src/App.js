import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './InputForm';
import Leaflet from "./Leaflet.js";
import DisplayPlaces from './DisplayPlaces';
import Sort from './Sort';
require('dotenv').config();

function App() {
  const [getPlaces, setPlace] = React.useState([]);
  const [getCoords, setCoords] = React.useState();
  const [getRating, setRating] = React.useState(0);

  return (
    <div className="App" >
      <h1 className="header" style={{ fontWeight: "bold", marginTop: "2vh" }}>HOOS Eating</h1>


      <div style={{ marginTop: "2vw" }}><InputForm places={getPlaces} setPlaces={setPlace} setCoords={setCoords} setRating={setRating} rating={getRating} /></div>
      {
        (getPlaces.length !== 0) && [
          <Container fluid style={{ marginBottom: "8vh" }}>
            <Row>
              <Col md='auto' style={{ marginTop: "4.5vh" }}>
                <DisplayPlaces places={getPlaces} rating={getRating} setPlaces={setPlace} />
              </Col>
              <Col>
                <Leaflet coords={getCoords} places={getPlaces} rating={getRating} />
              </Col>
            </Row>
          </Container>
        ]
      }

      {/* <Leaflet coords={getCoords} places={getPlaces} />
      <div style={{ marginTop: "2vh" }}><DisplayPlaces places={getPlaces} /></div> */}
    </div >
  );
}

export default App;