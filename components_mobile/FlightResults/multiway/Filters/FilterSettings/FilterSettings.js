import React, { useState, useEffect } from "react";
import styles from "./FilterSettings.module.scss";
import { planeIcon } from "../../MainHeader/MainHeader";
import Transfers from "./Transfers/Transfers";
import Departure from "./Departure/Departure";
import Arrival from "./Arrival/Arrival";
import Duration from "./Duration/Duration";
import TwoCheckboxComponent from "./TwoCheckboxComponent/TwoCheckboxComponent";

export default function FilterSettings({
  numOfFilters,
  setNumOfFilters,
  animateClass,
  from,
  to,
  date,
}) {
  const nrOptions = 95;
  const [
    renderCancelAllFiltersButton,
    setRenderCancelAllFiltersButton,
  ] = useState(false);
  useEffect(() => {
    if (numOfFilters !== 0) {
      setRenderCancelAllFiltersButton(true);
    } else {
      setRenderCancelAllFiltersButton(false);
      setCancelFilters(false);
    }
  }, [numOfFilters]);

  const cancelAllFilters = () => {
    setCancelFilters(true);
    setNumOfFilters(0);
  };
  const [cancelFilters, setCancelFilters] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.outerWrapper} ${styles[animateClass]}`}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.flightInfo}>
              <div className={styles.top}>
                <div className={styles.planeIcon}>{planeIcon}</div>
                <div className={styles.fromTo}>
                  {from} - {to}
                </div>
              </div>
              <div className={styles.bottom}>{date}</div>
            </div>
            <div className={styles.buttonWrapperRight}>
              {renderCancelAllFiltersButton ? (
                <div
                  onClick={cancelAllFilters}
                  className={styles.cancelAllFiltersButton}
                >
                  Сбросить фильтры
                </div>
              ) : null}
              <div className={styles.showAllOptions}>
                Показать {nrOptions} вариант
              </div>
            </div>
          </div>
          <div className={styles.mainSettings}>
            <Transfers
              id='transfers'
              cancelFilters={cancelFilters}
              numOfFilters={numOfFilters}
              setNumOfFilters={setNumOfFilters}
            />
            <Departure
              id='departure'
              cancelFilters={cancelFilters}
              numOfFilters={numOfFilters}
              setNumOfFilters={setNumOfFilters}
            />
            <Arrival
              id='arrival'
              cancelFilters={cancelFilters}
              numOfFilters={numOfFilters}
              setNumOfFilters={setNumOfFilters}
            />
            <Duration
              id='duration'
              cancelFilters={cancelFilters}
              numOfFilters={numOfFilters}
              setNumOfFilters={setNumOfFilters}
            />
          </div>
          <div className={styles.bottomSettings}>
            <div className={styles.baggage}>
              <TwoCheckboxComponent
                cancelFilters={cancelFilters}
                setNumOfFilters={setNumOfFilters}
                title='Багаж'
                textOne='С багажом'
                textTwo='Без багажа'
              />
            </div>
            <div className={styles.seller}>
              <TwoCheckboxComponent
                cancelFilters={cancelFilters}
                setNumOfFilters={setNumOfFilters}
                title='Продавец'
                textOne='Тинькофф'
                textTwo='Партнеры'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const cancelFilterIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
    <g fill='none' fill-rule='evenodd'>
      <path fill='none' d='M-4-4h24v24H-4z'></path>
      <path fill='none' d='M0 0h16v16H0z'></path>
      <path
        fill='#FFF'
        d='M8 6.788l-3.03-3.03A.857.857 0 003.757 4.97L6.787 8l-3.03 3.03a.857.857 0 001.213 1.213L8 9.213l3.03 3.03a.857.857 0 001.213-1.213L9.213 8l3.03-3.03a.857.857 0 00-1.213-1.213L8 6.787zM8 16A8 8 0 118 0a8 8 0 010 16z'
      ></path>
    </g>
  </svg>
);
export const arrowIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
    <path
      fill='currentColor'
      d='M3.293 7.707a1 1 0 011.414-1.414L8 9.586l3.293-3.293a1 1 0 011.414 1.414L9.414 11a2 2 0 01-2.828 0L3.293 7.707z'
    ></path>
  </svg>
);
