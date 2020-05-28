import React from 'react';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RangeSlider from 'react-bootstrap-range-slider';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getDistance from 'geolib/es/getDistance';
import './InputForm.css';

let convert = require('convert-units');

const InputForm = (props) => {

    const [getData, setData] = React.useState({ distance: 0, price: 4 });

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
        let dist;
        console.log()
        if (getData.distance === 0) {
            dist = "&rankby=distance"
        } else {
            dist = "&radius=" + getData.distance;
        }
        let pricing = getData.price + dist;
        let loc = "&location=" + lat + "," + lng + "&minprice=0&maxprice=" + pricing;
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&keyword=restaurant+bar&key=" + process.env.REACT_APP_API_KEY + loc

        fetch(url)
            .then(resp => resp.json())
            .then(data => props.setPlaces(data.results))
            .catch(err => console.error(err));
    }

    const changeEvent = (event) => {
        props.setRating(Number(event.target.value));
    }

    return (
        <Card style={{ margin: "0 auto", height: "300px", width: "70vw", marginBottom: "5vh", float: "none" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Label style={{ marginTop: "2vh" }}>Enter address to see open restaurants and bars nearby: </Form.Label>
                <Form.Group controlId="formAddress">
                    <Form.Control type="text" placeholder="Address" style={{ margin: "0 auto", width: "40vw", marginTop: "2vh", float: "none" }} />
                </Form.Group>
                <Form.Group controlId="formRating" style={{ width: '60vw', margin: "0 auto", float: 'none' }}>
                    <Row >
                        <Col style={{ marginTop: "0.5vh", marginLeft: '-12vh' }}><Form.Label>Minimum Rating:</Form.Label></Col>
                        <Col style={{ marginLeft: '-8vh' }}>
                            <RangeSlider value={props.rating}
                                onChange={(event) => changeEvent(event)}
                                min={0} max={5} step={.1} tooltip='auto' tooltipLabel={(val) => val} />
                        </Col>
                        <Col style={{ marginTop: "0.5vh" }}><Form.Label>Distance Away (0 = no preference):</Form.Label></Col>
                        <Col style={{ marginLeft: '-1vh' }}>
                            <RangeSlider value={getData.distance}
                                onChange={(event) => setData({ distance: Number(event.target.value) })}
                                min={0} max={50000} step={1000} tooltip='auto' tooltipLabel={(val) => Math.floor(convert(val).from('m').to('mi'))} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group style={{ marginTop: "5px" }} controlId="formPricing">
                    <DropdownButton id="dropdown-item-button" title="Pricing">
                        <Dropdown.Item onSelect={() => setData({ ...getData, price: 1 })}>$</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setData({ ...getData, price: 2 })}>$$</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setData({ ...getData, price: 3 })}>$$$</Dropdown.Item>
                        <Dropdown.Item onSelect={() => setData({ ...getData, price: 4 })}>$$$$</Dropdown.Item>
                    </DropdownButton>
                </Form.Group>
                <Button className="submitButton" variant="outline-primary" type="submit" style={{ marginTop: "1vh" }}>
                    Submit
                </Button>
            </Form>
        </Card >
    );
}

export default InputForm;
