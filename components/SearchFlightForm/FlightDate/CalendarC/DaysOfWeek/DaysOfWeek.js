import React from "react";
import styles from "./DaysOfWeek.module.scss";
import { i18n } from "../../../../../i18n";

export default function DaysOfWeek({
  positionTopClass,
  daysOfWeekContainerClass,
  daysOfWeekSmallSearchFormClass,
}) {
  return (
    <div
      className={`${styles.daysOfWeek} ${styles[daysOfWeekContainerClass]} ${styles[positionTopClass]} ${styles[daysOfWeekSmallSearchFormClass]}`}
    >
      <div>{i18n.t("daysOfWeek:monday")}</div>
      <div>{i18n.t("daysOfWeek:tuesday")}</div>
      <div>{i18n.t("daysOfWeek:wednesday")}</div>
      <div>{i18n.t("daysOfWeek:thursday")}</div>
      <div>{i18n.t("daysOfWeek:friday")}</div>
      <div className={styles.weekendDays}>{i18n.t("daysOfWeek:saturday")}</div>
      <div className={styles.weekendDays}>{i18n.t("daysOfWeek:sunday")}</div>
    </div>
  );
}
