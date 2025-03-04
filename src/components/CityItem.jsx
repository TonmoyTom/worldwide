import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";
import { useCities } from "../context/CitiesContext.jsx";

const CityItem = ({city}) => {
    const  {currentCity} = useCities();
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        }).format(new Date(date));

    return (
            <Link className={`${styles.cityItem} ${city.id === currentCity.id ? styles['cityItem--active'] : '' }` } to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
                <span className={styles.emoji}>{city.emoji}</span>
                <span className={styles.name}>{city.cityName}</span>
                <span className={styles.date}>{formatDate(city.date)}</span>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
    )
}
export default CityItem;