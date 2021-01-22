import React, { useState, useEffect } from "react";
import styles from "./FlightResultsHeader.module.scss";
import HeaderTicket from "./HeaderTicket/HeaderTicket";
import HeaderTop from "./HeaderTop/HeaderTop";
import { SearchForm } from "../../../SearchFlightForm/SearchFlightForm";
import Header from "../../../HomePage/Header/Header";
import { dom } from "../../../../helpers/reuse";

const headerTopProps = {
  from: "Кишинёв (KIV)",
  to: "Лондон (LON)",
  nrPassengers: 1,
  flightType: "эконом",
};

export default function FlightResultsHeader({ passRenderTicketModal, t }) {
  const [renderSearchForm, setRenderSearchForm] = useState(false);
  useEffect(() => {
    if (renderSearchForm) {
      dom.style.zIndex = "1";
    } else {
      dom.style = {};
    }
  }, [renderSearchForm]);
  const swithToSearchForm = () => {
    setRenderSearchForm(true);
  };
  const switchToResults = () => {
    setRenderSearchForm(false);
  };
  return (
    <div className={styles.container}>
      <Header t={t} position='absolute' mode='dark' />
      <img src='/images/flightResultCities/LON.jpg' />

      {renderSearchForm ? (
        <div style={searchFormStyles}>
          <div onClick={switchToResults} className={styles.header}>
            <div>{goBackIcon}</div>
            <div>СВЕРНУТЬ</div>
          </div>
          <SearchForm inFlightSearchResults={true} t={t} />
        </div>
      ) : (
        <div style={positionStyles}>
          <HeaderTop
            swithToSearchForm={swithToSearchForm}
            {...headerTopProps}
          />
          <div className={styles.wrapper}>
            <HeaderTicket
              passRenderTicketModal={passRenderTicketModal}
              id='ht1'
              type='Самый дешевый'
              price='120$'
            />
            <HeaderTicket
              passRenderTicketModal={passRenderTicketModal}
              id='ht2'
              type='Самый быстрый'
              price='200$'
            />
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
