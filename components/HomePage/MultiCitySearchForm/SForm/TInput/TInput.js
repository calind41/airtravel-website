import React, { useState, useEffect } from "react";
import styles from "./TInput.module.css";
import locationStyles from "../Locations/Locations.module.css";
import { locations } from "../FInput/FInput";
import Locations from "../Locations/Locations";
import LocSmallScreen from "../LocSmallScreen/LocSmallScreen";
export default function TInput({
  nr,
  toInputLocationsRendered,
  passLocationsState,
}) {
  // refs
  let toInputRef = null;
  let [inputRef, setInputRef] = useState(null);
  const [isLocationsRendered, setIsLocationsRendered] = useState(
    toInputLocationsRendered
  );
  const [displayLocsSmall, setDisplayLocsSmall] = useState(false);
  useEffect(() => {
    setInputRef(toInputRef);
  }, [toInputRef]);

  const [locs, setLocs] = useState(locations);
  const [acronym, setAcronym] = useState("");
  const [toValue, setToValue] = useState("");
  const [display, setDisplay] = useState("none");

  const [isRenderedLocationsTInput, setIsRenderedLocationsTInput] = useState(
    false
  );

  const receiveToInput = (text, acronym) => {
    setDisplay("none");
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
  const showLocations = (evt) => {
    if (window.innerWidth <= 780) {
      setDisplayLocsSmall(true);

      // Already rendered
      if (displayLocsSmall) {
        const locationsSmallScreenElement = document.querySelector(
          `#locationSmallScreenId${nr}`
        );
        locationsSmallScreenElement.style.display = "block";
      }

      // Hide component when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setDisplayLocsSmall(false);
      });
      localStorage.setItem("inType", "To");
    } else {
      // Already rendered
      if (isRenderedLocationsTInput) {
        setDisplay("block");
        evt.target.parentNode.nextSibling.style.display = "block";
      }
      // First render
      else {
        setDisplay("block");
        setIsRenderedLocationsTInput(true);
      }

      // Hide rest of locations if already rendered
      document
        .querySelectorAll(`.${locationStyles.locationsC}`)
        .forEach((el) => {
          if (
            el.id !== `locationsFromId${nr}` &&
            el.id !== `locationsToId${nr}`
          ) {
            el.style.display = "none";
          }
        });

      const fromNr = document.querySelector(`.from${nr}`);
      if (fromNr) fromNr.style.display = "none";

      // Hide passenger dropdown
      document
        .querySelectorAll(`#dropdownCid`)
        .forEach((el) => (el.style.display = "none"));
      document.querySelector(`#passengerSvgId`).style.transform =
        "rotate(0deg)";

      // Hide calendar
      for (let i = 0; i < 4; i++) {
        let c = document.querySelector(`#wrapperId${i}`);
        if (c) {
          c.style.display = "none";
        }
        let svg = document.querySelector(`#departingSvgId${i}`);
        if (svg) {
          svg.style.transform = "rotate(0deg)";
        }
      }
    }
  };

  return (
    <div className={styles.toInput}>
      <label>
        <input
          ref={(el) => (toInputRef = el)}
          id={`toInputId${nr}`}
          value={toValue}
          type='text'
          placeholder='To'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => {
            el.target.setSelectionRange(0, 24);
          }}
          onFocus={(evt) => {
            showLocations(evt);
          }}
          onChange={filterLocations}
        />
        <span id={`toInputAcronymId${nr}`}>{acronym}</span>
      </label>
      {isRenderedLocationsTInput ? (
        <Locations
          nr={nr}
          display={display}
          toInputRef={inputRef}
          locations={locs}
          inputType='to'
          passInput={receiveToInput}
        />
      ) : null}

      {displayLocsSmall ? <LocSmallScreen locType='To' nr={nr} /> : null}
    </div>
  );
}
