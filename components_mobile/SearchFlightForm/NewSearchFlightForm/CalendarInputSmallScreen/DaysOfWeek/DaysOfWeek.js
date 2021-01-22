import React from "react";
import styles from "./DaysOfWeek.module.scss";

import { i18n } from "../../../../../i18n";

export default function DaysOfWeek({
  positionTopClass,
  daysOfWeekContainerClass,
  daysOfWeekSmallSearchFormClass,
}) {
  const getLocationSpecificContent = (key) => {
    return i18n.t(`daysOfWeek:${key}`);
  };
  return (
    <div
      className={`${styles.daysOfWeek} ${styles[daysOfWeekContainerClass]} ${styles[positionTopClass]} ${styles[daysOfWeekSmallSearchFormClass]}`}
    >
      <div>{getLocationSpecificContent("monday")}</div>
      <div>{getLocationSpecificContent("tuesday")}</div>
      <div>{getLocationSpecificContent("wednesday")}</div>
      <div>{getLocationSpecificContent("thursday")}</div>
      <div>{getLocationSpecificContent("friday")}</div>
      <div className={styles.weekendDays}>
        {getLocationSpecificContent("saturday")}
      </div>
      <div className={styles.weekendDays}>
        {getLocationSpecificContent("sunday")}
      </div>
    </div>
  );
}
