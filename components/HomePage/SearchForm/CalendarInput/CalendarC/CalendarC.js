import React, { useState, useEffect } from "react";
import styles from "./CalendarC.module.css";
import DaysOfWeek from "./DaysOfWeek/DaysOfWeek";
import Month from "./MonthComponent/Month";
import TripButtons from "./TripButtons/TripButtons";
import MonthList from "./MonthList/MonthList";

import mstyles from "./MonthList/MonthList.module.css";

export const months = [
  { name: "September", nr: 9, year: 2020 },
  { name: "October", nr: 10, year: 2020 },
  { name: "November", nr: 11, year: 2020 },
  { name: "December", nr: 12, year: 2020 },
  { name: "January 2021", nr: 1, year: 2021 },
  { name: "February", nr: 2, year: 2021 },
  { name: "March", nr: 3, year: 2021 },
  { name: "April", nr: 4, year: 2021 },
  { name: "May", nr: 5, year: 2021 },
  { name: "June", nr: 6, year: 2021 },
  { name: "July", nr: 7, year: 2021 },
  { name: "August", nr: 8, year: 2021 },
  { name: "September", nr: 9, year: 2021 },
];

const monthData = [];
for (let i = 9; i < 22; i++) {
  const d = {
    month: i > 12 ? i % 12 : i,
    year: i > 12 ? 2021 : 2020,
  };
  monthData.push(d);
}

// BreakPoints for changing months elements (from left side)  on scroll
const breakPoints = [193];
for (let i = 0; i < 12; i++) {
  breakPoints.push(breakPoints[i] + 239);
}

export default function CalendarC({ passDepartingValues }) {
  const [tripType, setTripType] = useState("Round trip");
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  useEffect(() => {
    document
      .querySelector("#calendarCid")
      .addEventListener("scroll", handleScroll);
    localStorage.setItem("tripType", "Round trip");
    localStorage.removeItem("firstItemSelected");
    localStorage.removeItem("secondItemSelected");
    localStorage.setItem("nrSelectedDates", 0);

    return () => {
      localStorage.setItem("tripType", "Round trip");
      localStorage.removeItem("firstItemSelected");
      localStorage.removeItem("secondItemSelected");
      localStorage.setItem("nrSelectedDates", 0);
      console.log("called cleanup calendarC");
    };
  }, []);
  useEffect(() => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });
  }, [tripType]);

  const handleScroll = (evt) => {
    // Change months in increments of scrollTop 193px
    const currentScrollValue = parseInt(evt.target.scrollTop);

    // Find idx of element that will  have class 'selected-month'
    const idx = breakPoints.findIndex((number) => {
      return number > currentScrollValue;
    });
    let monthList = document.querySelectorAll("#monthListID");
    // Remove previous selected class
    monthList.forEach((m) => m.classList.remove(mstyles.selectedMonth));

    // Set new selected element
    if (idx === 11 && currentScrollValue > 2700) {
      monthList[idx + 1].classList.add(mstyles.selectedMonth);
      let topValue = 9 + 34 * (idx + 1);
      document.querySelector("#hoverElementId").style.top = topValue + "px";
    } else {
      monthList[idx].classList.add(mstyles.selectedMonth);
      let topValue = 9 + 34 * idx;
      document.querySelector("#hoverElementId").style.top = topValue + "px";
    }
  };

  const receiveTripType = (type) => {
    setTripType(type);
  };
  const receiveSelectedMonth = (nr) => {
    setSelectedMonth(nr);
  };
  const receiveSelectedDate = (date, mNr) => {
    if (date === -1 || mNr === -1) {
      setSelectedMonths([]);
      setSelectedDates([]);
      passDepartingValues("", []);
      return;
    }
    let tmp = [...selectedMonths];
    tmp.push(mNr);
    setSelectedMonths(tmp);

    if (tripType === "One way") {
      document.querySelector("#wrapperId").style.display = "none";
      document.querySelector("#departingSvgId").style.transform =
        "rotate(0deg)";
      passDepartingValues([date], selectedMonths);
    } else {
      let temp = [...selectedDates];
      temp.push(date);
      setSelectedDates(temp);
      if (temp.length >= 2) {
        document.querySelector("#wrapperId").style.display = "none";
        document.querySelector("#departingSvgId").style.transform =
          "rotate(0deg)";
        passDepartingValues(temp, [...selectedMonths, mNr]);
        setSelectedDates([]);
      }
    }
  };
  return (
    <div id='wrapperId' className={styles.wrapper}>
      <MonthList passSelectedMonth={receiveSelectedMonth} />
      <TripButtons passTripType={receiveTripType} selected={tripType} />
      <DaysOfWeek />
      <div id='calendarCid' className={styles.calendarC}>
        {monthData.map((md, i) => (
          <Month
            key={i}
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
    </div>
  );
}
