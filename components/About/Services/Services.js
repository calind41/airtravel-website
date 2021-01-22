import React from "react";
import styles from "./Services.module.scss";
import { support247Svg, smartRoutesSvg, freeRegistrationSvg } from "./svg";

// import { i18n } from "../../../i18n";

export default function Services({ t }) {
  const getSpecificLanguageContent = (key) => {
    return t(`services:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.supportWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{support247Svg}</span>
          <span>{getSpecificLanguageContent("serviceCard1-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getSpecificLanguageContent("serviceCard1-mainText")}
        </div>
      </div>
      <div className={styles.smartRoutesWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{smartRoutesSvg}</span>
          <span>{getSpecificLanguageContent("serviceCard2-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getSpecificLanguageContent("serviceCard2-mainText")}
        </div>
      </div>
      <div className={styles.freeRegistrationWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{freeRegistrationSvg}</span>
          <span>{getSpecificLanguageContent("serviceCard3-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getSpecificLanguageContent("serviceCard3-mainText")}
        </div>
      </div>
    </section>
  );
}
