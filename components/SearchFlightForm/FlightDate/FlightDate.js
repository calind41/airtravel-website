import React, { useState } from "react";
import styles from "./FlightDate.module.scss";
import CalendarC from "./CalendarC/CalendarC";
import { months } from "./CalendarC/MonthComponent/Month";

export default function FlightDate({ passCalendarState, widthClass, t }) {
  const [departingValue, setDepartingValue] = useState(
    t("FlightDate-calendarPlaceholder")
  );
  const [isCalendarRendered, setIsCalendarRendered] = useState(false);

  const handleClick = () => {
    let svgEl = document.querySelector("#departingSvgId");
    if (svgEl.style.transform == "rotate(180deg)") {
      document.querySelector("#departingSvgId").style.transform =
        "rotate(0deg)";
      document.querySelector("#wrapperId").style.display = "none";
      // Render calendar
    } else {
      // scroll down to see full calendar
      if (window.scrollY < 137) {
        window.scrollTo({
          top: 137,
          left: 0,
          behavior: "smooth",
        });
      }
      document.querySelector("#departingSvgId").style.transform =
        "rotate(180deg)";
      if (isCalendarRendered === false) setIsCalendarRendered(true);
      else {
        document.querySelector("#wrapperId").style.display = "block";
      }

      //
      if (
        localStorage.getItem("firstItemSelected") != null &&
        localStorage.getItem("secondItemSelected") != null
      ) {
        let first = Date.parse(
          `${JSON.parse(localStorage.getItem("firstItemSelected"))[1]}/${
            JSON.parse(localStorage.getItem("firstItemSelected"))[0]
          }/${JSON.parse(localStorage.getItem("firstItemSelected"))[2]}`
        );
        let second = Date.parse(
          `${JSON.parse(localStorage.getItem("secondItemSelected"))[1]}/${
            JSON.parse(localStorage.getItem("secondItemSelected"))[0]
          }/${JSON.parse(localStorage.getItem("secondItemSelected"))[2]}`
        );

        document.querySelectorAll("#gridItemId").forEach((el) => {
          el.classList.remove(styles.selectedDate);
          el.classList.remove(styles.hoveredDate);

          let parsedEl = Date.parse(
            `${el.getAttribute("data-month-nr")}/${
              el.textContent
            }/${el.getAttribute("data-year-nr")}`
          );
          if (parsedEl == first || parsedEl == second) {
            el.classList.add(styles.selectedDate);
          }
          if (parsedEl > first && parsedEl < second) {
            el.classList.add(styles.hoveredDate);
          }
        });
      }

      // Hide passenger dropdown
      const dropdown = document.querySelector("#dropdownCid");
      const passengerSvg = document.querySelector("#passengerSvgId");
      dropdown.style.display = "none";
      passengerSvg.style.transform = "rotate(0deg)";
      // Hide Locations - from input
      const locationsFrom = document.querySelector("#locationsFromId");
      if (locationsFrom) locationsFrom.style.display = "none";
      // Hide Locations - to input
      const locationsTo = document.querySelector("#locationsToId");
      if (locationsTo) locationsTo.style.display = "none";
    }
  };

  const receiveDepartingValues = (values, selectedMonths) => {
    console.log("being claled");
    if (values === "") {
      setDepartingValue(t("FlightDate-calendarPlaceholder"));
      return;
    }
    let txt = "";
    values.map((v, i) => {
      let val = t(`monthNames:${months[selectedMonths[i] - 1].toLowerCase()}`);
      txt += `${v} ${val.slice(0, 3)}-`;
    });
    let finalStr = txt.slice(-txt.length, txt.length - 1);
    console.log("FINAL STRING ", finalStr);
    setDepartingValue(finalStr);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${styles.departingC} ${styles[widthClass]}`}
        id='departingCid'
      >
        <span className={styles.calendarPlaceholder}>
          {t("FlightDate-calendarPlaceholder")}
        </span>
        <span
          id='departingValuesSpanId'
          className={
            departingValue !== t("FlightDate-calendarPlaceholder")
              ? "departedHasValue"
              : ""
          }
        >
          {departingValue}
        </span>
        {departingSvgArrow}
      </div>
      {isCalendarRendered ? (
        <CalendarC t={t} passDepartingValues={receiveDepartingValues} />
      ) : null}
    </>
  );
}

const departingSvgArrow = (
  <svg
    id='departingSvgId'
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
);
