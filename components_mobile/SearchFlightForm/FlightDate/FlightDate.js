import React, { useState, useEffect } from "react";
import styles from "./FlightDate.module.scss";
import { months } from "./CalendarC/MonthComponent/Month";
import CalendarInputSmallScreen from "./CalendarInputSmallScreen/CalendarInputSmallScreen";

export default function FlightDate({
  passCalendarState,
  renderArrivalLocations,
  renderedCalendar,
  renderDropdown,
  passDateSelected,
}) {
  const [departingValue, setDepartingValue] = useState("Когда летите?");
  const [isRenderedCalendarSmall, setIsRenderedCalendarSmall] = useState(
    renderedCalendar
  );
  useEffect(() => {
    setIsRenderedCalendarSmall(renderedCalendar);
  }, [renderedCalendar]);
  const handleClick = () => {
    let calendarSmall = document.querySelector("#calendarInputSmallScreenId");
    // Already rendered
    if (calendarSmall) {
      calendarSmall.style.display = "block";
    } else {
      // Render it first
      setIsRenderedCalendarSmall(true);
    }
  };

  const receiveDepartingValues = (values, selectedMonths) => {
    if (values === "") {
      setDepartingValue("КОГДА");
      return;
    }
    let txt = "";
    values.map(
      (v, i) => (txt += `${v} ${months[selectedMonths[i] - 1].slice(0, 3)}-`)
    );
    let finalStr = txt.slice(-txt.length, txt.length - 1);

    setDepartingValue(finalStr);
  };

  const [firstValueSelected, setFirstValueSelected] = useState("");
  const [secondValueSelected, setSecondValueSelected] = useState("");
  const [selectedDatesValue, setSelectedDatesValue] = useState("Когда летите?");

  const getMonthAbbreviation = (monthNr) => {
    return months[monthNr - 1].substr(0, 3).toLowerCase();
  };

  const receiveFirstValueSelected = (data) => {
    passDateSelected(true);
    const day = data.day;
    const month = getMonthAbbreviation(data.month);
    setSelectedDatesValue(`${day} ${month}`);
  };
  const receiveSecondValueSelected = (data, firstItem) => {
    let temp;
    if (firstItem) {
      const d = firstItem.day;
      const m = getMonthAbbreviation(firstItem.month);
      temp = `${d} ${m}`;
    } else {
      temp = selectedDatesValue;
    }
    const day = data.day;
    const month = getMonthAbbreviation(data.month);
    setSelectedDatesValue(temp + " - " + `${day} ${month}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={styles.departingC}
        id='departingCid'
      >
        <span
          id='departingValuesSpanId'
          className={departingValue !== "КОГДА" ? "departedHasValue" : ""}
        >
          {selectedDatesValue}
        </span>
        {departingSvgArrow}
      </div>

      {isRenderedCalendarSmall ? (
        <CalendarInputSmallScreen
          passFirstValueSelected={receiveFirstValueSelected}
          passSecondValueSelected={receiveSecondValueSelected}
          renderArrivalLocations={renderArrivalLocations}
          renderDropdown={renderDropdown}
          daysOfWeekSmallSearchFormClass='daysOfWeekSmallSearchForm'
          monthNameClass='centerH4'
          passDateSelected={passDateSelected}
        />
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
