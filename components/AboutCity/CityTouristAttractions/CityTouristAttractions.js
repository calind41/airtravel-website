import React from "react";
import styles from "./CityTouristAttractions.module.scss";
// import { i18n } from "../../../i18n";

export default function CityTouristAttractions({ t, text, city }) {
  const getLanguageSpecificContent = (key) => {
    return t(`aboutCity:${key}`);
  };
  return (
    <section className={styles.touristAttractions}>
      <div>
        {getLanguageSpecificContent("CityTouristAttractions-title")} {city}
      </div>
      {text}
    </section>
  );
}
