import React, { useState, useEffect } from "react";
import styles from "./Month.module.css";
import stylesCInputSmallScreen from "../../CInputSmallScreen/CInputSmallScreen.module.css";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Month({
  nr,
  monthNameClass,
  passSelectedDate,
  selectedMonth,
  tripType,
  month,
  year,
}) {
  let [nrSelectedDates, setNrSelectedDates] = useState(0);

  useEffect(() => {
    document.querySelectorAll(`#gridItemId${nr}`).forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.addEventListener("mouseenter", handleOnMouseEnter);
    });
    localStorage.setItem("nrSelectedDates", 0);
  }, [tripType, selectedMonth]);

  const getDaysInMonth = (month, year) => {
    // Here jan is 1 based
    // Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
  };

  const handleOnMouseEnter = (evt) => {
    // Only for  Round Trip option and when 1 date is already selected
    if (tripType === "One way") return;
    if (nrSelectedDates === 0 || nrSelectedDates === 2) return;
    if (
      localStorage.getItem("nrSelectedDates") == 0 ||
      localStorage.getItem("nrSelectedDates") >= 2
    )
      return;
    if (JSON.parse(localStorage.getItem("firstItemSelected")) === null) return;

    let gridItems = document.querySelectorAll(`#gridItemId${nr}`);

    // Remove all hovered-date classes
    gridItems.forEach((item) => item.classList.remove(styles.hoveredDate));

    let dateSelected = Date.parse(
      `${JSON.parse(localStorage.getItem("firstItemSelected"))[1]}/${
        JSON.parse(localStorage.getItem("firstItemSelected"))[0]
      }/${JSON.parse(localStorage.getItem("firstItemSelected"))[2]}`
    );
    let currentDate = Date.parse(
      `${evt.target.getAttribute("data-month-nr")}/${
        evt.target.textContent
      }/${evt.target.getAttribute("data-year-nr")}`
    );

    gridItems.forEach((item) => {
      let itemDate = Date.parse(
        "" +
          item.getAttribute("data-month-nr") +
          "/" +
          item.textContent +
          "/" +
          item.getAttribute("data-year-nr")
      );
      if (itemDate > dateSelected && itemDate <= currentDate) {
        item.classList.add(styles.hoveredDate);
      }
    });
  };

  const selectDateFromSmallCalendar = (evt) => {
    // Show select button
    let btns = document.querySelectorAll(
      `.${stylesCInputSmallScreen.selectBtnContainer}`
    );
    btns.forEach((el) => {
      if (el) el.childNodes[0].style.display = "block ";
    });

    // One way trip
    document.querySelectorAll(`#gridItemId${nr}`).forEach((el) => {
      el.classList.remove(styles.selectedDate);
    });
    evt.target.classList.add(styles.selectedDate);

    localStorage.setItem("tripType", "One way");
    localStorage.setItem(
      "firstItemSelected",
      JSON.stringify([
        evt.target.textContent,
        evt.target.getAttribute("data-month-nr"),
        evt.target.getAttribute("data-year-nr"),
      ])
    );
  };
  const selectDate = (evt) => {
    if (evt.target.classList.contains(styles.colorGray)) return;

    if (window.innerWidth <= 780) {
      selectDateFromSmallCalendar(evt);
      return;
    }
    document.querySelectorAll(`#gridItemId${nr}`).forEach((el) => {
      el.classList.remove(styles.selectedDate);
    });
    evt.target.classList.add(styles.selectedDate);

    document.querySelector(`#wrapperId${nr}`).style.display = "none";
    document.querySelector(`#departingSvgId${nr}`).style.transform =
      "rotate(0deg)";
    document.querySelector(`#departingValuesSpanId${nr}`).textContent = `${
      evt.target.textContent
    } ${months[evt.target.getAttribute("data-month-nr") - 1].slice(0, 3)}`;
  };
  const determineJsx = (monthNr, year) => {
    const d = new Date(`${monthNr}/01//${year}`);
    let dayOfWeek = d.getDay();
    const maxDaysInMonth = getDaysInMonth(monthNr, year);

    if (dayOfWeek == 0) {
      dayOfWeek = 7;
    }

    let jsx = [];
    let k = 1;

    let i = 0;
    while (i < dayOfWeek - 1) {
      jsx.push(
        <div
          // key={i * monthNr}
          className={`${styles.gridItem}  ${styles.gridItemEmpty}`}
        ></div>
      );
      i++;
    }
    for (let i = 0; i < maxDaysInMonth; i++) {
      let className = `${styles.gridItem}`;
      if (k < new Date().getDate() && monthNr === new Date().getMonth() + 1) {
        className = `${styles.gridItem} ${styles.colorGray}`;
      }
      jsx.push(
        <div
          // key={i * monthNr}
          id={`gridItemId${nr}`}
          onClick={selectDate}
          className={className}
          data-month-nr={monthNr}
          data-year-nr={year}
        >
          {k}
        </div>
      );
      k++;
    }
    let d2 = new Date(`${monthNr}/${maxDaysInMonth}/${year}`);
    let dayOfWeek2 = d2.getDay();

    for (let i = 0; i < 7 - dayOfWeek2; i++) {
      jsx.push(
        <div
          key={i * monthNr}
          className={`${styles.gridItem}  ${styles.gridItemEmpty}`}
        ></div>
      );
    }

    return jsx;
  };

  return (
    <div id={`monthId${nr}`} className={styles.monthC}>
      <h4 className={styles[monthNameClass]} id={`monthNameId${nr}`}>
        {months[month - 1]}
      </h4>
      <div className={styles.gridContainer}>{determineJsx(month, year)}</div>
    </div>
  );
}
