import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";

const CountryList = ({countries, isLoading}) => {
    console.log(countries , 'countries');
    if (isLoading) return <p>Loading...</p>;
    if (countries.length < 0) return <p>There is no country</p>

    return (
        <ul className={styles.countryList}>
            {countries.length > 0 ? (
                countries.map((country) => <CountryItem country={country} key={country.id}/>)
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
