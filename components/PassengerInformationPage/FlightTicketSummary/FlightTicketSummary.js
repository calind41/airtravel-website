import React from "react";
import styles from "./FlightTicketSummary.module.scss";

import { i18n } from "../../../i18n";

export default function FlightTicketSummary({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`flightTicketSummary:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {getLanguageSpecificContent("heading")}
      </div>
      <div className={styles.departure}>
        <div className={styles.time}>Пн., 13 Авг — 09:30</div>
        <div className={styles.airport}>KIV</div>
      </div>
      <div className={styles.arrival}>
        <div className={styles.time}>Пн., 13 Авг — 11:00</div>
        <div className={styles.airport}>IST</div>
      </div>
      <div className={styles.flightDetails}>1 ч 30 мин в пути, прямой рейс</div>
      <div className={styles.priceC}>
        <span className={styles.nrPassengers}>
          1 {getLanguageSpecificContent("passenger")}
        </span>
        <span className={styles.price}>$249</span>
      </div>
    </section>
  );
}
