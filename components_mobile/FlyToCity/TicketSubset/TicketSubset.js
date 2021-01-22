import React, { useState, useEffect } from "react";
import styles from "./TicketSubset.module.scss";
import FlightTicket from "../../FlightTickets/FlightTicket/FlightTicket";

import { i18n } from "../../../i18n";

export default function TicketSubset({ location }) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`ticketSubset:${key}`);
  };

  const [selectedOption, setSelectedOption] = useState("cheap");
  useEffect(() => {
    const filterOptions = document.querySelectorAll(
      `.${styles.filterContainer} > div`
    );

    filterOptions.forEach((option) =>
      option.addEventListener("click", (evt) => handleOptionClick(evt))
    );
    const handleOptionClick = (evt) => {
      filterOptions.forEach((opt) =>
        opt.classList.remove(styles.selectedFilter)
      );
      evt.target.classList.add(styles.selectedFilter);
    };
  }, []);
  return (
    <section className={styles.ticketSubsetContainer}>
      <div className={styles.heading}>
        {location === "inAboutCity" ? (
          <span>{getLanguageSpecificContent("header1")} Venetia</span>
        ) : (
          <>
            <span className={styles.city}>Рим:</span>
            <span>{getLanguageSpecificContent("header2")}</span>
          </>
        )}
      </div>
      <div className={styles.filterContainer}>
        <div data-name='fast' className={styles.fast}>
          {getLanguageSpecificContent("fast")}
        </div>
        <div
          data-name='cheap'
          className={`${styles.selectedFilter} ${styles.cheap}`}
        >
          {getLanguageSpecificContent("cheap")}
        </div>
      </div>
      <div className={styles.tickets}>
        <FlightTicket id='ft1' type='oneWay' />
        <FlightTicket id='ft2' type='oneWay' />
        <FlightTicket id='ft3' type='oneWay' />
        <FlightTicket id='ft4' type='oneWay' />
      </div>
    </section>
  );
}
