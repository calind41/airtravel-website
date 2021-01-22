import React, { useState } from "react";
import styles from "./CInputSmallScreen.module.css";
import DaysOfWeek from "../../../../SearchForm/CalendarInput/CalendarC/DaysOfWeek/DaysOfWeek";
import Month from "../Calendar/Month/Month";
import { months } from "../Calendar/Month/Month";
const monthData = [];
for (let i = 9; i < 22; i++) {
  const d = {
    month: i > 12 ? i % 12 : i,
    year: i > 12 ? 2021 : 2020,
  };
  monthData.push(d);
}

export default function CalendarInputSmallScreen({ nr, monthNameClass }) {
  const [tripType, setTripType] = useState("Round trip");
  const receiveTripType = (type) => {
    setTripType(tripType);
  };
  const receiveSelectedDate = () => {};
  const selectedMonth = new Date().getMonth() + 1;

  const setDates = () => {
    console.log("date is being set");
    const tt = localStorage.getItem("tripType");
    let beginDate, endDate;
    const span = document.querySelector(`#departingValuesSpanId${nr}`);
    let txt = "";

    // FORMAT: [day, month, year]
    beginDate = JSON.parse(localStorage.getItem("firstItemSelected"));
    endDate = JSON.parse(localStorage.getItem("secondItemSelected"));

    if (tt === "Round trip") {
      txt +=
        beginDate[0] +
        ` ${months[beginDate[1] - 1].slice(0, 3)} - ` +
        endDate[0] +
        ` ${months[endDate[1] - 1].slice(0, 3)}`;
    } else {
      if (beginDate && beginDate[0])
        txt += beginDate[0] + ` ${months[beginDate[1] - 1].slice(0, 3)}`;
    }
    span.textContent = txt;

    document.querySelector(`#calendarInputSmallScreenId${nr}`).style.display =
      "none";
  };

  return (
    <div id={`calendarInputSmallScreenId${nr}`} className={styles.container}>
      <div>
        <span>Departing</span>
        <svg
          onClick={setDates}
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
      <div className={styles.wrapper}>
        <DaysOfWeek daysOfWeekContainerClass='daysOfWeekSmall' />
        <div id={`calendarCSmallId${nr}`} className={styles.calendarC}>
          {monthData.map((md) => (
            <Month
              monthNameClass={monthNameClass}
              passSelectedDate={receiveSelectedDate}
              selectedMonth={
                selectedMonth === 0 ? new Date().getMonth() + 1 : selectedMonth
              }
              tripType={tripType}
              month={md.month}
              year={md.year}
            />
          ))}
        </div>
        <div className={styles.hLine}></div>
        <div
          id={`horizontalLineBottomId${nr}`}
          className={styles.hLineBottom}
        ></div>
        <div className={styles.selectBtnContainer}>
          <button onClick={setDates} id={`selectBtnId${nr}`}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
