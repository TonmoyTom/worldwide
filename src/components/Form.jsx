// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import ButtonStyles from "./button.module.css";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hook/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geolocationError, setGeolocationError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!cityName || !date )  return;
    const newCity = {
      cityName,date, emoji, notes, position : {lat , lng}
    }
    console.log(newCity)
  }

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        setCityName(data.city || data.locality)
        setCountry(data.countryName);
        setEmoji(data.emoji)
        console.log(data, isLoadingGeolocation);
      } catch (err) {
        setGeolocationError('Could not found ');
        console.log(err);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if(isLoadingGeolocation) return 'Loading';
  if(geolocationError) return 'Location not found';
  if(!lat && !lng) return 'Click the map ';
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{country}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker  selected={date} onChange={(date) => setDate(date)}/>
        
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button className={`${ButtonStyles.btn} ${ButtonStyles.primary}`}>
          Add
        </button>
        <button
          className={`${ButtonStyles.btn} ${ButtonStyles.back}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
