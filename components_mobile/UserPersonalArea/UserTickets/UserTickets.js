import React, { useState } from "react";
import NoTickets from "./NoTickets/NoTickets";
import styles from "./UserTickets.module.scss";
import FlightTicket from "../../FlightTickets/FlightTicket/FlightTicket";

import stylesFT from "../../FlightTickets/FlightTicket/FlightTicket.module.scss";
import stylesOWT from "../../FlightTickets/FlightTicket/OneWayTicket/OneWayTicket.module.scss";

export default function UserTickets({ toggleTabs }) {
  return (
    <section className={styles.container}>
      <div className={styles.ticketContainer}>
        <FlightTicket
          bookedNrPassengers={3}
          bookedInsuranceType={"без страховки"}
          alreadyBooked={true}
          id='ft1'
          type='oneWay'
        />
      </div>
      <div className={styles.ticketContainer}>
        <FlightTicket
          alreadyBooked={true}
          id='ft2'
          type='oneWay'
          bookedNrPassengers={3}
          bookedInsuranceType={"без страховки"}
        />
      </div>
      <div className={styles.ticketContainer}>
        <FlightTicket
          alreadyBooked={true}
          id='ft3'
          type='twoWay'
          bookedNrPassengers={3}
          bookedInsuranceType={"без страховки"}
        />
      </div>

      {/* <NoTickets /> */}
    </section>
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
        stroke-linejoin='round'
        stroke-width='1.5'
      />
    </g>
  </svg>
);
