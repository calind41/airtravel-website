import React, { useState, useEffect } from "react";
import styles from "./MainTicket.module.scss";
import Ticket from "../Ticket/Ticket";
import TicketPrice from "./TicketPrice/TicketPrice";
import TicketDetails from "./TicketDetails/TicketDetails";
import { arrowIcon } from "../Filters/Filters";

export default function MainTicket({
  passRenderTicketModal,
  isActiveSection1,
  isActiveSection2,
  id,
  ticketProps,
  showPrice,
}) {
  const [renderTicketDetails, setRenderTicketDetails] = useState(false);
  const [animateClass, setAnimateClass] = useState("slideDown");

  // used to align tickets from section1 with left header ticket
  const [leftValue, setLeftValue] = useState(null);
  useEffect(() => {
    const leftHeaderTicket = document.querySelector("#ht1");
    if (leftHeaderTicket) {
      setLeftValue(leftHeaderTicket.getBoundingClientRect().left);
    }
    const handleResize = () => {
      const value = document.querySelector("#ht1").getBoundingClientRect().left;
      setLeftValue(value);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const selectedTicket = document.querySelector(
      `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
    );
    if (!selectedTicket.classList.contains(styles.selectedTicketSectionOne))
      return;
    if (isActiveSection1) {
      selectedTicket.classList.add(styles.zIndexLow);
      selectedTicket.classList.remove(styles.zIndexHigh);
    } else {
      selectedTicket.classList.remove(styles.zIndexLow);
      selectedTicket.classList.add(styles.zIndexHigh);
    }
  }, [isActiveSection1]);

  const toggleTicketDetails = () => {
    const arrowIcon = document.querySelector(`#${id} svg`);
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
    // do not open modal for tickets in section 1
    if (id.slice(0, 4) === "mtw1") return;
    if (evt.target.classList.contains(styles.arrowIcon)) return;
    if (
      evt.target.id === `td_details` ||
      evt.target.tagName.toLowerCase() === "svg" ||
      evt.target.tagName.toLowerCase() === "circle" ||
      evt.target.tagName.toLowerCase() === "defs" ||
      evt.target.tagName.toLowerCase() === "pattern" ||
      evt.target.tagName.toLowerCase() === "image" ||
      evt.target.tagName.toLowerCase() === "g" ||
      evt.target.tagName.toLowerCase() === "path"
    )
      return;
    // if not in modal already
    if (showPrice) {
      passRenderTicketModal(true);
    }
    document.querySelector("html").style.overflow = "hidden";
    document.querySelector("html").style.height = "100vh";
  };

  let wrapperStyles = {};
  if (
    (id.slice(0, 4) === "mtw2" && !isActiveSection2) ||
    (id.slice(0, 4) === "mtw1" && !isActiveSection1)
  ) {
    wrapperStyles = { overflow: "hidden", pointerEvents: "none" };
  }

  const onMouseOverWrapperHandler = () => {
    document.querySelector(`#mainTicketWrapperId${id}`).style.overflow =
      "visible";
    document.querySelector(
      `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
    ).style.backgroundColor = "#f5f5f6";
  };

  const onMouseLeaveWrapperHandler = () => {
    document.querySelector(
      `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
    ).style.backgroundColor = "#fff";
    // if not in modal
    if (showPrice)
      document.querySelector(`#mainTicketWrapperId${id}`).style.overflow =
        "hidden";
  };

  const onClickWrapperHandler = (evt) => {
    if (evt.target.classList.contains(styles.arrowIcon)) return;
    if (id.slice(0, 4) === "mtw1") {
      const allItems = document.querySelectorAll(
        `.${styles.wrapper} .${styles.mainTicketWrapper}`
      );
      const selectedElem = document.querySelector(
        `#mainTicketWrapperId${id} .${styles.mainTicketWrapper}`
      );

      // delete previous selected ones
      allItems.forEach((item, idx) => {
        item.classList.remove(styles.selectedTicketSectionOne);
        item.classList.remove(styles.zIndexHigh);
        item.classList.remove(styles.zIndexLow);
      });

      // select current one
      selectedElem.classList.add(styles.selectedTicketSectionOne);
      selectedElem.classList.add(styles.zIndexHigh);
    } else {
      if (
        evt.target.id === `td_details` ||
        evt.target.tagName.toLowerCase() === "svg" ||
        evt.target.tagName.toLowerCase() === "circle" ||
        evt.target.tagName.toLowerCase() === "defs" ||
        evt.target.tagName.toLowerCase() === "pattern" ||
        evt.target.tagName.toLowerCase() === "image" ||
        evt.target.tagName.toLowerCase() === "g" ||
        evt.target.tagName.toLowerCase() === "path"
      )
        return;
      openModal(evt);
    }
  };
  return (
    <div
      onClick={(evt) => onClickWrapperHandler(evt)}
      style={wrapperStyles}
      onMouseOver={onMouseOverWrapperHandler}
      onMouseLeave={onMouseLeaveWrapperHandler}
      id={`mainTicketWrapperId${id}`}
      className={
        isActiveSection2
          ? `${styles.wrapper} ${styles.wrapperTicketSection2}`
          : `${styles.wrapper} `
      }
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
          style={
            showPrice === false
              ? { width: "82%", marginLeft: 0 }
              : leftValue && id.slice(0, 4) === "mtw1"
              ? { left: leftValue + "px" }
              : {}
          }
          className={styles.container}
        >
          <Ticket
            id={id}
            middleWidth={showPrice ? "500px" : "250px"}
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
          identifier='details'
          inModal={!showPrice}
          animateClass={animateClass}
          isActiveSection2={isActiveSection2}
          {...ticketProps}
          section1={id.slice(0, 4) === "mtw1"}
        />
      ) : null}
    </div>
  );
}
