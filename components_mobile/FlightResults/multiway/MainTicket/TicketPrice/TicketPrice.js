import React from "react";
import styles from "./TicketPrice.module.scss";

export default function TicketPrice() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.price}>300$</div>
        <div className={styles.type}>туда – обратно</div>
      </div>
    </div>
  );
}
