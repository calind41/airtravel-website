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
import { dom } from "../../helpers/reuse";

export const ticketProps = {
  logos: [wizzAirLogo, airMoldovaLogo, airMoldovaLogo],
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

export default function FlightResults_M({ t }) {
  const [dummyData, setDummyData] = useState(null);
  const [filtersPositionRelative, setFiltersPositionRelative] = useState(false);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 10; i++) {
      temp.push("dummy");
    }
    setDummyData(temp);

    const scrollHandler = () => {
      const container = dom(`.${styles.container}`);
      if (window.outerHeight - container.getBoundingClientRect().bottom > 55) {
        // reached end of container
        // set filters to position relative;
        setFiltersPositionRelative(true);
      } else {
        // set filters to position fixed
        setFiltersPositionRelative(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <FlightResultsHeader t={t} />
        <div
          id='mainWrapperId'
          className={`${styles.mainWrapper} ${styles.mainWrapperAnimationClass}`}
        >
          <MainHeader from='Кишинёв' to='Лондон' date='25 декабря, пятница' />
          <div className={styles.tickets}>
            {dummyData &&
              dummyData.map((item, index) => {
                return (
                  <MainTicket
                    key={index}
                    ticketProps={ticketProps}
                    id={`mt${index + 1}`}
                    baggage={index % 2 === 0 ? true : false}
                  />
                );
              })}
          </div>
          <Filters
            positionRelativeClass={
              filtersPositionRelative ? "positionRelativeClass" : ""
            }
            mainWrapperAnimationClass={styles.mainWrapperAnimationClass}
          />
        </div>
      </div>
    </>
  );
}
