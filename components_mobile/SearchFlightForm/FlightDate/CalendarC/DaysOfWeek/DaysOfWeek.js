import React from "react";
import styles from "./DaysOfWeek.module.scss";

export default function DaysOfWeek({
  positionTopClass,
  daysOfWeekContainerClass,
  daysOfWeekSmallSearchFormClass,
}) {
  return (
    <div
      className={`${styles.daysOfWeek} ${styles[daysOfWeekContainerClass]} ${styles[positionTopClass]} ${styles[daysOfWeekSmallSearchFormClass]}`}
    >
      <div>пн</div>
      <div>вт</div>
      <div>ср</div>
      <div>чт</div>
      <div>пт</div>
      <div className={styles.weekendDays}>сб</div>
      <div className={styles.weekendDays}>вс</div>
    </div>
  );
}
