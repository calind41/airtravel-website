import React from "react";
import styles from "./InterestingFact.module.scss";

import { i18n } from "../../../i18n";

export default function InterestingFact_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`interestingFact:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.textWrapper}>
        <h4>{getLanguageSpecificContent("title")}</h4>
        <h2>{getLanguageSpecificContent("subtitle")}</h2>
        <p>{getLanguageSpecificContent("description")}</p>
      </div>
      <div className={styles.imageWrapper}>
        <img src='/images/nyc.png' alt='NYC' />
      </div>
    </section>
  );
}
