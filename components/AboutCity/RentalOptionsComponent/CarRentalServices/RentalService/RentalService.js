import React from "react";
import styles from "./RentalService.module.scss";

// import { i18n } from "../../../../../i18n";

export default function RentalService({ t, logo, companyName, ratingValue }) {
  const getLanguageSpecificContent = (key) => {
    return t(`rentalOptions:${key}`);
  };

  return (
    <div className={styles.carRentalCard}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.description}>
        <div className={styles.companyName}>{companyName}</div>
        <div className={styles.ratingValue}>
          {getLanguageSpecificContent("RentalService-rating")}: {ratingValue}
        </div>
      </div>
    </div>
  );
}
