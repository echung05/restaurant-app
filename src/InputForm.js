import React from 'react';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import getDistance from 'geolib/es/getDistance';
import './InputForm.css';

const InputForm = (props) => {

    const handleSubmit = event => {
        event.preventDefault();
        let userAddress = "&address=" + event.target.elements.formAddress.value;
        let api_url = "https://maps.googleapis.com/maps/api/geocode/json?&key=" + process.env.REACT_APP_API_KEY + userAddress;
        fetch(api_url)
            .then(resp => resp.json())
            .then(data => {
                handleAPIResults(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
                props.setCoords([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]);
            })
            .catch(err => console.error(err));
    }

    const handleAPIResults = (lat, lng) => {
        let loc = "&location=" + lat + "," + lng;
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&opennow&rankby=distance&keyword=restaurant+bar&key=" + process.env.REACT_APP_API_KEY + loc

        fetch(url)
            .then(resp => resp.json())
            .then(data => props.setPlaces(data.results))
            .catch(err => console.error(err));
    }

    return (
        <Card style={{ margin: "0 auto", height: "10vw", width: "50vw", marginBottom: "5vh", float: "none" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAddress">
                    <Form.Control type="text" placeholder="Enter address" style={{ margin: "0 auto", width: "40vw", marginTop: "2vh", float: "none" }} />
                </Form.Group>
                <Button className="submitButton" variant="outline-primary" type="submit" style={{ marginBottom: "2vh", marginTop: "3vh" }}>
                    Submit
                </Button>
            </Form>
        </Card>
    );
}

export default InputForm;
