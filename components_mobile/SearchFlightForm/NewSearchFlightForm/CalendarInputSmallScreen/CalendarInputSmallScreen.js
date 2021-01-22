import React, { useState, useEffect, createContext } from "react";
import styles from "./CalendarInputSmallScreen.module.scss";
import DaysOfWeek from "./DaysOfWeek/DaysOfWeek";
import Month from "./MonthComponent/Month";
import { closeIconSvg } from "../../svg";
import { calendarIcon } from "../icons";
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

import { i18n } from "../../../../i18n";

export default function CalendarInputSmallScreen({
  monthNameClass,
  daysOfWeekSmallSearchFormClass,
  passFirstValueSelected,
  passSecondValueSelected,
  from,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`searchFlightFormMobile:${key}`);
  };
  useEffect(() => {
    localStorage.removeItem("firstItemSelected");
    localStorage.removeItem("secondItemSelected");
    localStorage.setItem("nrSelectedDates", 0);

    const onClickDateBoxHandler = () => {
      boxes.forEach((elem) => elem.classList.toggle(styles.selectedBox));
    };
    const boxes = document.querySelectorAll(`.${styles.datesContainer} > div`);
    boxes.forEach((elem) =>
      elem.addEventListener("click", onClickDateBoxHandler)
    );

    return () => {
      boxes.forEach((elem) =>
        elem.removeEventListener("click", onClickDateBoxHandler)
      );
    };
  }, []);
  useEffect(() => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });
  }, [tripType]);

  const [tripType, setTripType] = useState("Round trip");

  const receiveSelectedDate = () => {};
  const selectedMonth = new Date().getMonth() + 1;

  const closeCalendar = () => {
    const calendarContainer = document.querySelector(
      "#calendarInputSmallScreenId"
    );
    calendarContainer.classList.add(styles.slideLeft);
    // calendarContainer.style.display = "none";
  };

  const [rawFirstV, setRawFirstV] = useState("");

  const getMonthAbbreviation = (monthNr) => {
    return monthSet[monthNr - 1].substr(0, 3).toLowerCase();
  };
  const receiveFirstValueSelected = (data) => {
    setRawFirstV(data);
    const day = data.day;
    const month = data.month;
    const monthAbbr = getMonthAbbreviation(month);

    passFirstValueSelected(data);

    // ------- new
    // insert it in the first box and change focus to box 2
    setFirstBoxValue(`${day} ${monthAbbr}`);
    document
      .querySelectorAll(`.${styles.datesContainer} > div`)
      .forEach((elem) => elem.classList.toggle(styles.selectedBox));
    setSelectedBox(
      getLanguageSpecificContent("CalendarInputSmallScreen-arrivalDate")
    );
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
      passSecondValueSelected(rawFirstV, data);
      setSecondBoxValue(
        `${rawFirstV.day} ${getMonthAbbreviation(rawFirstV.month)}`
      );
      setFirstBoxValue(`${day} ${monthAbbr}`);
    } else {
      passSecondValueSelected(data);
      setSecondBoxValue(`${day} ${monthAbbr}`);
    }

    // ---- new
    // insert it in the second box and hide calendar
    document
      .querySelectorAll(`.${styles.datesContainer} > div`)
      .forEach((elem) => elem.classList.toggle(styles.selectedBox));
    setSelectedBox(
      getLanguageSpecificContent("CalendarInputSmallScreen-departureDate")
    );
    closeCalendar();
  };

  const [defaultNrSelectedDates, setDefaultNrSelectedDates] = useState(0);
  const incrementNrSelectedDates = (nr) => {
    setDefaultNrSelectedDates(defaultNrSelectedDates + 1);
  };

  useEffect(() => {
    const box1 = document.querySelector(
      `.${styles.datesContainer} > div:nth-child(1)`
    );
    const box2 = document.querySelector(
      `.${styles.datesContainer} > div:nth-child(2)`
    );

    if (from === "first") {
      setSelectedBox(
        getLanguageSpecificContent("CalendarInputSmallScreen-departureDate")
      );
      box1.classList.add(styles.selectedBox);
      box2.classList.remove(styles.selectedBox);
    } else if (from === "second") {
      setSelectedBox(
        getLanguageSpecificContent("CalendarInputSmallScreen-arrivalDate")
      );
      box1.classList.remove(styles.selectedBox);
      box2.classList.add(styles.selectedBox);
    }
  }, [from]);
  const [selectedBox, setSelectedBox] = useState(
    from === "first"
      ? `${getLanguageSpecificContent(
          "CalendarInputSmallScreen-departureDate"
        )}`
      : `${getLanguageSpecificContent("CalendarInputSmallScreen-arrivalDate")}`
  );
  const [firstBoxValue, setFirstBoxValue] = useState(
    getLanguageSpecificContent("CalendarInputSmallScreen-forward")
  );
  const [secondBoxValue, setSecondBoxValue] = useState(
    getLanguageSpecificContent("CalendarInputSmallScreen-back")
  );

  const noReturnTicketButtonHandler = () => {
    passSecondValueSelected("");
    setSecondBoxValue(
      getLanguageSpecificContent("CalendarInputSmallScreen-back")
    );
    closeCalendar();
  };

  return (
    <FirstValueContextProvider>
      <div id='calendarInputSmallScreenId' className={styles.container}>
        <div>
          <span className={styles.title}>{selectedBox}</span>
          <span className={styles.closeIcon} onClick={closeCalendar}>
            {closeIconSvg}
          </span>
        </div>
        <div className={styles.datesContainer}>
          <div
            onClick={() =>
              setSelectedBox(
                getLanguageSpecificContent(
                  "CalendarInputSmallScreen-departureDate"
                )
              )
            }
            className={`${styles.departureDate} ${styles.selectedBox}`}
          >
            <span
              style={
                firstBoxValue !==
                `${getLanguageSpecificContent(
                  "CalendarInputSmallScreen-forward"
                )}`
                  ? { color: "black" }
                  : {}
              }
            >
              {firstBoxValue}
            </span>
            <span>{calendarIcon}</span>
          </div>
          <div
            onClick={() =>
              setSelectedBox(
                getLanguageSpecificContent(
                  "CalendarInputSmallScreen-arrivalDate"
                )
              )
            }
            className={styles.returnBackDate}
          >
            <span
              style={
                secondBoxValue !==
                `${getLanguageSpecificContent("CalendarInputSmallScreen-back")}`
                  ? { color: "black" }
                  : {}
              }
            >
              {secondBoxValue}
            </span>
          </div>
        </div>
        <div className={styles.wrapper}>
          <DaysOfWeek
            daysOfWeekSmallSearchFormClass={daysOfWeekSmallSearchFormClass}
            daysOfWeekContainerClass='daysOfWeekSmall'
          />
          <div id='calendarCSmallId' className={styles.calendarC}>
            {monthData.map((md, idx) => (
              <Month
                key={idx}
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
          {selectedBox ===
          `${getLanguageSpecificContent(
            "CalendarInputSmallScreen-arrivalDate"
          )}` ? (
            <div className={styles.noReturnTicketBtnC}>
              <button
                className={styles.noReturnTicketBtn}
                onClick={noReturnTicketButtonHandler}
                id='selectBtnId'
              >
                <span>
                  {getLanguageSpecificContent(
                    "CalendarInputSmallScreen-buttonText"
                  )}
                </span>
              </button>
            </div>
          ) : null}
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
