import React from "react";
import styles from "./TicketDetails.module.scss";
import { baggageType1Svg, baggageType2Svg } from "./svg";
import { useRouter } from "next/router";
export default function TicketDetails({
  id,
  logo,
  from,
  to,
  transfer,
  flight,
  alreadyBooked,
}) {
  return (
    <section
      id={`${id}`}
      className={
        alreadyBooked
          ? `${styles.ticketDetailsContainer} ${styles.ticketDetailsContainerAlreadyBooked}`
          : `${styles.ticketDetailsContainer}`
      }
    >
      <OneWayTicketDetails
        logo={logo}
        from={from}
        to={to}
        transfer={transfer}
        flight={flight}
        alreadyBooked={alreadyBooked}
      />
      {transfer && (
        <TransferDetails
          location={transfer.location}
          aboutInfo={transfer.aboutInfo}
          duration={transfer.duration}
          alreadyBooked={alreadyBooked}
        />
      )}
      <OneWayTicketDetails
        logo={logo}
        from={from}
        to={to}
        transfer={transfer}
        flight={flight}
        alreadyBooked={alreadyBooked}
      />

      <BookTicket alreadyBooked={alreadyBooked} />
    </section>
  );
}

const OneWayTicketDetails = ({
  logo,
  from,
  to,
  transfer,
  flight,
  alreadyBooked,
}) => {
  const flightDuration = "1 ч 30 мин";
  return (
    <div
      className={
        alreadyBooked
          ? `${styles.oneWayTicketDetailsContainer} ${styles.oneWayTicketDetailsContainerAlreadyBooked}`
          : `${styles.oneWayTicketDetailsContainer}`
      }
    >
      <div className={styles.logo}>{logo}</div>
      <div className={styles.departure}>
        <div>{from.dateTime}</div>
        <div>{from.airport}</div>
      </div>
      <div className={styles.fromToLocations}>
        <div>{flight.fromTo}</div>
        <div>{flight.flight}</div>
      </div>
      <div className={styles.arrival}>
        <div>{to.dateTime}</div>
        <div>{to.airport}</div>
      </div>
      <div className={styles.flightDuration}>{flightDuration}</div>
      <div className={styles.baggageTypes}>
        <span>{baggageType1Svg}</span>
        <span>{baggageType2Svg}</span>
      </div>
    </div>
  );
};

const TransferDetails = ({ location, aboutInfo, duration, alreadyBooked }) => {
  return (
    <div
      className={
        alreadyBooked
          ? `${styles.transferDetailsContainer} ${styles.transferDetailsContainerAlreadyBooked}`
          : `${styles.transferDetailsContainer}`
      }
    >
      <div>
        <span>Пересадка</span>
        <span className={styles.dot}> • </span>
        <span>{location}</span>
        <span className={styles.dot}> • </span>
        <span>{aboutInfo[0]}</span>
        <span className={styles.dot}> • </span>
        <span>{aboutInfo[1]}</span>
      </div>
      <div className={styles.transferDuration}>{duration}</div>
    </div>
  );
};

const BookTicket = ({ alreadyBooked }) => {
  const router = useRouter();
  const toBookingPage = () => {
    router.push("/booking");
  };
  return (
    <div
      onClick={toBookingPage}
      style={alreadyBooked ? { visibility: "hidden" } : {}}
      className={styles.bookTicketContainer}
    >
      Забронировать 249$
    </div>
  );
};
