import React, { useState } from "react";
import styles from "./HeaderTicket.module.scss";
import Ticket from "../../Ticket/Ticket";
// import TicketModal from "../../TicketModal/TicketModal";
import BookingModal from "../../BookingModal/BookingModal";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../../../../FlightTickets/FlightTicket/logos";

const ticketProps = {
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
        code: "VIE",
      },
      {
        duration: "10ч 20м",
        name: "Дортмунд, Дортмунд DTM",
        code: "DTM",
      },
    ],
  },
};

export default function HeaderTicket({ type, price }) {
  // const [renderTicketModal, setRenderTicketModal] = useState(false);
  const [renderBookingModal, setRenderBookingModal] = useState(false);
  // const openTicketModal = () => {
  //   setRenderTicketModal(true);
  //   document.querySelector("html").style.overflow = "hidden";
  //   document.querySelector("html").style.height = "100vh";
  // };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.ticketPositionContainer}>
          <Ticket headerTicket={type} {...ticketProps} />
        </div>
        <div className={styles.bottomContainer}>
          <div
            onClick={() => setRenderBookingModal(true)}
            className={styles.btn}
          >
            Выбрать за {price}
          </div>
        </div>
      </div>
      {/* {renderTicketModal ? (
        <TicketModal
          from='Кишинёв'
          to='Лондон'
          date='19 января, вторник'
          unmountModal={() => setRenderTicketModal(false)}
        />
      ) : null} */}
      {renderBookingModal ? (
        <BookingModal
          headerTicket={true}
          unmountModal={() => setRenderBookingModal(false)}
        />
      ) : null}
    </>
  );
}
