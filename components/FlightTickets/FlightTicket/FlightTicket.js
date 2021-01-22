import React from "react";
import styles from "./FlightTicket.module.scss";
import OneWayTicket from "./OneWayTicket/OneWayTicket";
import TicketDetails from "./TicketDetails/TicketDetails";
import stylesTD from "./TicketDetails/TicketDetails.module.scss";
import stylesOWT from "./OneWayTicket/OneWayTicket.module.scss";

import { redLogo, airMoldovaLogo, wizzAirLogo, arrowDownSvg } from "./logos";

const data = [
  {
    airport: "KIV",
    dateTime: "10 Авг — 09:30",
    city: "Кишинев",
  },
  {
    airport: "IST",
    dateTime: "10 Авг — 11:00",
    city: "Стамбул",
  },
];
// logo, from, to, transfer, flight
const logo = redLogo;
const from = {
  dateTime: data[0].dateTime,
  airport: data[0].airport,
};
const to = {
  dateTime: data[1].dateTime,
  airport: data[1].airport,
};

const transfer = {
  location: "Стамбул, Турция",
  aboutInfo: [
    "Аэропорты прилета и вылета разные",
    "Необходимо повторно зарегистрировать багаж ",
    "Трансфер защищен гарантией iFly",
  ],
  duration: "12 ч 30 мин",
};
const flight = {
  fromTo: `${data[0].city} - ${data[1].city}`,
  flight: "Рейс TK 272",
};

export default function FlightTicket({ id, type, alreadyBooked }) {
  const showDetails = (id) => {
    const ticketDetails = document.querySelector(`#${id}`);

    // TODO: use querySelectorAll -- is being selected only the first child
    const oneWayTicket = document.querySelector(
      `.${stylesOWT.oneWayTicketContainer}`
    );

    if (ticketDetails.style.maxHeight !== "5000px") {
      ticketDetails.style.maxHeight = "5000px";
      ticketDetails.style.opacity = "1";
      // ticketDetails.style.display = "flex";
      oneWayTicket.style.borderRadius = "6px 6px 0 0 ";
    } else {
      ticketDetails.style.maxHeight = "0";
      ticketDetails.style.opacity = "0";
      // ticketDetails.style.opacity = "none";
      oneWayTicket.style.borderRadius = "6px 6px 6px 6px ";
    }
  };

  const oneWayTicket = (
    <div
      className={
        alreadyBooked
          ? `${styles.ticketContainer} ${styles.ticketContainerAlreadyBooked}`
          : `${styles.ticketContainer}`
      }
    >
      <div>
        <OneWayTicket
          alreadyBooked={alreadyBooked}
          id={id}
          showDetails={showDetails}
          data={data}
        />
      </div>
      <TicketDetails
        alreadyBooked={alreadyBooked}
        id={id}
        logo={logo}
        from={from}
        to={to}
        transfer={transfer}
        flight={flight}
      />
    </div>
  );

  const twoWayTicket = (
    <div
      className={
        alreadyBooked
          ? `${styles.ticketContainer} ${styles.ticketContainerAlreadyBooked}`
          : `${styles.ticketContainer}`
      }
    >
      <div>
        <OneWayTicket
          alreadyBooked={alreadyBooked}
          visibilityClass='visibilityHidden'
          // showDetails={showDetails}
          data={data}
        />
        <div className={styles.timeBetweenFlights}>
          <div>
            <span></span>
            <span>9 дней в г. Стамбул</span>
            <span></span>
          </div>
          <div>
            <span>
              249<span>$</span>
            </span>
            <span className={styles.arrowDown} onClick={() => showDetails(id)}>
              {arrowDownSvg}
            </span>
          </div>
        </div>
        <OneWayTicket
          alreadyBooked={alreadyBooked}
          visibilityClass='visibilityHidden'
          // showDetails={showDetails}
          data={data}
        />
      </div>
      <TicketDetails
        id={id}
        logo={logo}
        from={from}
        to={to}
        transfer={transfer}
        flight={flight}
        alreadyBooked={alreadyBooked}
      />
    </div>
  );
  return (
    <div
      className={
        alreadyBooked
          ? `${styles.ticketContainer} ${styles.ticketContainerAlreadyBooked}`
          : `${styles.ticketContainer}`
      }
    >
      {type === "oneWay" ? oneWayTicket : twoWayTicket}
    </div>
  );
}
