import React from "react";
import styles from "./OneWayTicket.module.scss";
import { redLogo, airMoldovaLogo, wizzAirLogo, arrowDownSvg } from "../logos";

export default function OneWayTicket({
  visibilityClass,
  data,
  showDetails,
  id,
}) {
  return (
    <div className={styles.oneWayTicketContainer}>
      <div className={styles.departureWrapper}>
        <AirCompaniesAvailable logos={[redLogo, airMoldovaLogo, wizzAirLogo]} />
        <FlightLocation flightLocationData={data[0]} />
      </div>

      <div className={styles.durationTransferWrapper}>
        <div className={styles.departureDate}>Пн 18 Авг.</div>
        <Button text='1 ч 30 мин' />
        <Button text='Без пересадок' />
      </div>
      <div className={styles.arrivalWrapper}>
        <div className={`${styles.price} ${styles[visibilityClass]}`}>
          249<span>$</span>
        </div>
        <FlightLocation flightLocationData={data[1]} />
      </div>
    </div>
  );
}

const AirCompaniesAvailable = ({ logos }) => {
  let newLogoSet = [];

  if (logos.length > 3) {
    newLogoSet = [logos.slice(0, 2), logos.length - 3];
  } else {
    newLogoSet = [...logos];
  }
  return (
    <div
      style={
        logos.length === 3
          ? { height: "80px" }
          : logos.length === 2
          ? { height: "57px" }
          : { height: "auto" }
      }
      className={styles.airCLogosContainer}
    >
      {newLogoSet.map((logo, idx) => {
        if (logo === logos.length - 3) {
          return (
            <div key={idx} className={styles.manyMore}>
              {logo}
            </div>
          );
        } else {
          return <div key={idx}>{logo}</div>;
        }
      })}
    </div>
  );
};

const FlightLocation = ({ flightLocationData }) => {
  return (
    <div className={styles.flightLocDataC}>
      <div className={styles.airport}>{flightLocationData.airport}</div>
      <div className={styles.dateTime}>{flightLocationData.dateTime}</div>
      {/* <div className={styles.city}>{flightLocationData.city}</div> */}
    </div>
  );
};

const Button = ({ text }) => {
  return <div className={styles.btn}>{text}</div>;
};
