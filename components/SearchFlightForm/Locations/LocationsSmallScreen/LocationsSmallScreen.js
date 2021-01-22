import React, { useState } from "react";
import styles from "./LocationsSmallScreen.module.scss";
import stylesDeparture from "../../Departure/Departure.module.scss";
import stylesArrival from "../../Arrival/Arrival.module.scss";
import { locations } from "../../locations";
import { planeIcon, locationIcon } from "../../svg";

export default function LocationsSmallScreen() {
  const [value, setValue] = useState("");
  const [locs, setLocs] = useState(locations);
  const locationType = localStorage.getItem("inType");

  const filterLocations = (evt) => {
    setValue(evt.target.value);
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

    const locationsSmallScreenElement = document.querySelector(
      "#locationSmallScreenId"
    );
    if (localStorage.getItem("inType") === "From") {
      document.querySelector("#fromInputId").value = text;
      document.querySelector("#fromInputAcronymId").textContent = loc.acronym;
      document.querySelector(
        `.${stylesDeparture.fromInputPlaceholder}`
      ).style.display = "none";
    }
    // inputType `to`
    else {
      document.querySelector("#toInputId").value = text;
      document.querySelector("#toInputAcronymId").textContent = loc.acronym;
      document.querySelector(
        `.${stylesArrival.toInputPlaceholder}`
      ).style.display = "none";
    }
    // Close locations
    document.querySelector("#locationSmallScreenId").style.display = "none";
  };

  const closeLocations = () => {
    document.querySelector("#locationSmallScreenId").style.display = "none";
  };

  return (
    <div id='locationSmallScreenId' className={styles.container}>
      <div>
        <span>{locationType}</span>{" "}
        <svg
          onClick={closeLocations}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          preserveAspectRatio='xMinYMin'
          xmlns='http://www.w3.org/2000/svg'
          class='TTOoD _3BXxf'
        >
          <path
            d='M12 10.94l7.47-7.47a.75.75 0 0 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 0 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 1.06-1.06L12 10.94z'
            fill-rule='evenodd'
          ></path>
        </svg>
      </div>
      <div>
        <input
          placeholder={value}
          type='text'
          spellCheck='false'
          onChange={filterLocations}
        />
      </div>
      <div className={styles.locationsList}>
        {locs &&
          locs.map((location, i) => {
            return (
              <div onClick={() => handleClick(location)} key={i}>
                <span
                  className={
                    location.iconType === "plane" ? `${styles.planeI}` : ""
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
    </div>
  );
}
