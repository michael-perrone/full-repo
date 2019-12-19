import React, { useState, useEffect } from "react";
import styles from "./AdvancedSearch.module.css";
const AdvancedSearch = props => {
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  function handleCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function handleState(event) {
    event.preventDefault();
    setState(event.target.value);
  }

  function handleZip(event) {
    event.preventDefault();
    setZip(event.target.value);
  }

  return (
    <div className={styles.searchContainer}>
      <p
        style={{
          position: "relative",
          top: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontFamily: "Josefin sans, sans",
          textShadow: "1px 1px white"
        }}
      >
        Club Search
      </p>
      <div id={styles.inputContainer}>
        <input
          onChange={handleCity}
          value={city}
          placeholder="Club City"
          className={styles.searchInput}
        />
        <input
          onChange={handleZip}
          value={zip}
          placeholder="Club Zipcode"
          className={styles.searchInput}
        />
        <input
          onChange={handleState}
          value={state}
          placeholder="Club State"
          className={styles.searchInput}
        />
        <button
          onClick={props.advancedSearchFunction(city, state, zip)}
          id={styles.searchButton}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
