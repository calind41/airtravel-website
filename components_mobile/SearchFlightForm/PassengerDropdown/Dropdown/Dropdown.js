import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import { closeIconSvg, goBackMobileSvg, arrowNextSvg } from "../../svg";

export default function Dropdown({
  hideDropdown,
  defaultNrAdults,
  defaultNrChilds,
  defaultNrBabies,
  defaultNrPassengers,
  passCounterValues,
  renderCalendar,
  searchFlights,
}) {
  const [nrAdults, setNrAdults] = useState(defaultNrAdults);
  const [nrChilds, setNrChilds] = useState(defaultNrChilds);
  const [nrBabies, setNrBabies] = useState(defaultNrBabies);
  const [nrPassengers, setNrPassengers] = useState(defaultNrPassengers);

  const checkAdults = (nrA) => {
    const adultsInc = document.querySelector(`#adultsInc`);
    const adultsDec = document.querySelector(`#adultsDec `);
    if (nrA > 1 && nrA < 9) {
      adultsInc.classList.add(styles.activeCounter);
      adultsDec.classList.add(styles.activeCounter);
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
  };
  const decrementNrAdults = () => {
    if (nrAdults === 1) return;
    if (nrBabies === nrAdults) {
      setNrBabies(nrAdults - 1);
      checkBabies(nrAdults - 1);
      setNrPassengers(nrPassengers - 2);
      setNrAdults(nrAdults - 1);
    } else {
      setNrAdults(nrAdults - 1);
      setNrPassengers(nrPassengers - 1);
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
  };
  const decrementNrChilds = () => {
    if (nrChilds === 0) return;

    setNrPassengers(nrPassengers - 1);
    setNrChilds(nrChilds - 1);
    checkChilds(nrChilds - 1);
  };
  const incrementNrBabies = () => {
    if (nrPassengers === 9) {
      return;
    }
    if (nrBabies === nrAdults) return;
    setNrPassengers(nrPassengers + 1);
    setNrBabies(nrBabies + 1);
    checkBabies(nrBabies + 1);
  };
  const decrementNrBabies = () => {
    if (nrBabies === 0) return;
    setNrPassengers(nrPassengers - 1);
    setNrBabies(nrBabies - 1);
    checkBabies(nrBabies - 1);
  };

  const toNextInput = () => {
    searchFlights();
  };
  const toPrevInput = () => {
    const calendar = document.querySelector(`#calendarInputSmallScreenId`);

    if (!calendar) {
      renderCalendar();
      closePassengers();
    } else {
      closePassengers();
      calendar.style.display = "block";
    }
  };
  const closePassengers = () => {
    passCounterValues(nrAdults, nrChilds, nrBabies, nrPassengers);
    hideDropdown();
  };
  return (
    <div id={`dropdownCid`} className={styles.dropdownC}>
      <div>
        <span onClick={toPrevInput} className={styles.goBackIcon}>
          {goBackMobileSvg}
        </span>
        <span className={styles.closeIcon} onClick={closePassengers}>
          {closeIconSvg}
        </span>
      </div>
      <div className={styles.question}>Сколько вас?</div>
      <main>
        <div className={styles.adult}>
          <div className={styles.category}>
            <div>Взрослые</div>
            <div>Старше 12 лет</div>
          </div>
          <div className={styles.counter}>
            <div
              className={defaultNrAdults > 1 ? styles.activeCounter : ""}
              id='adultsDec'
              onClick={decrementNrAdults}
            ></div>
            <div>{nrAdults}</div>
            <div
              id='adultsInc'
              className={styles.activeCounter}
              onClick={incrementNrAdults}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.child}>
          <div className={styles.category}>
            <div>Дети</div>
            <div>От 2 до 12 лет</div>
          </div>
          <div className={styles.counter}>
            <div
              className={defaultNrChilds > 0 ? styles.activeCounter : ""}
              id='childsDec'
              onClick={decrementNrChilds}
            ></div>
            <div>{nrChilds}</div>
            <div
              id='childsInc'
              className={styles.activeCounter}
              onClick={incrementNrChilds}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.baby}>
          <div className={styles.category}>
            <div>Младенцы</div>
            <div>До 2 лет, без места</div>
          </div>
          <div className={styles.counter}>
            <div
              className={defaultNrBabies > 0 ? styles.activeCounter : ""}
              id='babiesDec'
              onClick={decrementNrBabies}
            ></div>
            <div>{nrBabies}</div>
            <div
              id='babiesInc'
              className={styles.activeCounter}
              onClick={incrementNrBabies}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </main>
      <button
        onClick={toNextInput}
        className={`${styles.nextBtn} ${styles.activeNextBtn}`}
      >
        <span>Далее</span>
        <span>{arrowNextSvg}</span>
      </button>
    </div>
  );
}
