import React from "react";
import styles from "./IflyWarrant.module.scss";
import { greenCheckmarkSvg } from "./svg";
import { i18n } from "../../../i18n";

export default function IflyWarrant() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`payment:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <span>{greenCheckmarkSvg}</span>
        <span>{getLanguageSpecificContent("IflyWarrant-title")} iFly.md</span>
      </div>
      <div className={styles.text}>
        {getLanguageSpecificContent("IflyWarrant-text1")}{" "}
        <a>{getLanguageSpecificContent("IflyWarrant-text2")}</a>
        <div>
          {getLanguageSpecificContent("IflyWarrant-text3")} iFly.md
          {getLanguageSpecificContent("IflyWarrannt-text4")} iFly.md
        </div>
      </div>
      <div></div>
    </section>
  );
}
