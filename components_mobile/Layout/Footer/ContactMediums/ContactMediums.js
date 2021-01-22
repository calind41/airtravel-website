import React from "react";
import styles from "./ContactMediums.module.scss";
import {
  vk,
  fb,
  insta,
  twitter,
  viber,
} from "../../../../components/Layout/Footer/ContactMediums/icons";

// import { i18n } from "../../../../i18n";

export default function ContactMediums({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`footer:${key}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.medium}>
        <div className={styles.icon}>{vk}</div>
        <div className={styles.text}>{getLanguageSpecificContent("vk")}</div>
      </div>
      <div className={styles.medium}>
        <div className={styles.icon}>{fb}</div>
        <div className={styles.text}>{getLanguageSpecificContent("fb")}</div>
      </div>
      <div className={styles.medium}>
        <div className={styles.icon}>{insta}</div>
        <div className={styles.text}>{getLanguageSpecificContent("insta")}</div>
      </div>
      <div className={styles.medium}>
        <div className={styles.icon}>{twitter}</div>
        <div className={styles.text}>
          {getLanguageSpecificContent("twitter")}
        </div>
      </div>
      <div className={styles.medium}>
        <div className={styles.icon}>{viber}</div>
        <div className={styles.text}>{getLanguageSpecificContent("viber")}</div>
      </div>
    </div>
  );
}
