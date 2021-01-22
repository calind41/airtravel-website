import React, { useState, useEffect } from "react";
import styles from "./MainTicket.module.scss";
import Ticket from "../Ticket/Ticket";
import TicketDetailsModal from "./TicketDetailsModal/TicketDetailsModal";
import BookingModal from "../BookingModal/BookingModal";

export default function MainTicket({
  selectedTicketId,
  openTicketDetailsModal,
  id,
  baggage,
  ticketProps,
}) {
  const [renderTicketDetails, setRenderTicketDetails] = useState(false);
  const [animateClass, setAnimateClass] = useState("slideDown");
  const [renderTicketModal, setRenderTicketModal] = useState(false);
  const [renderTicketDetailsModal, setRenderTicketDetailsModal] = useState(
    false
  );
  const [renderBookingModal, setRenderBookingModal] = useState(false);
  const openModal = (evt) => {
    // if (evt.target.classList.contains(styles.arrowIcon)) return;
    // // if not in modal already
    // setRenderTicketModal(true);
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
        // onClick={(evt) => openModal(evt)}
        onClick={() => openTicketDetailsModal(id, id === selectedTicketId)}
        className={
          id === selectedTicketId
            ? `${styles.mainTicketWrapper} ${styles.selectedMainTicketWrapper}`
            : `${styles.mainTicketWrapper}`
        }
      >
        <Ticket id={id} {...ticketProps} baggage={baggage} />
      </div>
      {/* {renderTicketDetailsModal ? (
        <TicketDetailsModal
          renderBookingModal={() => setRenderBookingModal(true)}
          unmountModal={unmountTicketDetailsModal}
        />
      ) : null}
      {renderBookingModal ? (
        <BookingModal unmountModal={() => setRenderBookingModal(false)} />
      ) : null} */}
    </>
  );
}
