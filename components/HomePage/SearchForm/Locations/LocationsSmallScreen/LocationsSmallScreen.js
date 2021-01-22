import React, { useState, useEffect } from "react";
import styles from "./LocationsSmallScreen.module.css";
import { locations } from "../../FromInput/FromInput";

export default function LocationsSmallScreen({ passInput }) {
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
    console.log(loc.acronym);
    const city = loc.full.props.children[0];
    const country = loc.full.props.children[1].props.children;
    let text = city + country;

    const locationsSmallScreenElement = document.querySelector(
      "#locationSmallScreenId"
    );
    if (localStorage.getItem("inType") === "From") {
      document.querySelector("#fromInputId").value = text;
      document.querySelector("#fromInputAcronymId").textContent = loc.acronym;
    }
    // inputType `to`
    else {
      document.querySelector("#toInputId").value = text;
      document.querySelector("#toInputAcronymId").textContent = loc.acronym;
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

const planeIcon = (
  <svg
    className={styles.planeSvg}
    id='planeSvgId'
    width='36px'
    height='36px'
    viewBox='0 0 36 36'
    version='1.1'
  >
    <title>66114142-7F07-4EF2-8BCF-A568B96F909F</title>
    <desc>Created with sketchtool.</desc>
    <g
      id='Symbols'
      stroke='none'
      stroke-width='1'
      fill='none'
      fill-rule='evenodd'
    >
      <g id='ico/product/white/avia' fill='#000000'>
        <g id='icon/product/avia'>
          <path
            d='M27.1787888,7.27521278 C28.0371528,6.41684873 29.3967971,6.39070045 30.2530483,7.24695167 C31.1092996,8.1032029 31.0831513,9.46284717 30.2247872,10.3212112 L24.8117128,15.7342856 L27.5000401,28.4132048 C27.6512408,29.1263102 27.4314868,29.8675031 26.9160351,30.3829548 L25.8369664,31.4620235 L20.168823,20.3771754 L14.3652108,26.1807877 L14.9942179,29.4519753 C15.0616748,29.8027888 14.950775,30.1642211 14.6981681,30.416828 L13.5544497,31.5605464 L10.9076741,26.5923259 L5.93945362,23.9455503 L7.08317198,22.8018319 C7.33577893,22.549225 7.69721121,22.4383252 8.0480247,22.5057821 L11.3192123,23.1347892 L27.1787888,7.27521278 Z M6.03797648,11.6630336 L7.14665684,10.5543533 C7.66179689,10.0392132 8.4024301,9.81939279 9.11519137,9.97009089 L19.6464466,12.1966991 L15.4038059,16.4393398 L6.03797648,11.6630336 Z'
            id='Combined-Shape'
          ></path>
        </g>
      </g>
    </g>
  </svg>
);
const locationIcon = (
  <svg version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512 512'>
    <g>
      <g>
        <path
          d='M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
                    c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
                    C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
                    s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z'
        />
      </g>
    </g>
  </svg>
);
