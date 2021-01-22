import React, { useState } from "react";
import styles from "./CInput.module.css";
import stylesCalendar from "./Calendar/Calendar.module.css";
import Calendar from "./Calendar/Calendar";
import { months } from "./Calendar/Month/Month";
import CInputSmallScreen from "./CInputSmallScreen/CInputSmallScreen";

export default function CInput({ passCalendarState, nr }) {
  const [departingValue, setDepartingValue] = useState("Departing");
  const [isCalendarRendered, setIsCalendarRendered] = useState(false);
  const [
    isMultiCalendarSmallRendered,
    setIsMultiCalendarSmallRendered,
  ] = useState(false);
  const handleClick = () => {
    if (window.innerWidth <= 780) {
      // First Render
      setIsMultiCalendarSmallRendered(true);
      let calendarSmall = document.querySelector(
        `#calendarInputSmallScreenId${nr}`
      );
      // Already rendered
      if (calendarSmall) {
        calendarSmall.style.display = "block";
      }
    } else {
      let svgEl = document.querySelector(`#departingSvgId${nr}`);
      if (svgEl.style.transform == "rotate(180deg)") {
        document.querySelector(`#departingSvgId${nr}`).style.transform =
          "rotate(0deg)";

        if (document.querySelector(`#wrapperId${nr}`))
          document.querySelector(`#wrapperId${nr}`).style.display = "none";
        // Render calendar
      } else {
        document.querySelector(`#departingSvgId${nr}`).style.transform =
          "rotate(180deg)";
        document
          .querySelectorAll(`.${styles.departingSvgClass}`)
          .forEach((el) => {
            if (el.id !== `departingSvgId${nr}`) {
              el.style.transform = "rotate(0deg)";
            }
          });
        if (isCalendarRendered === false) {
          console.log("render calendar");

          setIsCalendarRendered(true);
          document
            .querySelectorAll(`.${stylesCalendar.wrapper}`)
            .forEach((el) => {
              if (el.id !== `wrapperId${nr}`) {
                el.style.display = "none";
              }
            });
        } else {
          // document.querySelector(`#wrapperId${nr}`).style.display = "block";
          document
            .querySelectorAll(`.${stylesCalendar.wrapper}`)
            .forEach((el) => {
              console.log(el);
              if (el.id !== `wrapperId${nr}`) {
                el.style.display = "none";
              } else {
                el.style.display = "block";
              }
            });
        }

        // Hide passenger dropdown

        const dropdowns = document.querySelectorAll(`#dropdownCid`);
        const passengerSvg = document.querySelector(`#passengerSvgId`);
        const locationsFrom = document.querySelector(`#locationsFromId${nr}`);
        const locationsTo = document.querySelector(`#locationsToId${nr}`);

        console.log(document.querySelector(`#dropdownCid`));
        if (dropdowns) dropdowns.forEach((el) => (el.style.display = "none"));
        if (passengerSvg) passengerSvg.style.transform = "rotate(0deg)";
        // Hide Locations - from input
        if (locationsFrom) locationsFrom.style.display = "none";
        // Hide Locations - to input
        if (locationsTo) locationsTo.style.display = "none";
      }
    }
  };

  const receiveDepartingValues = (values, selectedMonths) => {
    if (values === "") {
      setDepartingValue("Departing");
      return;
    }
    let txt = "";
    values.map(
      (v, i) => (txt += `${v} ${months[selectedMonths[i] - 1].slice(0, 3)}-`)
    );
    let finalStr = txt.slice(-txt.length, txt.length - 1);

    setDepartingValue(finalStr);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={styles.departingC}
        id={`departingCid${nr}`}
      >
        <span
          id={`departingValuesSpanId${nr}`}
          className={departingValue !== "Departing" ? "departedHasValue" : ""}
        >
          {departingValue}
        </span>
        <svg
          id={`departingSvgId${nr}`}
          className={`_7TN9i _1rcak ${styles.departingSvgClass}`}
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
      {/* MultiCity Components */}
      {isCalendarRendered ? (
        <Calendar nr={nr} passDepartingValues={receiveDepartingValues} />
      ) : null}
      {isMultiCalendarSmallRendered ? (
        <CInputSmallScreen monthNameClass='centerH4' nr={nr} />
      ) : null}
    </>
  );
}
