import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";

const CityItem = ({city}) => {
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        }).format(new Date(date));

    return (
            <Link className={styles.cityItem} to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
                <span className={styles.emoji}>{city.emoji}</span>
                <span className={styles.name}>{city.cityName}</span>
                <span className={styles.date}>{formatDate(city.date)}</span>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
    )
}
export default CityItem;