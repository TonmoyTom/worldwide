import styles from './Map.module.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet"; 
import { useState, useEffect } from 'react';
import { useCities } from '../context/CitiesContext';

export default function Map() {
    const [searchParams] = useSearchParams();
    const { cities} = useCities();
   
    const lat = parseFloat(searchParams.get("lat")) || 40; // Default to 40 if not provided
    const lng = parseFloat(searchParams.get("lng")) || 0; // Default to 0 if not provided

    const [mapPosition, setMapPosition] = useState([lat, lng]);

    useEffect(() => {
        if(lat && lng) setMapPosition([lat, lng]); // Update position if URL params change
    }, [lat, lng]);
    return (
        <div className={styles.mapContainer}>
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

