import PropTypes from "prop-types";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";

const CityList = ({cities, isLoading}) => {
    if (isLoading) return <p>Loading...</p>;
    if (cities.length < 0) return <p>There is no cities</p>
    return (
        <ul className={styles.cityList}>
            {cities.length > 0 ? (
                cities.map((city) => <CityItem city={city} key={city.id}/>)
            ) : (
                <p>No cities available</p>
            )}
        </ul>
    );
};

CityList.propTypes = {
    cities: PropTypes.array.isRequired,      // Expecting an array (required)
    isLoading: PropTypes.bool.isRequired,    // Expecting a boolean (required)
};

export default CityList;
