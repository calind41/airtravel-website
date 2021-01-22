import React, { useState, useEffect } from "react";
import styles from "./ToInput.module.css";
import Locations from "../Locations/Locations";
import { locations } from "../FromInput/FromInput";

export default function ToInput({
  toInputLocationsRendered,
  passLocationsState,
}) {
  // refs
  let toInputRef = null;
  let [inputRef, setInputRef] = useState(null);
  const [isLocationsRendered, setIsLocationsRendered] = useState(
    toInputLocationsRendered
  );
  useEffect(() => {
    setInputRef(toInputRef);
  }, [toInputRef]);

  const [locs, setLocs] = useState(locations);
  const [acronym, setAcronym] = useState("");
  const [toValue, setToValue] = useState("");

  const [isRenderedToLocations, setIsRenderedToLocations] = useState(false);

  const receiveToInput = (text, acronym) => {
    setToValue(text);
    setAcronym(acronym);
  };
  const filterLocations = (evt) => {
    setToValue(evt.target.value);
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
    if (window.innerWidth <= 780) {
      const locationsSmallScreenElement = document.querySelector(
        "#locationSmallScreenId"
      );
      // Already rendered
      if (locationsSmallScreenElement) {
        document.querySelector(
          "#locationSmallScreenId > div > span"
        ).textContent = "To";
        // Hide component when pressing Escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape")
            document.querySelector("#locationSmallScreenId").style.display =
              "none";
        });
        localStorage.setItem("inType", "To");

        locationsSmallScreenElement.style.display = "block";
      }
      // Render component
      else {
        localStorage.setItem("inType", "To");
        passLocationsState(true);
      }
    } else {
      const to = document.querySelector("#locationsToId");
      // already rendered (opening second time)
      if (to) {
        to.style.display = "block";
      }
      // render component
      else {
        setIsRenderedToLocations(true);
      }

      if (document.querySelector(".from")) {
        document.querySelector(".from").style.display = "none";
      }
      // Hide passenger dropdown
      document.querySelector("#dropdownCid").style.display = "none";
      document.querySelector("#passengerSvgId").style.transform =
        "rotate(0deg)";
      // Hide calendar
      document.querySelector("#departingSvgId").style.transform =
        "rotate(0deg)";
      if (document.querySelector("#wrapperId")) {
        document.querySelector("#wrapperId").style.display = "none";
      }
    }
  };

  return (
    <div className={styles.toInput}>
      <label>
        <input
          ref={(el) => (toInputRef = el)}
          id='toInputId'
          value={toValue}
          type='text'
          placeholder='To'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => el.target.setSelectionRange(0, 24)}
          onFocus={() => {
            showLocations();
          }}
          onChange={filterLocations}
        />
        <span id='toInputAcronymId'>{acronym}</span>
      </label>
      {isRenderedToLocations ? (
        <Locations
          toInputRef={inputRef}
          locations={locs}
          inputType='to'
          passInput={receiveToInput}
        />
      ) : null}
    </div>
  );
}
