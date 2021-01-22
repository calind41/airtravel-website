import React, { useState, useEffect } from "react";
import styles from "./PassengerDropdown.module.css";
import stylesCInput from "../../MultiCitySearchForm/SForm/CInput/CInput.module.css";
import stylesCalendar from "../../MultiCitySearchForm/SForm/CInput/Calendar/Calendar.module.css";
import stylesCalendarC from "../CalendarInput/CalendarC/CalendarC.module.css";
import stylesLocations from "../Locations/Locations.module.css";
import Dropdown from "./Dropdown/Dropdown";

export default function PassengerDropdown({
  leftPosClass,
  positionClass,
  nr,
  passengerCMultiCityClass,
}) {
  console.log("calllled");
  const [nrAdults, setNrAdults] = useState(1);
  const [selectedType, setSelectedType] = useState("economy");
  const [dropdownDisplay, setDropdownDisplay] = useState("none");

  const passNrAdults = (nrAdults) => {
    setNrAdults(nrAdults);
  };
  const passSelectedType = (selectedType) => {
    setSelectedType(selectedType);
  };
  const handleClick = (evt) => {
    // hack pentru a nu roti 180grade sageata de sub dropdown
    let node = evt.target;
    while (
      node !== null &&
      node.classList &&
      !node.classList.contains("bodyClassName")
    ) {
      if (node.classList.contains("dropdownC")) {
        return;
      }
      node = node.parentElement;
    }
    // rotate arrow
    let svgEl = document.querySelector(`#passengerSvgId`);
    if (svgEl.style.transform == "rotate(180deg)") {
      document.querySelector(`#passengerSvgId`).style.transform =
        "rotate(0deg)";
    } else {
      document.querySelector(`#passengerSvgId`).style.transform =
        "rotate(180deg) ";
    }

    // toggle dropdown
    let dropdownEl = document.querySelector(`#dropdownCid`);
    console.log(dropdownEl);
    if (dropdownEl.style.display === "block") {
      dropdownEl.style.display = "none";
      setDropdownDisplay("none");
    } else {
      dropdownEl.style.display = "block";
      setDropdownDisplay("block");
      // Hide calendar case SingleCity SearchForm
      if (document.querySelector("#departingSvgId"))
        document.querySelector("#departingSvgId").style.transform =
          "rotate(0deg)";
      if (document.querySelector(`.${stylesCalendarC.wrapper}`))
        document.querySelector(`.${stylesCalendarC.wrapper}`).style.display =
          "none";

      // Hide Locations - from input and calendar in case of MultiCity Searchform
      for (let i = 0; i < 4; i++) {
        let calendar = document.querySelector(`#wrapperId${i}`);
        let calendarSvg = document.querySelector(`#departingSvgId${i}`);
        let lFrom = document.querySelector(`#locationsFromId${i}`);
        let lTo = document.querySelector(`#locationsToId${i}`);
        if (lFrom) {
          lFrom.style.display = "none";
        }
        if (lTo) {
          lTo.style.display = "none";
        }
        if (calendar) {
          calendar.style.display = "none";
          calendarSvg.style.transform = "rotate(0deg)";
        }
      }
    }
  };
  return (
    <div
      className={`${styles.passengerC} ${styles.pC} ${styles[passengerCMultiCityClass]} ${styles[positionClass]} ${styles[leftPosClass]}`}
    >
      <div onClick={handleClick}>
        <span className={styles.nrP}>{nrAdults}</span>
        <span>passenger,</span>
        <span className={styles.type}>{selectedType.toLowerCase()}</span>
        <svg
          id={`passengerSvgId`}
          className='_7TN9i _1rcak'
          width='10'
          height='6'
          viewBox='0 0 24 14.8'
          fill='#222'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g fill='#000'>
            <path d='M2.8,0L12,9.2L21.2,0L24,2.8l-12,12L0,2.8L2.8,0z'></path>
          </g>
        </svg>
      </div>
      <Dropdown
        nr={nr}
        display={dropdownDisplay}
        passNrAdults={passNrAdults}
        passSelectedType={passSelectedType}
      />
    </div>
  );
}
