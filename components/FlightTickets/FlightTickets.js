import React from "react";
import styles from "./FlightTickets.module.scss";
import FlightTicket from "./FlightTicket/FlightTicket";

export default function FlightTickets() {
  return (
    <section className={styles.container}>
      <FlightTicket id='ft1' type='oneWay' />
      <FlightTicket id='ft2' type='oneWay' />
      <FlightTicket id='ft3' type='twoWay' />
      <FlightTicket id='ft4' type='oneWay' />
      <FlightTicket id='ft5' type='oneWay' />
    </section>
  );
}
