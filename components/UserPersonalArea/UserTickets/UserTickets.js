import React, { useState } from "react";
import NoTickets from "./NoTickets/NoTickets";
import styles from "./UserTickets.module.scss";
import FlightTicket from "../../FlightTickets/FlightTicket/FlightTicket";
import AboutTicket from "./AboutTicket/AboutTicket";

import stylesFT from "../../FlightTickets/FlightTicket/FlightTicket.module.scss";
import stylesOWT from "../../FlightTickets/FlightTicket/OneWayTicket/OneWayTicket.module.scss";

import { i18n } from "../../../i18n";

export default function UserTickets({ t, toggleTabs }) {
  const getLanguageSpecificContent = (key) => {
    return t(`personalRoom:${key}`);
  };
  const [isTicketClicked, setIsTicketClicked] = useState(false);
  const showBookingNr = (evt) => {
    const target = evt.target;
    const containsArrowDownClass =
      target.classList.contains(stylesFT.arrowDown) ||
      target.classList.contains(stylesOWT.arrowDown) ||
      (target.parentNode &&
        target.parentNode.classList.contains(stylesFT.arrowDown)) ||
      target.tagName === "path" ||
      (target.parentNode &&
        target.parentNode.classList.contains(stylesOWT.arrowDown));

    if (containsArrowDownClass) {
      return;
    } else {
      // alert("clicccked");
      toggleTabs();
      setIsTicketClicked(true);
    }
  };
  const goBackToMyTickets = () => {
    setIsTicketClicked(false);
    toggleTabs();
  };
  return (
    <section className={styles.container}>
      {isTicketClicked ? (
        <div className={styles.clickedTicketContainer}>
          <header className={styles.toMyTicketsHeader}>
            <span onClick={goBackToMyTickets}>{goBackSvg}</span>
            <span>{getLanguageSpecificContent("UserTickets-title")}</span>
          </header>
          <div className={styles.ticketContainer}>
            <div onClick={(evt) => showBookingNr(evt)}>
              <FlightTicket alreadyBooked={true} id='ft1' type='oneWay' />
            </div>
            <AboutTicket
              nrPassengers='3'
              totalPrice='747'
              hasInsurance={false}
            />
          </div>
          <BookingNr getLanguageSpecificContent={getLanguageSpecificContent} />
        </div>
      ) : (
        <>
          <div className={styles.ticketContainer}>
            <div onClick={(evt) => showBookingNr(evt)}>
              <FlightTicket alreadyBooked={true} id='ft1' type='oneWay' />
            </div>
            <AboutTicket
              nrPassengers='3'
              totalPrice='747'
              hasInsurance={false}
            />
          </div>
          <div className={styles.ticketContainer}>
            <div onClick={(evt) => showBookingNr(evt)}>
              <FlightTicket alreadyBooked={true} id='ft2' type='oneWay' />
            </div>
            <AboutTicket
              nrPassengers='3'
              totalPrice='747'
              hasInsurance={true}
              insurancePrice='58'
            />
          </div>
          <div className={styles.ticketContainer}>
            <div onClick={(evt) => showBookingNr(evt)}>
              <FlightTicket alreadyBooked={true} id='ft3' type='twoWay' />
            </div>
            <AboutTicket
              nrPassengers='3'
              totalPrice='747'
              hasInsurance={true}
              insurancePrice='58'
            />
          </div>
        </>
      )}
      {/* <NoTickets /> */}
    </section>
  );
}

function BookingNr({ getLanguageSpecificContent }) {
  return (
    <div className={styles.bookingNrContainer}>
      <div className={styles.bnCard}>
        <div>{getLanguageSpecificContent("BookingNr-title")}</div>
        <div className={styles.bookingNr}>12392139123</div>
      </div>
    </div>
  );
}

const goBackSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='34'
    height='34'
    viewBox='0 0 34 34'
  >
    <g id='ic_gobacktickets' transform='translate(34) rotate(90)'>
      <rect
        id='Rectangle_190'
        data-name='Rectangle 190'
        width='34'
        height='34'
        rx='17'
        fill='#e4e6eb'
      />
      <path
        id='Path_1'
        data-name='Path 1'
        d='M389,2305.935l5,4,5-4'
        transform='translate(-377 -2290.935)'
        fill='none'
        stroke='#787b82'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
    </g>
  </svg>
);
