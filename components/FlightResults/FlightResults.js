import React, { useState, useEffect } from "react";
import styles from "./FlightResults.module.scss";
import FlightResultsHeader from "./FlightResultsHeader/FlightResultsHeader";
import Filters from "./Filters/Filters";
import MainHeader from "./MainHeader/MainHeader";
import MainTicket from "./MainTicket/MainTicket";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../FlightTickets/FlightTicket/logos";

export const ticketProps = {
  logos: [wizzAirLogo, airMoldovaLogo],
  departureInfo: {
    time: "12:55",
    airportCode: "KIV",
  },
  arrivalInfo: {
    time: "07:50",
    airportCode: "STN",
  },
  totalDuration: "44ч 55м",
  transferInfo: {
    count: 2,
    totalTransferDuration: "38ч 20м",
    transfers: [
      {
        duration: "28ч 00м",
        name: "Вена, Швехат VIE",
      },
      {
        duration: "10ч 20м",
        name: "Дортмунд, Дортмунд DTM",
      },
    ],
  },
};

export default function FlightResults({ t }) {
  const [dummyData, setDummyData] = useState([]);
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      dummyData.push("dummy");
    }
    setDummyData(dummyData);
  }, []);
  return (
    <div className={styles.container}>
      <FlightResultsHeader t={t} />
      <Filters mainWrapperAnimationClass={styles.mainWrapperAnimationClass} />
      <div
        id='mainWrapperId'
        className={`${styles.mainWrapper} ${styles.mainWrapperAnimationClass}`}
      >
        <MainHeader from='Кишинёв' to='Лондон' date='25 декабря, пятница' />

        {dummyData.map((item, index) => {
          return (
            <MainTicket
              key={index}
              ticketProps={ticketProps}
              showPrice={true}
              id={`mt${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
