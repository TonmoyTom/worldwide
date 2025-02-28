import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Map(){
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat"); // Get latitude
    const lng = searchParams.get("lng"); // Get longitude
    return (
            <div className={styles.mapContainer} onClick={()=>{
                navigate("form")
            }}>
                <h1>Maps</h1>
                <h1>
                    Position : {lat} {lng}
                </h1>
                <button type="button" onClick={() => {
                    setSearchParams({lat: lat, lng: lng});
                }}></button>
            </div>
    )
}