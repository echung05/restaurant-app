import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Sort from './Sort';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const DisplayPlaces = (props) => {
    const [value, setValue] = useState(1)
    return (
        <div>
            <Sort places={props.places} setPlaces={props.setPlaces} update={setValue} value={value} />
            <Card className="scroll" style={{ margin: "0 auto", width: "50vh", textAlign: "left", float: "none" }}>
                <Accordion>
                    {props.places.map((place, index) => {
                        return (
                            <div>
                                {
                                    (place.rating >= props.rating) && [
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
                                    ]
                                }
                            </div>
                        )
                    })}
                </Accordion>
            </Card>
        </div>
    );
}
export default DisplayPlaces;  