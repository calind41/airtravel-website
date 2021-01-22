import React, { useState, useEffect, useContext } from "react";
import styles from "./FilterSettings.module.scss";
import { planeIcon } from "../../../MainHeader/MainHeader";
import Transfers from "../../../Filters/FilterSettings/Transfers/Transfers";
import Departure from "../../../Filters/FilterSettings/Departure/Departure";
import Arrival from "../../../Filters/FilterSettings/Arrival/Arrival";
import Duration from "../../../Filters/FilterSettings/Duration/Duration";
import TwoCheckboxComponent from "../../../Filters/FilterSettings/TwoCheckboxComponent/TwoCheckboxComponent";
import {
  FiltersMultiwayDispatchContext,
  FiltersMultiwayStateContext,
} from "../Filters";
import { dom } from "../../../../../helpers/reuse";

export default function FilterSettings({ multiway, from, to, date }) {
  const { dispatch } = useContext(FiltersMultiwayDispatchContext);
  const { state } = useContext(FiltersMultiwayStateContext);
  const { numOfFilters, animateClass } = state;

  const nrOptions = 95;
  const [
    renderCancelAllFiltersButton,
    setRenderCancelAllFiltersButton,
  ] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 388) {
        dom(`.${styles.container}`).style.position = "fixed";
        dom(`.${styles.container}`).style.top = "69px";
      } else {
        dom(`.${styles.container}`).style.position = "relative";
        dom(`.${styles.container}`).style.top = "0px";
      }
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
    dispatch({ type: "field", fieldName: "numOfFilters", payload: 0 });
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
              id='transfers1'
              cancelFilters={cancelFilters}
              multiway={multiway}
            />
            <Departure
              id='departure1'
              cancelFilters={cancelFilters}
              multiway={multiway}
            />
            <Arrival
              id='arrival1'
              cancelFilters={cancelFilters}
              multiway={multiway}
            />
            <Duration
              id='duration1'
              cancelFilters={cancelFilters}
              multiway={multiway}
            />
          </div>
          {/* retur */}
          <div style={{ marginTop: "23px" }} className={styles.header}>
            <div className={styles.flightInfo}>
              <div className={styles.top}>
                <div className={`${styles.planeIcon} ${styles.planeIcon2}`}>
                  {planeIcon}
                </div>
                <div className={styles.fromTo}>
                  {from} - {to}
                </div>
              </div>
              <div className={styles.bottom}>{date}</div>
            </div>
          </div>
          <div className={styles.mainSettings}>
            <Transfers
              id='transfers2'
              cancelFilters={cancelFilters}
              multiway={true}
            />
            <Departure
              id='departure2'
              cancelFilters={cancelFilters}
              multiway={true}
            />
            <Arrival
              id='arrival2'
              cancelFilters={cancelFilters}
              multiway={true}
            />
            <Duration
              id='duration2'
              cancelFilters={cancelFilters}
              multiway={true}
            />
          </div>

          <div className={styles.bottomSettings}>
            <div className={styles.baggage}>
              <TwoCheckboxComponent
                cancelFilters={cancelFilters}
                multiway={multiway}
                title='Багаж'
                textOne='С багажом'
                textTwo='Без багажа'
              />
            </div>
            <div className={styles.seller}>
              <TwoCheckboxComponent
                cancelFilters={cancelFilters}
                multiway={multiway}
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
    <g fill='none' fillRule='evenodd'>
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
