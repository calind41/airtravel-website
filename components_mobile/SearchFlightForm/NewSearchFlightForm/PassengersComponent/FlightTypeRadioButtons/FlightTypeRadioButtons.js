import React, { useState, useEffect } from "react";
import styles from "./FlightTypeRadioButtons.module.scss";

import { i18n } from "../../../../../i18n";

export default function FlightTypeRadioButtons({
  selectedRadioButton,
  setSelectedRadioButton,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`common:${key}`);
  };

  useEffect(() => {
    const rbContainers = document.querySelectorAll(
      `.${styles.radioButtonContainer}`
    );

    rbContainers.forEach((elem) =>
      elem.addEventListener("click", (evt) => onRadioButtonClickHandler(evt))
    );
    const onRadioButtonClickHandler = (evt) => {
      rbContainers.forEach((elem) => elem.classList.remove(styles.selectedRB));
      evt.target.classList.add(styles.selectedRB);
      setSelectedRadioButton(evt.target.children[1].textContent);
    };
    return () => {
      rbContainers.forEach((elem) =>
        elem.removeEventListener("click", onRadioButtonClickHandler)
      );
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={
          selectedRadioButton ===
          `${getLanguageSpecificContent("flightType-economy")}`
            ? `${styles.radioButtonContainer} ${styles.selectedRB}`
            : `${styles.radioButtonContainer}`
        }
      >
        <div className={`${styles.rb} `}></div>
        <div className={styles.type}>
          {getLanguageSpecificContent("flightType-economy")}
        </div>
      </div>
      <div
        className={
          selectedRadioButton ===
          `${getLanguageSpecificContent("flightType-comfort")}`
            ? `${styles.radioButtonContainer} ${styles.selectedRB}`
            : `${styles.radioButtonContainer}`
        }
      >
        <div className={styles.rb}></div>
        <div className={styles.type}>
          {getLanguageSpecificContent("flightType-comfort")}
        </div>
      </div>
      <div
        className={
          selectedRadioButton ===
          `${getLanguageSpecificContent("flightType-business")}`
            ? `${styles.radioButtonContainer} ${styles.selectedRB}`
            : `${styles.radioButtonContainer}`
        }
      >
        <div className={styles.rb}></div>
        <div className={styles.type}>
          {getLanguageSpecificContent("flightType-business")}
        </div>
      </div>
      <div
        className={
          selectedRadioButton ===
          `${getLanguageSpecificContent("flightType-firstClass")}`
            ? `${styles.radioButtonContainer} ${styles.selectedRB}`
            : `${styles.radioButtonContainer}`
        }
      >
        <div className={styles.rb}></div>
        <div className={styles.type}>
          {getLanguageSpecificContent("flightType-firstClass")}
        </div>
      </div>
    </div>
  );
}
