import React, { useState, useEffect } from "react";
import styles from "./MainTicket.module.scss";
import Ticket from "../Ticket/Ticket";
import TicketDetailsModal from "./TicketDetailsModal/TicketDetailsModal";
import BookingModal from "../BookingModal/BookingModal";

export default function MainTicket({ id, baggage, ticketProps }) {
  const [renderTicketDetailsModal, setRenderTicketDetailsModal] = useState(
    false
  );
  const [renderBookingModal, setRenderBookingModal] = useState(false);
  const openModal = (evt) => {
    setRenderTicketDetailsModal(true);
    document.querySelector("html").style.overflow = "hidden";
    document.querySelector("html").style.height = "100vh";
  };
  const unmountTicketDetailsModal = () => {
    setRenderTicketDetailsModal(false);
  };

  return (
    <>
      <div
        onClick={(evt) => openModal(evt)}
        className={`${styles.mainTicketWrapper}`}
      >
        <Ticket id={id} {...ticketProps} baggage={baggage} />
      </div>
      {renderTicketDetailsModal ? (
        <TicketDetailsModal
          renderBookingModal={() => setRenderBookingModal(true)}
          unmountModal={unmountTicketDetailsModal}
        />
      ) : null}
      {renderBookingModal ? (
        <BookingModal unmountModal={() => setRenderBookingModal(false)} />
      ) : null}
    </>
  );
}
