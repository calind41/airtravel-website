import React from "react";
import styles from "./DaysOfWeek.module.css";
export default function DaysOfWeek({
  positionTopClass,
  daysOfWeekContainerClass,
  daysOfWeekSmallSearchFormClass,
}) {
  return (
    <div
      className={`${styles.daysOfWeek} ${styles[daysOfWeekContainerClass]} ${styles[positionTopClass]} ${styles[daysOfWeekSmallSearchFormClass]}`}
    >
      <div>mon</div>
      <div>tue</div>
      <div>wed</div>
      <div>thu</div>
      <div>fri</div>
      <div className={styles.weekendDays}>sat</div>
      <div className={styles.weekendDays}>sun</div>
    </div>
  );
}
