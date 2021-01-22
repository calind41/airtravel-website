import React, { useState, useEffect } from "react";
import styles from "./LocationsSmallScreen.module.scss";

import { locations } from "../../locations";
import {
  planeIcon,
  locationIcon,
  goBackMobileSvg,
  arrowNextSvg,
} from "../../svg";

import { closeIconSvg } from "../../../svg";

import { i18n } from "../../../../../i18n";

export default function LocationsSmallScreen({
  arrivalInputT,
  id,
  renderArrivalLocations,
  unmountArrivalLocations,
  passInputValue,
  renderDepartureLocations,
  renderCalendar,
  defaultValue,
  locationType,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`searchFlightFormMobile:${key}`);
  };

  const [value, setValue] = useState(defaultValue);
  const [locs, setLocs] = useState(locations);
  const [disabledBtnState, setDisabledBtnState] = useState(true);
  // const locationType = localStorage.getItem("inType");

  useEffect(() => {}, [arrivalInputT]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const filterLocations = (evt) => {
    // set value to input field
    setValue(evt.target.value);

    // filter
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

  const handleClick = (loc) => {
    const city = loc.full.props.children[0];
    const country = loc.full.props.children[1].props.children;
    let text = city + country;

    passInputValue(text, loc.acronym);
    setValue(text);

    toNextInput();
  };

  const closeLocations = () => {
    document.querySelector(`#${id}`).style.display = "none";
    unmountArrivalLocations();
  };

  const toNextInput = () => {
    const lsm = document.querySelector(`#${id}`);
    const lsm2 = document.querySelector(`#lsm2`);

    // open arrival locations (id lsm2)
    if (id === "lsm1") {
      unmountArrivalLocations();

      if (!lsm2) {
        renderArrivalLocations();
      } else {
        lsm2.style.display = "block";
      }
      lsm.classList.add(styles.slideLeft);
      setTimeout(() => {
        // close current locations component
        lsm.style.display = "none";
        lsm.classList.remove(styles.slideLeft);
      }, 500);
    }

    if (id === "lsm2") {
      lsm.classList.add(styles.slideLeft);

      setTimeout(() => {
        unmountArrivalLocations();
        lsm.classList.remove(styles.slideLeft);
      }, 500);
    }
  };

  const emptyValue = value === "";
  return (
    <div
      style={id === "lsm1" ? { zIndex: 1000000 } : { zIndex: 100000 }}
      id={id}
      className={styles.container}
    >
      <div>
        <span>{locationType}</span>
        <span className={styles.closeIcon} onClick={closeLocations}>
          {closeIconSvg}
        </span>
      </div>
      <div>
        <input
          value={value}
          placeholder={
            id === "lsm1"
              ? `${getLanguageSpecificContent(
                  "LocationsSmallScreen-inputPlaceholder-departure"
                )}`
              : `${getLanguageSpecificContent(
                  "LocationsSmallScreen-inputPlaceholder-arrival"
                )}`
          }
          type='text'
          spellCheck='false'
          onChange={filterLocations}
        />
      </div>
      <div className={styles.locationsList}>
        {locs &&
          !emptyValue &&
          locs.map((location, i) => {
            return (
              <div onClick={() => handleClick(location)} key={i}>
                <span
                  className={
                    location.iconType === "plane"
                      ? `${styles.planeI}`
                      : `${styles.locationI}`
                  }
                >
                  {location.iconType === "plane" ? planeIcon : locationIcon}
                </span>
                <span>{location.full}</span>
                <span>{location.acronym}</span>
              </div>
            );
          })}
      </div>
      {/* <button
        onClick={toNextInput}
        disabled={disabledBtnState}
        className={styles.nextBtn}
        id={`${id}btn`}
      >
        <span>Далее</span>
        <span>{arrowNextSvg}</span>
      </button> */}
    </div>
  );
}
