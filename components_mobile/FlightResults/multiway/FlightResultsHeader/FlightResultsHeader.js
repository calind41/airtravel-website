import React, { useState, useEffect } from "react";
import styles from "./FlightResultsHeader.module.scss";
import HeaderTicket from "./HeaderTicket/HeaderTicket";
import HeaderTop from "./HeaderTop/HeaderTop";
import MobileHeader from "../../../../components/HomePage/Header/MobileHeader/MobileHeader";
import Form from "../../../SearchFlightForm/NewSearchFlightForm/Form/Form";
import { dom } from "../../../../helpers/reuse";

const headerTopProps = {
  from: "Кишинёв",
  to: "Лондон",
  nrPassengers: 1,
  flightType: "эконом",
};

export default function FlightResultsHeader({ t }) {
  const [renderSearchForm, setRenderSearchForm] = useState(false);

  const handleTouchStart = (evt) => {};

  const handleTouchEnd = (evt) => {
    const headerTicketsWrapper = dom(`.${styles.outerWrapper}`);
    const surfaceWidth = window.outerWidth * 0.95;
    const wrapper = dom(`.${styles.wrapper}`);

    if (headerTicketsWrapper.scrollLeft > surfaceWidth / 2) {
      headerTicketsWrapper.scrollLeft =
        headerTicketsWrapper.scrollWidth - headerTicketsWrapper.clientWidth;

      dom(`.${styles.dot2}`).classList.add(styles.selectedDot);
      dom(`.${styles.dot1}`).classList.remove(styles.selectedDot);
    } else {
      headerTicketsWrapper.scrollLeft = 0;

      dom(`.${styles.dot2}`).classList.remove(styles.selectedDot);
      dom(`.${styles.dot1}`).classList.add(styles.selectedDot);
    }
  };

  useEffect(() => {
    const headerTicketsWrapper = dom(`.${styles.outerWrapper}`);
    headerTicketsWrapper.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    headerTicketsWrapper.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      headerTicketsWrapper.removeEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      headerTicketsWrapper.removeEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
    };
  }, []);
  const swithToSearchForm = () => {
    setRenderSearchForm(true);
  };
  const switchToResults = () => {
    setRenderSearchForm(false);
  };
  return (
    <div className={styles.container}>
      <MobileHeader mode='dark' />
      <img src='/images/flightResultCities/LON.jpg' />

      {renderSearchForm ? (
        <div style={searchFormStyles}>
          <div onClick={switchToResults} className={styles.header}>
            <div>{goBackIcon}</div>
            <div>СВЕРНУТЬ</div>
          </div>
          <Form />
        </div>
      ) : (
        <div style={positionStyles}>
          <HeaderTop
            swithToSearchForm={swithToSearchForm}
            {...headerTopProps}
          />
          <div className={styles.outerWrapper}>
            <div className={styles.wrapper}>
              <HeaderTicket key={0} type='Дешевый' price='120$' />
              <HeaderTicket key={1} type='Быстрый' price='200$' />
            </div>
          </div>
          <div className={styles.dots}>
            <div className={`${styles.dot1} ${styles.selectedDot}`}></div>
            <div className={styles.dot2}></div>
          </div>
        </div>
      )}
    </div>
  );
}

const goBackIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
  >
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z' />
  </svg>
);

const positionStyles = {
  position: "relative",
  marginTop: "80px",
};

const searchFormStyles = {
  position: "relative",
  marginTop: "71px",
};
