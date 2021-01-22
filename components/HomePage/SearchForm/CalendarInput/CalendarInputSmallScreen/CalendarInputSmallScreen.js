import React, { useState, useEffect } from "react";
import styles from "./CalendarInputSmallScreen.module.css";
import TripButtons from "../CalendarC/TripButtons/TripButtons";
import DaysOfWeek from "../CalendarC/DaysOfWeek/DaysOfWeek";
import Month from "../CalendarC/MonthComponent/Month";
import { months } from "../CalendarC/MonthComponent/Month";
const monthData = [];
for (let i = 9; i < 22; i++) {
  const d = {
    month: i > 12 ? i % 12 : i,
    year: i > 12 ? 2021 : 2020,
  };
  monthData.push(d);
}

export default function CalendarInputSmallScreen({
  monthNameClass,
  daysOfWeekSmallSearchFormClass,
}) {
  useEffect(() => {
    localStorage.removeItem("firstItemSelected");
    localStorage.removeItem("secondItemSelected");
    localStorage.setItem("nrSelectedDates", 0);
  }, []);
  useEffect(() => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });
  }, [tripType]);
  const [tripType, setTripType] = useState("Round trip");
  const receiveTripType = (type) => {
    setTripType(type);
  };
  const receiveSelectedDate = () => {};
  const selectedMonth = new Date().getMonth() + 1;

  const setDates = () => {
    const tt = localStorage.getItem("tripType");
    let beginDate, endDate;

    // FORMAT: [day, month, year]
    beginDate = JSON.parse(localStorage.getItem("firstItemSelected"));
    endDate = JSON.parse(localStorage.getItem("secondItemSelected"));

    if (tt === "Round trip") {
      if (beginDate === null || endDate === null) {
        document.querySelector("#calendarInputSmallScreenId").style.display =
          "none";
        return;
      }
      let first = Date.parse(`${beginDate[1]}/${beginDate[0]}/${beginDate[2]}`);
      let second = Date.parse(`${endDate[1]}/${endDate[0]}/${endDate[2]}`);

      let txt = "";
      let arr;
      if (second - first < 0) {
        arr = [
          JSON.parse(localStorage.getItem("secondItemSelected")),
          JSON.parse(localStorage.getItem("firstItemSelected")),
        ];
      } else {
        arr = [
          JSON.parse(localStorage.getItem("firstItemSelected")),
          JSON.parse(localStorage.getItem("secondItemSelected")),
        ];
      }

      arr.map((item) => {
        txt += `${item[0]} ${months[item[1] - 1].slice(0, 3)}-`;
      });

      let finalStr = txt.slice(-txt.length, txt.length - 1);
      // Set chosen dates
      document.querySelector("#departingValuesSpanId").textContent = finalStr;
      // Hide calendar
      document.querySelector("#calendarInputSmallScreenId").style.display =
        "none";
    } else {
      if (beginDate === null) {
        document.querySelector("#calendarInputSmallScreenId").style.display =
          "none";
        return;
      }
      let txt = "";
      txt += `${beginDate[0]} ${months[beginDate[1] - 1].slice(0, 3)}`;

      // Set chosen date
      document.querySelector("#departingValuesSpanId").textContent = txt;
      // Hide calendar
      document.querySelector("#calendarInputSmallScreenId").style.display =
        "none";
    }
  };

  return (
    <div id='calendarInputSmallScreenId' className={styles.container}>
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
        <TripButtons
          btnsContainerClass='tripBtnsSmall'
          btnsClass='buttonSmall'
          passTripType={receiveTripType}
          selected={tripType}
        />
        <DaysOfWeek
          daysOfWeekSmallSearchFormClass={daysOfWeekSmallSearchFormClass}
          daysOfWeekContainerClass='daysOfWeekSmall'
        />
        <div id='calendarCSmallId' className={styles.calendarC}>
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
        <div id='horizontalLineBottomId' className={styles.hLineBottom}></div>
        <div className={styles.selectBtnContainer}>
          <button onClick={setDates} id='selectBtnId'>
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
