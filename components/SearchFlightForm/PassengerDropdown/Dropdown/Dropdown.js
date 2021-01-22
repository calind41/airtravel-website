import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";

export default function Dropdown({
  nr,
  display,
  passNrAdults,
  passSelectedType,
  widthClass,
  t,
}) {
  const [nrAdults, setNrAdults] = useState(1);
  const [nrChilds, setNrChilds] = useState(0);
  const [nrBabies, setNrBabies] = useState(0);
  const [nrPassengers, setNrPassengers] = useState(1);

  const checkAdults = (nrA) => {
    const adultsInc = document.querySelector(`#adultsInc`);
    const adultsDec = document.querySelector(`#adultsDec `);
    if (nrA > 1 && nrA < 9) {
      // adultsInc.classList.add(styles.activeCounter);
      // adultsDec.classList.add(styles.activeCounter);
      adultsInc.classList.remove(styles.grayBg);
      adultsDec.classList.remove(styles.grayBg);
    }
    if (nrA === 1) {
      adultsDec.classList.remove(styles.activeCounter);
    }
    if (nrA === 9) {
      adultsInc.classList.remove(styles.activeCounter);
    }
  };
  const checkChilds = (nrC) => {
    const childsInc = document.querySelector(`#childsInc `);
    const childsDec = document.querySelector(`#childsDec`);
    if (nrC > 0 && nrC < 9) {
      childsInc.classList.add(styles.activeCounter);
      childsDec.classList.add(styles.activeCounter);
    }
    if (nrC === 0) {
      childsDec.classList.remove(styles.activeCounter);
    }
    if (nrC === 9) {
      childsInc.classList.remove(styles.activeCounter);
    }
  };
  const checkBabies = (nrB) => {
    const babiesInc = document.querySelector(`#babiesInc `);
    const babiesDec = document.querySelector(`#babiesDec `);
    if (nrB > 0 && nrB < 9) {
      babiesInc.classList.add(styles.activeCounter);
      babiesDec.classList.add(styles.activeCounter);
    }
    if (nrB === 0) {
      babiesDec.classList.remove(styles.activeCounter);
    }
    if (nrB === 9) {
      babiesInc.classList.remove(styles.activeCounter);
    }
  };

  const incrementNrAdults = () => {
    if (nrPassengers === 9) {
      return;
    }
    setNrPassengers(nrPassengers + 1);
    setNrAdults(nrAdults + 1);
    checkAdults(nrAdults + 1);
    passNrAdults(nrPassengers + 1);
  };
  const decrementNrAdults = () => {
    if (nrAdults === 1) return;
    if (nrBabies === nrAdults) {
      setNrBabies(nrAdults - 1);
      checkBabies(nrAdults - 1);
      setNrPassengers(nrPassengers - 2);
      setNrAdults(nrAdults - 1);
      passNrAdults(nrPassengers - 2);
    } else {
      setNrAdults(nrAdults - 1);
      setNrPassengers(nrPassengers - 1);
      passNrAdults(nrPassengers - 1);
    }
    checkAdults(nrAdults - 1);
  };
  const incrementNrChilds = () => {
    if (nrPassengers === 9) {
      return;
    }
    setNrPassengers(nrPassengers + 1);
    setNrChilds(nrChilds + 1);
    checkChilds(nrChilds + 1);
    passNrAdults(nrPassengers + 1);
  };
  const decrementNrChilds = () => {
    if (nrChilds === 0) return;

    setNrPassengers(nrPassengers - 1);
    setNrChilds(nrChilds - 1);
    checkChilds(nrChilds - 1);
    passNrAdults(nrPassengers - 1);
  };
  const incrementNrBabies = () => {
    if (nrPassengers === 9) {
      return;
    }
    if (nrBabies === nrAdults) return;
    setNrPassengers(nrPassengers + 1);
    setNrBabies(nrBabies + 1);
    checkBabies(nrBabies + 1);
    passNrAdults(nrPassengers + 1);
  };
  const decrementNrBabies = () => {
    if (nrBabies === 0) return;
    setNrPassengers(nrPassengers - 1);
    setNrBabies(nrBabies - 1);
    checkBabies(nrBabies - 1);
    passNrAdults(nrPassengers - 1);
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
      className={`${styles.dropdownC} ${styles[widthClass]}`}
    >
      <div className={styles.passengerCounters}>
        <div className={styles.adultsWrapper}>
          <div className={styles.details}>
            <div>{t("passengerType-adult")}</div>
            <div className={styles.ageInterval}>{t("ageInterval-adult")}</div>
          </div>

          <div className={styles.nrAdultsC}>
            <button
              id='adultsDec'
              className={nrAdults === 1 ? styles.grayBg : ""}
              onClick={decrementNrAdults}
            >
              -
            </button>
            <div>
              <div>
                <span>{nrAdults}</span>
              </div>
            </div>
            <button
              id='adultsInc'
              className={nrAdults === 9 ? styles.grayBg : ""}
              onClick={incrementNrAdults}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.childsWrapper}>
          <div className={styles.details}>
            <div>{t("passengerType-child")}</div>
            <div className={styles.ageInterval}>{t("ageInterval-child")}</div>
          </div>
          <div className={styles.nrChildsC}>
            <button
              id='childsDec'
              className={nrChilds === 0 ? styles.grayBg : ""}
              onClick={decrementNrChilds}
            >
              -
            </button>
            <div>
              <span>{nrChilds}</span>
            </div>
            <button
              id='childsInc'
              className={nrChilds === 9 ? styles.grayBg : ""}
              onClick={incrementNrChilds}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.babiesWrapper}>
          <div className={styles.details}>
            <div>{t("passengerType-baby")}</div>
            <div className={styles.ageInterval}>{t("ageInterval-baby")}</div>
          </div>
          <div className={styles.nrBabiesC}>
            <button
              id='babiesDec'
              className={nrBabies === 0 ? styles.grayBg : ""}
              onClick={decrementNrBabies}
            >
              -
            </button>
            <div>
              <span>{nrBabies}</span>
            </div>
            <button
              id='babiesInc'
              className={nrBabies === 9 ? styles.grayBg : ""}
              onClick={incrementNrBabies}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.flightTypes}>
        <div>
          <button
            id={`economyBtnId${nr}`}
            onClick={chooseType}
            className={styles.selectedBtn}
          >
            {t("flightType-economy")}
          </button>
          <button id={`premiumBtnId${nr}`} onClick={chooseType}>
            {t("flightType-comfort")}
          </button>
        </div>
        <div>
          <button id={`businessBtnId${nr}`} onClick={chooseType}>
            {t("flightType-business")}
          </button>
          <button id={`firstBtnId${nr}`} onClick={chooseType}>
            {t("flightType-firstClass")}
          </button>
        </div>
      </div>
    </div>
  );
}
