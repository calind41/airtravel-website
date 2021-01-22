import React from "react";
import styles from "./AboutTicket.module.scss";

import { i18n } from "../../../../i18n";

export default function AboutTicket({
  nrPassengers,
  totalPrice,
  hasInsurance,
  insurancePrice,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`personalRoom:${key}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.totalPrice}>
        <span>
          {nrPassengers}{" "}
          {nrPassengers > 1
            ? `${getLanguageSpecificContent("AboutTicket-t1")}`
            : `${getLanguageSpecificContent("AboutTicket-t2")}`}{" "}
        </span>
        <span>{totalPrice}$</span>
      </div>
      {hasInsurance ? (
        <div className={styles.hasInsurance}>
          <span>{getLanguageSpecificContent("AboutTicket-t3")}</span>
          <span>{insurancePrice}$</span>
        </div>
      ) : (
        <div className={styles.noInsurance}>
          <div>{getLanguageSpecificContent("AboutTicket-t4")}</div>
          <div>{getLanguageSpecificContent("AboutTicket-t5")}</div>
        </div>
      )}
    </div>
  );
}
