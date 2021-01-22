import React from "react";
import styles from "./QuickQuestions.module.scss";

// import { i18n } from "../../../../i18n";

export default function QuickQuestions({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`footer:${key}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>{getLanguageSpecificContent("qq1")}</div>
        <div>{getLanguageSpecificContent("qq2")}</div>
        <div>{getLanguageSpecificContent("qq3")}</div>
        <div>{getLanguageSpecificContent("qq4")}</div>
        <div> {getLanguageSpecificContent("qq5")}</div>
      </div>
    </div>
  );
}
