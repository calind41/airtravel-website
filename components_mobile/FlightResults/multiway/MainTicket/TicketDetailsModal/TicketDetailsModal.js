import React, { useState, useEffect } from "react";
import styles from "./TicketDetailsModal.module.scss";
import { closeLineIcon } from "../../Filters/SortByModal/SortByModal";
import { dom } from "../../../../../helpers/reuse";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../../../../FlightTickets/FlightTicket/logos";

export default function TicketDetailsModal({
  ticketDetailsId,
  openFromSection,
  unmountModal,
  renderBookingModal,
  inBookingModal,
  passChosenTicketFromSection1,
  passChosenTicketFromSection2,
}) {
  const [unmount, setUnmount] = useState(false);
  const [touchStartVal, setTouchStartVal] = useState();
  const [extended, setExtended] = useState(false);

  const handleTouchStart = (evt) => {
    setTouchStartVal(evt.touches[0].clientY);
  };
  const handleTouchMove = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) return;
    evt.preventDefault();

    const wrapper = dom(`.${styles.wrapper}`);
    let value = evt.touches[0].clientY;
    if (value <= 50) return;
    if (window.outerHeight - value <= 50) {
      return;
    }
    wrapper.style.transition = "top 0.3s ease";
    wrapper.style.top = value + "px";
  };
  const handleTouchEnd = (evt) => {
    const wrapper = dom(`.${styles.wrapper}`);
    const scrollDownAmount = window.outerHeight - parseInt(wrapper.style.top);
    const scrollableContainerHeight = dom(`.${styles.scrollableContainer}`)
      .style.height;

    if (
      scrollDownAmount <= 410 ||
      (scrollableContainerHeight !== "300px" && scrollDownAmount <= 595)
    ) {
      wrapper.style.top = "100%";
      wrapper.style.transition =
        "top 0.3s cubic-bezier(0.59, 0.18, 0.01, 1.05)";
      setTimeout(() => {
        unmountModal();
      }, 300);
      return;
    }
    if (scrollDownAmount > 482) {
      // extend modal
      wrapper.style.top = "5vh";
      setTimeout(() => {
        const h_bottom = dom(`.${styles.header}`).getBoundingClientRect()
          .bottom;
        let f_top;
        if (!inBookingModal) {
          f_top = dom(`.${styles.footer}`).getBoundingClientRect().top;
        } else {
          f_top = wrapper.getBoundingClientRect().bottom;
        }
        const newHeight = f_top - h_bottom;
        dom(`.${styles.scrollableContainer}`).style.height = newHeight + "px";
      }, 300);

      return;
    }

    wrapper.style.top = "calc(100% - 469px)";
    wrapper.style.transition = "top 0.3s ease";
  };

  useEffect(() => {
    const container = dom(`.${styles.container}`);
    const htmlEl = dom("html");
    htmlEl.style.overflow = "hidden";
    container.addEventListener("touchstart", handleTouchStart, false);

    container.addEventListener("touchmove", handleTouchMove, false);
    container.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      container.removeEventListener("touchmove", handleTouchMove, false);
      container.removeEventListener("touchend", handleTouchEnd, false);
      htmlEl.style.overflow = "visible";
    };
  }, []);

  const unmountHelper = () => {
    const wrapper = dom(`.${styles.wrapper}`);
    wrapper.style = {};
    setUnmount(true);
    //   close modal
    setTimeout(() => {
      unmountModal();
    }, 300);
  };

  const chooseTicket = () => {
    const v = localStorage.getItem("selectedTicketCount");

    if (openFromSection === "section1") {
      if (v === "0") {
        unmountHelper();
        passChosenTicketFromSection1(ticketDetailsId);
        localStorage.setItem("selectedTicketCount", 1);
        localStorage.setItem("tur", 1);
      } else if (v === "1" && localStorage.getItem("tur") === "0") {
        renderBookingModal();
        unmountHelper();
        localStorage.setItem("tur", 1);
        localStorage.setItem("selectedTicketCount", 2);
      } else if (v === "2") {
        renderBookingModal();
        unmountHelper();
      }
    } else {
      if (v === "0") {
        unmountHelper();
        passChosenTicketFromSection2(ticketDetailsId);
        localStorage.setItem("selectedTicketCount", 1);
        localStorage.setItem("retur", 1);
      } else if (v === "1" && localStorage.getItem("retur") === "0") {
        renderBookingModal();
        unmountHelper();
        localStorage.setItem("retur", 1);
        localStorage.setItem("selectedTicketCount", 2);
      } else if (v === "2") {
        renderBookingModal();
        unmountHelper();
      }
    }
    // if (openFromSection === "section1") {
    //   if (localStorage.getItem("selectedTicketCount") === "1") {
    //     renderBookingModal();
    //     unmountHelper();
    //     localStorage.setItem("selectedTicketCount", 2);
    //     return;
    //   }
    //   unmountHelper();
    //   passChosenTicketFromSection1(ticketDetailsId);
    //   localStorage.setItem(
    //     "selectedTicketCount",
    //     JSON.parse(localStorage.getItem("selectedTicketCount")) + 1
    //   );
    // } else {
    //   if (localStorage.getItem("selectedTicketCount") === "0") {
    //     console.log(" is zero");
    //     unmountHelper();
    //     passChosenTicketFromSection2(ticketDetailsId);
    //     localStorage.setItem("selectedTicketCount", 1);

    //     return;
    //   }
    //   renderBookingModal();
    //   unmountHelper();
    //   localStorage.setItem(
    //     "selectedTicketCount",
    //     JSON.parse(localStorage.getItem("selectedTicketCount")) + 1
    //   );
    // }
  };
  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => unmountHelper()}
          className={
            unmount
              ? `${styles.overlay} ${styles.overlayAnimDown}`
              : `${styles.overlay}`
          }
        ></div>
        <div
          className={
            unmount
              ? `${styles.wrapper} ${styles.wrapperAnimDown}`
              : `${styles.wrapper} ${styles.wrapperAnimUp}`
          }
        >
          <div className={styles.closeLineIcon}>{closeLineIcon}</div>
          <div className={styles.header}>
            <div className={styles.title}>Кишинёв – Лондон</div>
            <div className={styles.subtitle}>В пути 39ч 5м</div>
          </div>
          <div
            style={inBookingModal ? { height: "370px" } : {}}
            className={styles.scrollableContainer}
          >
            <FlightSegment />
            <TransferInfo />
            <FlightSegment lastSegment={true} />
            <TransferInfo />
            <FlightSegment />
            <div className={styles.aboutTime}>
              Время вылета и прилета указано местное
            </div>
          </div>
          {!inBookingModal ? (
            <div className={styles.footer}>
              <div className={styles.priceWrapper}>
                <div className={styles.title}>от 320$</div>
                <div className={styles.subtitle}>1 из 400 вариантов</div>
              </div>
              <div
                onClick={() => {
                  chooseTicket();
                }}
                className={styles.showButton}
              >
                Выбрать
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function FlightSegment({ lastSegment }) {
  return (
    <div
      style={lastSegment ? { marginBottom: "20px" } : {}}
      className={styles.flightSegment}
    >
      <div className={styles.upper}>
        <div className={styles.logo}>{wizzAirLogo}</div>
        <div className={styles.desc}>
          <div className={styles.aircompanyName}>Wizz Air</div>
          <div className={styles.flightDetails}>
            Рейс W66903, Airbus A320-100/200
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.timesAndDuration}>
          <div className={styles.dep}>
            <div className={styles.time}>18:10</div>
            <div className={styles.date}>2 апр, пт</div>
          </div>
          <div className={styles.duration}>2ч 15м</div>
          <div className={styles.arr}>
            <div className={styles.time}>19:25</div>
            <div className={styles.date}>2 апр, пт</div>
          </div>
        </div>
        <div className={styles.locationsAndBaggage}>
          <div className={styles.dep}>
            <div className={styles.city}>Кишинёв</div>
            <div className={styles.code}>KIV Кишинёв</div>
          </div>
          <div className={styles.baggage}>
            <div className={styles.upper}>
              <div className={styles.icon}>{baggageNotIncludedIcon}</div>
              <div className={styles.text}>Багаж не включен</div>
            </div>
            <div className={styles.lower}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>{handBaggageIcon}</div>
                <div className={styles.count}>x1</div>
              </div>
              <div className={styles.text}>Ручная кладь 1 место</div>
            </div>
          </div>
          <div className={styles.arr}>
            <div className={styles.city}>Берлин</div>
            <div className={styles.code}>BER Бранденбург</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function TransferInfo() {
  return (
    <div className={styles.transferInfo}>
      <div className={styles.tiWrapper}>
        <div className={styles.duration}>35ч</div>
        <div className={styles.locationWrapper}>
          <div className={styles.comment}>Долгая пересадка</div>
          <div className={styles.location}>Берлин, Германия</div>
        </div>
      </div>
    </div>
  );
}

const baggageNotIncludedIcon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.5 5.7H16V3.4C16 2.1 14.9 1 13.5 1h-3C9.1 1 8 2.1 8 3.4v2.3H6.5C5.1 5.8 4 6.8 4 8.2v11.5C4 21 5.1 22 6.5 22H7c0 .5.4 1 .9 1H9c.5 0 .9-.4.9-1H14c0 .5.4 1 .9 1H16c.5 0 1-.4 1-1h.5c1.4 0 2.5-1.1 2.5-2.4V8.2c0-1.4-1.1-2.5-2.5-2.5zm-10 1.6c-1.1 0-2 .9-2 2v9.3c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V9.3c0-1.1-.9-2-2-2h-9zm2-2.9c0-1.1.9-1.9 2-1.9h1c1.1 0 2 .8 2 1.9v1.3h-5V4.4z'
      fill='currentColor'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.72 11.22l-4.5 4.5a.75.75 0 101.06 1.06l4.5-4.5a.75.75 0 10-1.06-1.06z'
      fill='currentColor'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.22 12.28l4.5 4.5a.75.75 0 101.06-1.06l-4.5-4.5a.75.75 0 10-1.06 1.06z'
      fill='currentColor'
    ></path>
  </svg>
);

const handBaggageIcon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.778 8h-1.334v-.5c0-1.4-.977-2.5-2.222-2.5H9.778C8.533 5 7.556 6.1 7.556 7.5V8H6.222C4.978 8 4 9.1 4 10.5v7c0 1.4.978 2.5 2.222 2.5H17.778C19.022 20 20 18.9 20 17.5v-7c0-1.4-.978-2.5-2.222-2.5zM7.11 9.5c-.978 0-1.778.9-1.778 2v5c0 1.1.8 2 1.778 2h9.778c.978 0 1.778-.9 1.778-2v-5c0-1.1-.8-2-1.778-2H7.11zM8.8 8c0-.8.178-1.6 1.333-1.6h3.734c1.066 0 1.333.8 1.333 1.6H8.8z'
      fill='currentColor'
    ></path>
  </svg>
);
