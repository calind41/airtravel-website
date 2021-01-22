import React, { useEffect } from "react";
import styles from "./TripButtons.module.scss";
import { i18n } from "../../../../../i18n";

export default function TripButtons({
  t,
  btnsContainerClass,
  btnsClass,
  passTripType,
}) {
  const handleBtnClick = (evt) => {
    document
      .querySelectorAll("#tripBtnId")
      .forEach((btn) => btn.classList.remove(styles.isSelected));
    evt.target.classList.add(styles.isSelected);
    passTripType(evt.target.textContent);

    // Or set it to local storage
    console.log(evt.target.textContent);
    localStorage.setItem("tripType", evt.target.textContent);
    localStorage.setItem("nrSelectedDates", 0);
    localStorage.removeItem("firstItemSelected");
    localStorage.removeItem("secondItemSelected");
  };
  useEffect(() => {
    document
      .querySelectorAll("#tripBtnId")
      .forEach((btn) => btn.addEventListener("click", handleBtnClick));
  }, []);

  return (
    <div
      id='tripBtnsContainerId'
      className={`${styles.tripBtns} ${styles[btnsContainerClass]}`}
    >
      <button id='tripBtnId' className={` ${styles[btnsClass]}`}>
        {/* Round trip */}
        {t("TripButtons-roundTripBtn")}
      </button>
      <button
        id='tripBtnId'
        className={`${styles.isSelected} ${styles[btnsClass]}`}
      >
        {/* One way */}
        {t("TripButtons-oneWayTripBtn")}
      </button>
    </div>
  );
}
