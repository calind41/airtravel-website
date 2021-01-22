import React, { useState, useEffect } from "react";
import styles from "./MainTicket.module.scss";
import Ticket from "../Ticket/Ticket";
import TicketPrice from "./TicketPrice/TicketPrice";
import TicketDetails from "./TicketDetails/TicketDetails";
import TicketModal from "../TicketModal/TicketModal";
import { dom } from "../../../helpers/reuse";

import { arrowIcon } from "../Filters/Filters";

export default function MainTicket({ id, ticketProps, showPrice }) {
  const transfer = true;
  const [renderTicketDetails, setRenderTicketDetails] = useState(false);
  const [renderTicketModal, setRenderTicketModal] = useState(false);
  const [animateClass, setAnimateClass] = useState("slideDown");

  const toggleTicketDetails = () => {
    const arrowIcon = dom(`#${id} svg`);
    if (renderTicketDetails) {
      setAnimateClass("slideUp");
      setTimeout(() => {
        setRenderTicketDetails(false);
      }, 200);
      arrowIcon.classList.add(styles.rotate0deg);
      arrowIcon.classList.remove(styles.rotate180deg);
    } else {
      setAnimateClass("slideDown");
      setRenderTicketDetails(true);
      arrowIcon.classList.remove(styles.rotate0deg);
      arrowIcon.classList.add(styles.rotate180deg);
    }
  };
  const openModal = (evt) => {
    const returnCond1 = localStorage.getItem("isOpenSettings") === "true";
    const returnCond2 = evt.target.classList.contains(styles.arrowIcon);
    if (returnCond1) return;
    if (returnCond2) return;
    // if not in modal already
    if (showPrice) setRenderTicketModal(true);
    dom("html").style.overflow = "hidden";
    dom("html").style.height = "100vh";
  };

  const onMouseOverWrapperHandler = () => {
    dom(`#mainTicketWrapperId${id}`).style.overflow = "visible";
    dom(
      `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
    ).style.backgroundColor = "#f5f5f6";
  };

  const onMouseLeaveWrapperHandler = () => {
    dom(
      `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
    ).style.backgroundColor = "#fff";
    // if not in modal
    if (showPrice) dom(`#mainTicketWrapperId${id}`).style.overflow = "hidden";
  };

  return (
    <div
      onMouseOver={onMouseOverWrapperHandler}
      onMouseLeave={onMouseLeaveWrapperHandler}
      id={`mainTicketWrapperId${id}`}
      className={`${styles.wrapper} `}
    >
      <div
        onClick={(evt) => openModal(evt)}
        className={
          showPrice === false
            ? `${styles.mainTicketWrapperInModal} ${styles.mainTicketWrapper}`
            : `${styles.mainTicketWrapper}`
        }
      >
        <div
          style={showPrice === false ? { width: "82%", marginLeft: 0 } : {}}
          className={styles.container}
        >
          <Ticket
            id={id}
            middleWidth={showPrice ? "516px" : "250px"}
            middleClassName={
              showPrice ? "middleMainTickets" : "middleModalTickets"
            }
            middleWrapperClassName={
              showPrice
                ? "middleWrapperMainTickets"
                : "middleWrapperModalTickets"
            }
            {...ticketProps}
            inModal={!showPrice}
          />
          {showPrice ? <TicketPrice /> : null}
          <div
            id={id}
            onClick={toggleTicketDetails}
            className={
              showPrice === false
                ? `${styles.arrowIconInModal} ${styles.arrowIcon}`
                : `${styles.arrowIcon}`
            }
          >
            {arrowIcon}
          </div>
        </div>
      </div>
      {renderTicketDetails ? (
        <TicketDetails
          inModal={!showPrice}
          animateClass={animateClass}
          {...ticketProps}
        />
      ) : null}
      {renderTicketModal ? (
        <TicketModal
          from='Кишинёв'
          to='Лондон'
          date='19 января, вторник'
          unmountModal={() => setRenderTicketModal(false)}
        />
      ) : null}
    </div>
  );
}
