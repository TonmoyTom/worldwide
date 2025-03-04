import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";
import { useCities } from "../context/CitiesContext.jsx";

const CountryList = () => {
    const  {cities, loading} = useCities();
    console.log(cities , 'countries');
    if (loading) return <p>Loading...</p>;
    if (cities.length < 0) return <p>There is no country</p>

    return (
        <ul className={styles.countryList}>
            {cities.length > 0 ? (
                cities.map((country) => <CountryItem country={country} key={country.id}/>)
            ) : (
                <p>No countries available</p>
            )}
        </ul>
    );
};

CountryList.propTypes = {
    cities: PropTypes.array.isRequired,      // Expecting an array (required)
    isLoading: PropTypes.bool.isRequired,    // Expecting a boolean (required)
};

export default CountryList;
