import React, { useState, useEffect, useContext } from "react";
import styles from "./Month.module.scss";
import { FirstValueContext } from "../../CalendarInputSmallScreen/CalendarInputSmallScreen";
import { v4 as uuidv4 } from "uuid";

import { i18n } from "../../../../../i18n";

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
  monthNameClass,
  month,
  year,
  passFirstValueSelected,
  passSecondValueSelected,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`monthNames:${key}`);
  };

  const { firstValue, nrSelD } = useContext(FirstValueContext);
  const [firstV, setFirstV] = firstValue;
  const [nrSelectedDates, setNrSelectedDates] = nrSelD;

  const getDaysInMonth = (month, year) => {
    // Here jan is 1 based
    // Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
  };

  const handleOnMouseEnter = (evt) => {
    if (nrSelectedDates === 0 || nrSelectedDates === 2) return;
    let gridItems = document.querySelectorAll("#gridItemId");

    // Remove all hovered-date classes
    gridItems.forEach((item) => {
      item.classList.remove(styles.hoveredDate);
      item.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });

    let dateSelected = Date.parse(
      `${firstV.month}/${firstV.day}/${firstV.year}`
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
      if (currentDate < dateSelected) {
        if (itemDate > currentDate && itemDate < dateSelected) {
          item.classList.add(styles.hoveredDate);
        }
        if (itemDate === currentDate) {
          item.classList.add(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
        }
      } else {
        if (itemDate > dateSelected && itemDate < currentDate) {
          item.classList.add(styles.hoveredDate);
        }
        if (itemDate === currentDate) {
          item.classList.add(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
        }
      }
    });
  };

  const selectDateFromSmallCalendar = (evt) => {
    if (nrSelectedDates === 0) {
      removeHoveredAndSelectedClasses();
      setFirstItemDate(evt.target);
      // incrementNrSelectedDates();
      setNrSelectedDates(1);
      evt.target.classList.add(styles.selectedDate);

      return;
    }

    if (nrSelectedDates === 1) {
      setSecondItemDate(evt.target);
      setNrSelectedDates(0);
      evt.target.classList.add(styles.selectedDate);
      // incrementNrSelectedDates();

      return;
    }
  };

  const setFirstItemDate = (data) => {
    const day = data.textContent;
    const month = data.getAttribute("data-month-nr");
    const year = data.getAttribute("data-year-nr");
    passFirstValueSelected({ day, month, year });
    setFirstV({ day, month, year });
  };
  const setSecondItemDate = (data) => {
    const day = data.textContent;
    const month = data.getAttribute("data-month-nr");
    const year = data.getAttribute("data-year-nr");
    passSecondValueSelected({ day, month, year });
  };

  const removeHoveredAndSelectedClasses = () => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });
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
          key={uuidv4()}
          className={`${styles.gridItem}  ${styles.gridItemEmpty}`}
        ></div>
      );
      i++;
    }
    let keyProp = 99999;
    for (let i = 0; i < maxDaysInMonth; i++) {
      let className = `${styles.gridItem}`;
      if (k < new Date().getDate() && monthNr === new Date().getMonth() + 1) {
        className = `${styles.gridItem} ${styles.colorGray}`;
      }
      jsx.push(
        <div
          key={keyProp}
          id='gridItemId'
          onClick={selectDateFromSmallCalendar}
          onMouseEnter={handleOnMouseEnter}
          className={className}
          data-month-nr={monthNr}
          data-year-nr={year}
        >
          {k}
        </div>
      );
      k++;
      keyProp++;
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
    <div id='monthId' className={styles.monthC}>
      <h4 className={styles[monthNameClass]} id='monthNameId'>
        {/* {months[month - 1]} */}
        {getLanguageSpecificContent(months[month - 1].toLowerCase())}
      </h4>
      <div className={styles.gridContainer}>{determineJsx(month, year)}</div>
    </div>
  );
}
