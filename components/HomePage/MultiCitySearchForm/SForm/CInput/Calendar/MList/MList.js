import React, { useState, useEffect } from "react";
import styles from "./MList.module.css";
import { months } from "../Calendar";

export default function MList({ nr, passSelectedMonth }) {
  const [selectedMonthNr, setSelectedMonthNr] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentIdx, setCurrentIdx] = useState(-1);
  useEffect(() => {}, [selectedMonthNr]);
  const scrollToSelectedMonth = (idx, monthNr, yearNr) => {
    document.querySelector(`#calendarCid${nr}`).scrollTo({
      top: idx * 193 + 47 * (idx - 1),
      behavior: "smooth",
    });

    if (idx !== -1) {
      let topValue = 9 + 34 * idx;
      document.querySelector(`#hoverElementId${nr}`).style.top =
        topValue + "px";
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
          id={`monthListID${nr}`}
          onClick={() => scrollToSelectedMonth(i, m.nr, m.year)}
          className={
            m.nr === selectedMonthNr && m.year == selectedYear
              ? `${styles.selectedMonth}`
              : ""
          }
        >
          {m.name}
        </div>
      ))}
      <div id={`hoverElementId${nr}`} className={styles.hoverElement}></div>
    </div>
  );
}
