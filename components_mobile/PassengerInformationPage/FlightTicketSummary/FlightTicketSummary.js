import React from "react";
import styles from "./FlightTicketSummary.module.scss";

export default function FlightTicketSummary() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>Детали перелета</div>
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
        <span className={styles.nrPassengers}>1 Пассажир</span>
        <span className={styles.price}>$249</span>
      </div>
    </section>
  );
}
