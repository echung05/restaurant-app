import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css'

const position = [51.505, -0.09]
const style = {
    margin: "0 auto",
    width: '50%',
    height: '400px',
    marginTop: "5vh",
    float: "none"
}
export default class Leaflet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("wow")
        return (
            <Map center={this.props.coords} zoom={13} style={style}>
                <TileLayer
                    url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={this.props.coords} > </Marker>
                {this.props.places.map((place, index) => {
                    let lat = place.geometry.location.lat;
                    let lng = place.geometry.location.lng;
                    let newCoords = [lat, lng];
                    return (
                        < div >
                            <Marker position={newCoords} >
                                <Popup>
                                    {place.name}<br />{place.rating}&#9733;<br />{place.vicinity}
                                </Popup>
                            </Marker>

                        </div>
                    );
                })
                }
            </Map >
        );
    }
}