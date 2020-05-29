import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import './App.css';

const style = {
    margin: "0 auto",
    width: '100%',
    height: '500px',
    marginTop: "5vh",
    float: "none"
}
function Leaflet(props) {
    let coords = props.coords;
    return (
        <Map center={coords} zoom={13} style={style}>
            <TileLayer
                url="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Circle color='green' fillOpacity={0.3} radius={200} opacity={0.6} center={coords} >
                <Popup>You are in this area!</Popup>
            </Circle>
            {props.places.map((place, index) => {
                let lat = place.geometry.location.lat;
                let lng = place.geometry.location.lng;
                let newCoords = [lat, lng];
                return (
                    < div >
                        {
                            (place.rating >= props.rating) && [
                                <Marker position={newCoords} >
                                    <Popup>
                                        {place.name}
                                        <br />{place.rating}&#9733; ({place.user_ratings_total}) on Yelp  <br />{place.vicinity}
                                    </Popup>
                                </Marker>
                            ]
                        }
                    </div>
                );
            })
            }
        </Map >
    );
}
export default Leaflet;