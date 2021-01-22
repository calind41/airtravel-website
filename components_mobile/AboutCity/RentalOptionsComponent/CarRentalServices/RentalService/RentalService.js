import React from "react";
import styles from "./RentalService.module.scss";

export default function RentalService({ logo, companyName, ratingValue }) {
  return (
    <div className={styles.carRentalCard}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.description}>
        <div className={styles.companyName}>{companyName}</div>
        <div className={styles.ratingValue}>Рейтинг: {ratingValue}</div>
      </div>
    </div>
  );
}
