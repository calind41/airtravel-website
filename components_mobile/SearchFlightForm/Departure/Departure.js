import React, { useState, useEffect } from "react";
import styles from "./Departure.module.scss";
import Locations from "../Locations/Locations";
import { locations } from "../locations";

import LocationsSmallScreen from "../Locations/LocationsSmallScreen/LocationsSmallScreen";
export default function Departure({
  renderArrivalLocations,
  unmountArrivalLocations,
  inputValue,
  airportAcronym,
  passInputValue,
  renderedDepartureLocations,
}) {
  const [acronym, setAcronym] = useState(airportAcronym);
  const [fromValue, setFromValue] = useState(inputValue);
  const [isRenderedLocationsSmall, setIsRenderedLocationsSmall] = useState(
    renderedDepartureLocations
  );

  useEffect(() => {
    setFromValue(inputValue);
    setAcronym(airportAcronym);
  }, [inputValue, airportAcronym]);
  useEffect(() => {
    setIsRenderedLocationsSmall(renderedDepartureLocations);
  }, [renderedDepartureLocations]);

  const showLocations = () => {
    const locationsSmallScreenElement = document.querySelector("#lsm1");
    // Already rendered
    if (locationsSmallScreenElement) {
      locationsSmallScreenElement.style.display = "block";
      // Hide component when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          unmountArrivalLocations();
          document.querySelector("#lsm1").style.display = "none";
        }
      });
    } else {
      // Render component
      setIsRenderedLocationsSmall(true);
    }
  };

  const receiveInputValue = (v, acronym) => {
    passInputValue(v, acronym);
  };
  return (
    <div className={styles.fromInput}>
      <label>
        <input
          id='fromInputId'
          value={fromValue}
          type='text'
          placeholder='Вылет'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => el.target.setSelectionRange(0, 24)}
          onFocus={() => {
            showLocations();
          }}
          onChange={showLocations}
        />
        <span id='fromInputAcronymId'>{acronym}</span>
      </label>

      {isRenderedLocationsSmall ? (
        <LocationsSmallScreen
          defaultValue={fromValue}
          passInputValue={receiveInputValue}
          renderArrivalLocations={renderArrivalLocations}
          unmountArrivalLocations={unmountArrivalLocations}
          id='lsm1'
          arrivalInputT={false}
        />
      ) : null}
    </div>
  );
}
