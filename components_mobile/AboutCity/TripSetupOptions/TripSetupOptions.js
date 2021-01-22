import React from "react";
import styles from "./TripSetupOptions.module.scss";
import { carRentalSvg, hotelRentalSvg } from "./icons";

import { i18n } from "../../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`aboutCity:${key}`);
};

export default function TripSetupOptions() {
  return (
    <section className={styles.tripSetupOptions}>
      <div>{getLanguageSpecificContent("TripSetupOptions-title")} Venetia</div>
      <div className={styles.rentalCardWrapper}>
        <RentalCard
          icon={carRentalSvg}
          title={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-title1"
          )} Venetia`}
          subtitle={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-subtitle1-1"
          )} Venetia ${getLanguageSpecificContent(
            "TripSetupOptions-rc-subtitle1-2"
          )}`}
          buttonText={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-buttonText"
          )} Venetia`}
        />
        <RentalCard
          icon={hotelRentalSvg}
          title={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-title2"
          )} Venetia`}
          subtitle={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-subtitle2-1"
          )} Venetia`}
          buttonText={`${getLanguageSpecificContent(
            "TripSetupOptions-rc-buttonText2"
          )} Venetia`}
        />
      </div>
    </section>
  );
}

function RentalCard({ icon, title, subtitle, buttonText }) {
  return (
    <div className={styles.rentalCardContainer}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.ctaBtn}>{buttonText}</div>
    </div>
  );
}
