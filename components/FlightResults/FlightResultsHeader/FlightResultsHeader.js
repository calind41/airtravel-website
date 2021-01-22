import React, { useState, useReducer } from "react";
import styles from "./FlightResultsHeader.module.scss";
import HeaderTicket from "./HeaderTicket/HeaderTicket";
import HeaderTop from "./HeaderTop/HeaderTop";
import { SearchForm } from "../../SearchFlightForm/SearchFlightForm";
import Header from "../../HomePage/Header/Header";

const headerTopProps = {
  from: "Кишинёв (KIV)",
  to: "Лондон (LON)",
  nrPassengers: 1,
  flightType: "эконом",
};

function headerReducer(state, action) {
  switch (action.type) {
    case "switchToSearchForm": {
      return {
        ...state,
        renderSearchForm: true,
      };
    }
    case "swithToResults": {
      return {
        ...state,
        renderSearchForm: false,
      };
    }
  }
}
const initialState = {
  renderSearchForm: false,
};

export default function FlightResultsHeader({ t }) {
  const [state, dispatch] = useReducer(headerReducer, initialState);
  const { renderSearchForm } = state;

  const swithToSearchForm = () => {
    dispatch({ type: "switchToSearchForm" });
  };
  const switchToResults = () => {
    dispatch({ type: "swithToResults" });
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
            <HeaderTicket type='Самый дешевый' price='120$' />
            <HeaderTicket type='Самый быстрый' price='200$' />
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
