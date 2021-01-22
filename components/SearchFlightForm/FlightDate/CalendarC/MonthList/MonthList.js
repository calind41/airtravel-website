import React, { useState, useEffect } from "react";
import styles from "./MonthList.module.scss";
import { months } from "../CalendarC";
import { i18n } from "../../../../../i18n";

export default function MonthList({ passSelectedMonth }) {
  const [selectedMonthNr, setSelectedMonthNr] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentIdx, setCurrentIdx] = useState(-1);
  useEffect(() => {}, [selectedMonthNr]);
  const scrollToSelectedMonth = (idx, monthNr, yearNr) => {
    document.querySelector("#calendarCid").scrollTo({
      top: idx * 193 + 47 * (idx - 1),
      behavior: "smooth",
    });

    if (idx !== -1) {
      let topValue = 9 + 34 * idx;
      document.querySelector("#hoverElementId").style.top = topValue + "px";
    }
    passSelectedMonth(monthNr);
    setSelectedMonthNr(monthNr);
    setSelectedYear(yearNr);
    setCurrentIdx(idx);
  };
  return (
    <div className={styles.monthListC}>
      {months.map((m, i) => (
        <div
          key={i}
          id='monthListID'
          onClick={() => scrollToSelectedMonth(i, m.nr, m.year)}
          className={
            m.nr === selectedMonthNr && m.year == selectedYear
              ? `${styles.selectedMonth}`
              : ""
          }
        >
          {i18n.t(`monthNames:${m.name.toLowerCase()}`)}
        </div>
      ))}
      <div id='hoverElementId' className={styles.hoverElement}></div>
    </div>
  );
}
