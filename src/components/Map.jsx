import styles from './Map.module.css';
import ButtonStyles from "./button.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"; 
import { useState, useEffect } from 'react';
import { useCities } from '../context/CitiesContext';
import useGeolocation from '../hook/useGeolocation';
import useUrlPosition from '../hook/useUrlPosition';

export default function Map() {

    const { cities} = useCities();
    const { isLoading : isLoadingPosition , position: geoLocationPosition , getPosition} = useGeolocation();
   
    const [lat,lng] = useUrlPosition();

    const [mapPosition, setMapPosition] = useState([lat, lng]);
    console.log(geoLocationPosition , 'geoLocationPosition');

    useEffect(() => {
        if(lat && lng) setMapPosition([lat, lng]); // Update position if URL params change
    }, [lat, lng]);

    useEffect(() => {
        if(geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lan]); // Update position if URL params change
    }, [geoLocationPosition]);
    return (
        <div className={styles.mapContainer}>
            {
                !geoLocationPosition && (
                    <button className={ButtonStyles.position} onClick={getPosition}>{ isLoadingPosition ? 'Loading' : 'Use your position'}</button>
                )
            }
        
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {
                    cities.map((city) => (
                        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                            <Popup>
                                <span>{city.emoji}</span><span>{city.cityName}</span>
                                </Popup>
                        </Marker>
                    )) 
                }
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => {
            console.log(e); // Logs event object
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); // Corrected latlng
        }
    });
}

function ChangeCenter({position}){

    const map = useMap();
    map.setView(position)
    return null;
}

