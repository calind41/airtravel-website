import React from "react";
import styles from "./SearchButton.module.css";

export default function SearchButton({
  positionClass,
  btnMultiCityClass,
  leftPosClass,
}) {
  return (
    <div className={styles.sbtnC}>
      <button
        className={`${styles[btnMultiCityClass]} ${styles[positionClass]} ${styles[leftPosClass]}`}
      >
        Search
      </button>
    </div>
  );
}
