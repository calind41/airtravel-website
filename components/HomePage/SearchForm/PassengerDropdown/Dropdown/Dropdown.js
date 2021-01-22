import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  nr,
  display,
  passNrAdults,
  passSelectedType,
}) {
  const [nrAdults, setNrAdults] = useState(1);

  const decrement = () => {
    if (nrAdults === 1) {
      return;
    }
    setNrAdults(nrAdults - 1);
    passNrAdults(nrAdults - 1);
  };
  const increment = () => {
    if (nrAdults === 9) {
      return;
    }
    setNrAdults(nrAdults + 1);
    passNrAdults(nrAdults + 1);
  };
  const chooseType = (evt) => {
    document
      .querySelector(`#economyBtnId${nr}`)
      .classList.remove(styles.selectedBtn);
    document
      .querySelector(`#premiumBtnId${nr}`)
      .classList.remove(styles.selectedBtn);
    document
      .querySelector(`#businessBtnId${nr}`)
      .classList.remove(styles.selectedBtn);
    document
      .querySelector(`#firstBtnId${nr}`)
      .classList.remove(styles.selectedBtn);
    evt.target.classList.add(styles.selectedBtn);

    passSelectedType(evt.target.textContent);
  };
  return (
    <div
      style={{ display: `${display}` }}
      id={`dropdownCid`}
      className={styles.dropdownC}
    >
      <div className='nr-adults-c'>
        <button
          className={nrAdults === 1 ? styles.grayBg : ""}
          onClick={decrement}
        >
          -
        </button>
        <div>
          <span>{nrAdults}</span>adults
        </div>
        <button
          className={nrAdults === 9 ? styles.grayBg : ""}
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className={styles.flightTypes}>
        <div>
          <button
            id={`economyBtnId${nr}`}
            onClick={chooseType}
            className={styles.selectedBtn}
          >
            Economy
          </button>
          <button id={`premiumBtnId${nr}`} onClick={chooseType}>
            Premium
          </button>
        </div>
        <div>
          <button id={`businessBtnId${nr}`} onClick={chooseType}>
            Business
          </button>
          <button id={`firstBtnId${nr}`} onClick={chooseType}>
            First
          </button>
        </div>
      </div>
    </div>
  );
}
