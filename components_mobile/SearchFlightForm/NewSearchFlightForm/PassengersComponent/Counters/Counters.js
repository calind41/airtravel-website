import React, { useState, useEffect } from "react";
import styles from "./Counters.module.scss";
import { i18n } from "../../../../../i18n";

export default function Counters({
  nr,
  display,
  passNrAdults,
  widthClass,
  nrAdults,
  nrChilds,
  nrBabies,
  nrPassengers,
  setNrAdults,
  setNrChilds,
  setNrBabies,
  setNrPassengers,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`common:${key}`);
  };
  const checkAdults = (nrA) => {
    const adultsInc = document.querySelector(`#adultsInc`);
    const adultsDec = document.querySelector(`#adultsDec `);
    if (nrA > 1 && nrA < 9) {
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

  return (
    <div
      style={{ display: `${display}` }}
      id={`dropdownCid`}
      className={`${styles.dropdownC} ${styles[widthClass]}`}
    >
      <div className={styles.passengerCounters}>
        <div className={styles.adultsWrapper}>
          <div className={styles.details}>
            <div>{getLanguageSpecificContent("passengerType-adult")}</div>
            <div className={styles.ageInterval}>
              {getLanguageSpecificContent("ageInterval-adult")}
            </div>
          </div>

          <div className={styles.nrAdultsC}>
            <button
              id='adultsDec'
              className={nrAdults === 1 ? styles.grayBg : ""}
              onClick={decrementNrAdults}
            >
              {minusSign}
            </button>

            <div>
              <span>{nrAdults}</span>
            </div>

            <button
              id='adultsInc'
              className={nrPassengers === 9 ? styles.grayBg : ""}
              onClick={incrementNrAdults}
            >
              {plusSign}
            </button>
          </div>
        </div>
        <div className={styles.childsWrapper}>
          <div className={styles.details}>
            <div>{getLanguageSpecificContent("passengerType-child")}</div>
            <div className={styles.ageInterval}>
              {getLanguageSpecificContent("ageInterval-child")}
            </div>
          </div>
          <div className={styles.nrChildsC}>
            <button
              id='childsDec'
              className={nrChilds === 0 ? styles.grayBg : ""}
              onClick={decrementNrChilds}
            >
              {minusSign}
            </button>
            <div>
              <span>{nrChilds}</span>
            </div>
            <button
              id='childsInc'
              className={nrPassengers === 9 ? styles.grayBg : ""}
              onClick={incrementNrChilds}
            >
              {plusSign}
            </button>
          </div>
        </div>
        <div className={styles.babiesWrapper}>
          <div className={styles.details}>
            <div>{getLanguageSpecificContent("passengerType-baby")}</div>
            <div className={styles.ageInterval}>
              {getLanguageSpecificContent("ageInterval-baby")}
            </div>
          </div>
          <div className={styles.nrBabiesC}>
            <button
              id='babiesDec'
              className={nrBabies === 0 ? styles.grayBg : ""}
              onClick={decrementNrBabies}
            >
              {minusSign}
            </button>
            <div>
              <span>{nrBabies}</span>
            </div>
            <button
              id='babiesInc'
              className={nrPassengers === 9 ? styles.grayBg : ""}
              onClick={incrementNrBabies}
            >
              {plusSign}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const plusSign = (
  <svg
    width='8'
    height='8'
    viewBox='0 0 8 8'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5 3h3v2H5v3H3V5H0V3h3V0h2v3z'
      fill='#FFF'
      fillRule='evenodd'
    ></path>
  </svg>
);

const minusSign = (
  <svg
    width='8'
    height='2'
    viewBox='0 0 8 2'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M0 0h8v2H0z' fill='#FFF' fillRule='evenodd'></path>
  </svg>
);
