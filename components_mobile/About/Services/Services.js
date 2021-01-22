import React from "react";
import styles from "./Services.module.scss";
import { support247Svg, smartRoutesSvg, freeRegistrationSvg } from "./svg";

import { i18n } from "../../../i18n";

export default function Services_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`services:${key}`);
  };
  return (
    <section className={styles.container}>
      <div className={styles.supportWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{support247Svg}</span>
          <span>{getLanguageSpecificContent("serviceCard1-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getLanguageSpecificContent("serviceCard1-mainText")}
        </div>
      </div>
      <div className={styles.smartRoutesWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{smartRoutesSvg}</span>
          <span>{getLanguageSpecificContent("serviceCard2-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getLanguageSpecificContent("serviceCard2-mainText")}
        </div>
      </div>
      <div className={styles.freeRegistrationWrapper}>
        <div className={styles.heading}>
          <span className={styles.svgWrapper}>{freeRegistrationSvg}</span>
          <span>{getLanguageSpecificContent("serviceCard3-headingText")}</span>
        </div>
        <div className={styles.text}>
          {getLanguageSpecificContent("serviceCard3-mainText")}
        </div>
      </div>
    </section>
  );
}
