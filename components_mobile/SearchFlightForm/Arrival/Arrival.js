import React, { useState, useEffect } from "react";
import styles from "./Arrival.module.scss";
import LocationsSmallScreen from "../Locations/LocationsSmallScreen/LocationsSmallScreen";

export default function Arrival({
  renderedArrivalLocations,
  unmountArrivalLocations,
  renderArrivalLocations,
  inputValue,
  airportAcronym,
  passInputValue,
  renderDepartureLocations,
  renderCalendar,
}) {
  const [isRenderedLocationsSmall, setIsRenderedLocationsSmall] = useState(
    renderedArrivalLocations
  );
  const [acronym, setAcronym] = useState(airportAcronym);
  const [toValue, setToValue] = useState(inputValue);

  useEffect(() => {
    setIsRenderedLocationsSmall(renderedArrivalLocations);
  }, [renderedArrivalLocations]);
  useEffect(() => {
    setToValue(inputValue);
    setAcronym(airportAcronym);
  }, [inputValue, airportAcronym]);

  const showLocations = () => {
    const locationsSmallScreenElement = document.querySelector("#lsm2");
    // Already rendered
    if (locationsSmallScreenElement) {
      // Hide component when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
          if (document.querySelector("#lsm2"))
            document.querySelector("#lsm2").style.display = "none";
      });
      locationsSmallScreenElement.style.display = "block";
    }
    // Render component
    else {
      // setIsRenderedLocationsSmall(true);
      renderArrivalLocations();
    }
  };

  const receiveInputValue = (v, acronym) => {
    passInputValue(v, acronym);
  };
  return (
    <div className={styles.toInput}>
      <label>
        <input
          id='toInputId'
          value={toValue}
          type='text'
          placeholder='Прибытие'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => el.target.setSelectionRange(0, 24)}
          onFocus={() => {
            showLocations();
          }}
          onChange={showLocations}
        />
        <span id='toInputAcronymId'>{acronym}</span>
      </label>
      {isRenderedLocationsSmall ? (
        <LocationsSmallScreen
          defaultValue={toValue}
          passInputValue={receiveInputValue}
          unmountArrivalLocations={unmountArrivalLocations}
          renderDepartureLocations={renderDepartureLocations}
          renderCalendar={renderCalendar}
          id='lsm2'
          arrivalInputT={true}
        />
      ) : null}
    </div>
  );
}
