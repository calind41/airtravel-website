import React from "react";
import styles from "./PhoneCard.module.scss";

import { i18n } from "../../../i18n";

export default function PhoneCard() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`phoneCard:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.title}>{getLanguageSpecificContent("title")}</div>
      <div className={styles.contactNr}>+373 22 895 895</div>
    </section>
  );
}
