import React, { useState, useEffect, createContext } from "react";
import styles from "./CalendarInputSmallScreen.module.scss";
import DaysOfWeek from "../CalendarC/DaysOfWeek/DaysOfWeek";
import Month from "../CalendarC/MonthComponent/Month";
import { closeIconSvg, goBackMobileSvg, arrowNextSvg } from "../../svg";

const monthSet = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
let now = new Date();

const date = now.getDate();
const monthNr = now.getMonth();
const fullYear = now.getFullYear();

let ms = [];
let currentMonth = monthNr;
let currentYear = fullYear;
for (let i = 0; i < 13; i++) {
  if (currentMonth === 12) {
    currentYear = fullYear + 1;
    currentMonth = 0;
  }
  const date = {
    name: monthSet[currentMonth],
    nr: currentMonth + 1,
    year: currentYear,
  };
  ms.push(date);
  currentMonth++;
}
const monthData = [];
ms.forEach((m) => monthData.push({ month: m.nr, year: m.year }));
export const months = ms;

export default function CalendarInputSmallScreen({
  monthNameClass,
  daysOfWeekSmallSearchFormClass,
  passFirstValueSelected,
  passSecondValueSelected,
  renderArrivalLocations,
  renderDropdown,
  passDateSelected,
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

  const [disabledBtnState, setDisabledBtnState] = useState(true);

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

  const toPrevInput = () => {
    const lsm2 = document.querySelector(`#lsm2`);
    // renderArrivalLocations();
    if (!lsm2) {
      renderArrivalLocations();
    } else {
      lsm2.style.display = "block !important";
    }
    closeCalendar();
  };
  const closeCalendar = () => {
    document.querySelector("#calendarInputSmallScreenId").style.display =
      "none";
  };
  const toNextInput = () => {
    const calendarSm = document.querySelector("#calendarInputSmallScreenId");
    const dropdown = document.querySelector("#dropdownCid");

    if (!dropdown) {
      renderDropdown();
    } else {
      dropdown.style.display = "block";
    }
    calendarSm.classList.add(styles.slideLeft);
    setTimeout(() => {
      closeCalendar();
      calendarSm.classList.remove(styles.slideLeft);
    }, 500);
  };

  const [rawFirstV, setRawFirstV] = useState("");
  const [firstV, setFirstV] = useState("");
  const [secondV, setSecondV] = useState("");
  const getMonthAbbreviation = (monthNr) => {
    return monthSet[monthNr - 1].substr(0, 3).toLowerCase();
  };
  const receiveFirstValueSelected = (data) => {
    setRawFirstV(data);
    const day = data.day;
    const month = data.month;
    const monthAbbr = getMonthAbbreviation(month);
    setFirstV(`${day} ${monthAbbr}`);
    // reset second v
    setSecondV("");
    setDisabledBtnState(false);
    document
      .querySelector(`.${styles.nextBtn}`)
      .classList.add(styles.activeNextBtn);
    passFirstValueSelected(data);
  };
  const receiveSecondValueSelected = (data) => {
    const day = data.day;
    const month = data.month;
    const monthAbbr = getMonthAbbreviation(month);
    const year = data.year;

    // check if current value is earlier in time than  first value
    const first = Date.parse(
      `${rawFirstV.month}/${rawFirstV.day}/${rawFirstV.year}`
    );
    const second = Date.parse(`${month}/${day}/${year}`);
    if (second - first < 0) {
      setFirstV(`${day} ${monthAbbr}`);
      const ma = getMonthAbbreviation(rawFirstV.month);
      setSecondV(`${rawFirstV.day} ${ma}`);
      passSecondValueSelected(rawFirstV, data);
    } else {
      setSecondV(`${day} ${monthAbbr}`);
      passSecondValueSelected(data);
    }
  };

  const [defaultNrSelectedDates, setDefaultNrSelectedDates] = useState(0);
  const incrementNrSelectedDates = (nr) => {
    setDefaultNrSelectedDates(defaultNrSelectedDates + 1);
  };

  return (
    <FirstValueContextProvider>
      <div id='calendarInputSmallScreenId' className={styles.container}>
        <div>
          <span onClick={toPrevInput} className={styles.goBackIcon}>
            {goBackMobileSvg}
          </span>
          <span className={styles.closeIcon} onClick={closeCalendar}>
            {closeIconSvg}
          </span>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.chosenDates}>
            <span>Когда летите?</span>
            <span
              style={firstV === "" ? { display: "none" } : {}}
              className={styles.dates}
            >
              <span>{firstV}</span>
              <span className={styles.line}>—</span>
              <span>{secondV === "" ? "В одну сторону" : secondV}</span>
            </span>
          </div>
          <DaysOfWeek
            daysOfWeekSmallSearchFormClass={daysOfWeekSmallSearchFormClass}
            daysOfWeekContainerClass='daysOfWeekSmall'
          />
          <div id='calendarCSmallId' className={styles.calendarC}>
            {monthData.map((md) => (
              <Month
                defaultNrSelectedDates={defaultNrSelectedDates}
                incrementNrSelectedDates={incrementNrSelectedDates}
                passFirstValueSelected={receiveFirstValueSelected}
                passSecondValueSelected={receiveSecondValueSelected}
                monthNameClass={monthNameClass}
                passSelectedDate={receiveSelectedDate}
                selectedMonth={
                  selectedMonth === 0
                    ? new Date().getMonth() + 1
                    : selectedMonth
                }
                tripType={tripType}
                month={md.month}
                year={md.year}
              />
            ))}
          </div>
          <div className={styles.hLine}></div>
          <div className={styles.selectBtnContainer}>
            <button
              disabled={disabledBtnState}
              className={styles.nextBtn}
              onClick={toNextInput}
              id='selectBtnId'
            >
              <span>Далее</span>
              <span>{arrowNextSvg}</span>
            </button>
          </div>
        </div>
      </div>
    </FirstValueContextProvider>
  );
}

// Create Context Object
export const FirstValueContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const FirstValueContextProvider = (props) => {
  const [firstV, setFirstV] = useState("");
  const [nrSelectedDates, setNrSelectedDates] = useState(0);

  return (
    <FirstValueContext.Provider
      value={{
        firstValue: [firstV, setFirstV],
        nrSelD: [nrSelectedDates, setNrSelectedDates],
      }}
    >
      {props.children}
    </FirstValueContext.Provider>
  );
};
