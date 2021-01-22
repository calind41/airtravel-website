import React, { useEffect } from "react";
import styles from "./TripButtons.module.scss";

export default function TripButtons({
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
    localStorage.setItem("tripType", evt.target.textContent);
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
      <button
        id='tripBtnId'
        className={`${styles.isSelected} ${styles[btnsClass]}`}
      >
        Round trip
      </button>
      <button id='tripBtnId' className={`${styles[btnsClass]}`}>
        One way
      </button>
    </div>
  );
}
