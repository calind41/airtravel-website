import React from "react";
import styles from "./NoTickets.module.scss";

import { i18n } from "../../../../i18n";

export default function NoTickets() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`personalRoom:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        {getLanguageSpecificContent("NoTickets-title")}
      </div>
      <div className={styles.subtitle}>
        {getLanguageSpecificContent("NoTickets-subtitle")}
      </div>
      <div className={styles.main}>
        <div className={styles.searchTicketButton}>
          {getLanguageSpecificContent("NoTickets-button")}
        </div>
      </div>
    </section>
  );
}
