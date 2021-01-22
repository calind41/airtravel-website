import React, { useState } from "react";
import styles from "./Departure.module.scss";
import Locations from "../Locations/Locations";
import { locations } from "../locations";

export default function Departure() {
  const [acronym, setAcronym] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [locs, setLocs] = useState(locations);

  const [isRenderedFromLocations, setIsRenderedFromLocations] = useState(false);

  const receiveFromInput = (text, acronym) => {
    setFromValue(text);
    setAcronym(acronym);
  };
  const filterLocations = (evt) => {
    setFromValue(evt.target.value);
    let input, filter;
    input = evt.target;
    filter = evt.target.value.toLowerCase();

    let filtered_locs = [];
    let temp = locations;
    temp.map((location, index) => {
      const city = location.full.props.children[0];
      const country = location.full.props.children[1].props.children;
      let text = city + country;

      if (text.toLowerCase().indexOf(filter) > -1) {
        // display it
        filtered_locs.push(location);
      }
    });

    setLocs(filtered_locs);
  };
  const showLocations = () => {
    const from = document.querySelector(".from");
    // already rendered (opening second time)
    if (from) {
      from.style.display = "block";
    }
    // render component
    else {
      setIsRenderedFromLocations(true);
    }
    if (document.querySelector(".to")) {
      document.querySelector(".to").style.display = "none";
    }
    // Hide passenger dropdown
    document.querySelector("#dropdownCid").style.display = "none";
    document.querySelector("#passengerSvgId").style.transform = "rotate(0deg)";
    // Hide calendar
    document.querySelector("#departingSvgId").style.transform = "rotate(0deg)";
    if (document.querySelector("#wrapperId")) {
      document.querySelector("#wrapperId").style.display = "none";
    }
  };
  return (
    <div className={styles.fromInput}>
      <label>
        <input
          id='fromInputId'
          value={fromValue}
          type='text'
          // placeholder='Вылет'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => el.target.setSelectionRange(0, 24)}
          onFocus={() => {
            showLocations();
          }}
          // onBlur={() => {
          //   if (fromValue === "") setFromValue(" ");
          // }}
          onChange={filterLocations}
        />
        <span id='fromInputAcronymId'>{acronym}</span>
        {/* <span className={styles.fromInputPlaceholder}>Вылет</span> */}
        <span className={styles.fromInputPlaceholder}>Zbor din</span>
      </label>
      {isRenderedFromLocations ? (
        <Locations
          locations={locs}
          inputType='from'
          passInput={receiveFromInput}
        />
      ) : null}
    </div>
  );
}
