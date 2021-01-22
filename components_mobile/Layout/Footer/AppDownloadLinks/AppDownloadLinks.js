import React from "react";
import styles from "./AppDownloadLinks.module.scss";
import {
  appStoreIcon,
  googlePlayIcon,
} from "../../../../components/Layout/Footer/AppDownloadLinks/icons";

export default function AppDownloadLinks() {
  return (
    <div className={styles.container}>
      <div className={styles.appStore}>
        <div className={styles.icon}>{appStoreIcon}</div>
        <div className={styles.text}>App Store</div>
      </div>
      <div className={styles.googlePlay}>
        <div className={styles.icon}>{googlePlayIcon}</div>
        <div className={styles.text}>Google Play</div>
      </div>
    </div>
  );
}
