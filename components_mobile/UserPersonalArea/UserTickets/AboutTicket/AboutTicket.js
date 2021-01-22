import React from "react";
import styles from "./AboutTicket.module.scss";

export default function AboutTicket({
  nrPassengers,
  totalPrice,
  hasInsurance,
  insurancePrice,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.totalPrice}>
        <span>{nrPassengers} Пассажира </span>
        <span>{totalPrice}$</span>
      </div>
      {hasInsurance ? (
        <div className={styles.hasInsurance}>
          <span>Страхование</span>
          <span>{insurancePrice}$</span>
        </div>
      ) : (
        <div className={styles.noInsurance}>
          <div>Страховка отсутствует</div>
          <div>Приобрести страховку</div>
        </div>
      )}
    </div>
  );
}
