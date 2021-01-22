import React, { useState } from "react";
import styles from "./FlightTicket.module.scss";
import OneWayTicket from "./OneWayTicket/OneWayTicket";
import TicketDetails from "./TicketDetails/TicketDetails";
import stylesTD from "./TicketDetails/TicketDetails.module.scss";
import stylesOWT from "./OneWayTicket/OneWayTicket.module.scss";

import { redLogo, airMoldovaLogo, wizzAirLogo, arrowDownSvg } from "./logos";

const data = [
  {
    airport: "KIV",
    dateTime: "09:30",
    city: "Кишинев",
  },
  {
    airport: "IST",
    dateTime: "11:00",
    city: "Стамбул",
  },
];
// logo, from, to, transfer, flight
const logo = redLogo;
const from = {
  dateTime: data[0].dateTime,
  airport: data[0].airport,
  city: data[0].city,
};
const to = {
  dateTime: data[1].dateTime,
  airport: data[1].airport,
  city: data[1].city,
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

export default function FlightTicket({
  id,
  type,
  alreadyBooked,
  bookedNrPassengers,
  bookedInsuranceType,
}) {
  const [renderedTicketDetails, setRenderedTicketDetails] = useState(false);
  const showDetails = (id) => {
    setRenderedTicketDetails(true);
  };
  const unmountTicketDetails = () => {
    setRenderedTicketDetails(false);
  };

  const oneWayTicket = (
    <>
      <div onClick={() => showDetails(id)} className={styles.ticketContainer}>
        <div>
          <OneWayTicket id={id} showDetails={showDetails} data={data} />
        </div>
      </div>
      {renderedTicketDetails ? (
        <TicketDetails
          alreadyBooked={alreadyBooked}
          bookedNrPassengers={bookedNrPassengers}
          bookedInsuranceType={bookedInsuranceType}
          id={id}
          logo={logo}
          from={from}
          to={to}
          transfer={transfer}
          flight={flight}
          unmountTicketDetails={unmountTicketDetails}
          type={type}
        />
      ) : null}
    </>
  );

  const twoWayTicket = (
    <>
      <div onClick={() => showDetails(id)} className={styles.ticketContainer}>
        <div>
          <OneWayTicket
            visibilityClass='visibilityHidden'
            // showDetails={showDetails}
            data={data}
          />
          <div className={styles.timeBetweenFlights}>
            <span>Туда-обратно</span>
            <span>
              249<span>$</span>
            </span>
          </div>
          <OneWayTicket
            visibilityClass='visibilityHidden'
            // showDetails={showDetails}
            data={data}
          />
        </div>
      </div>
      {renderedTicketDetails ? (
        <TicketDetails
          id={id}
          logo={logo}
          from={from}
          to={to}
          transfer={transfer}
          flight={flight}
          alreadyBooked={alreadyBooked}
          bookedNrPassengers={bookedNrPassengers}
          bookedInsuranceType={bookedInsuranceType}
          unmountTicketDetails={unmountTicketDetails}
          type={type}
        />
      ) : null}
    </>
  );
  return (
    <div className={styles.ticketContainer}>
      {type === "oneWay" ? oneWayTicket : twoWayTicket}
    </div>
  );
}
