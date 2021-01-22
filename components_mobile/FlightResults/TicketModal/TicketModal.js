import React, { useState, useEffect } from "react";
import styles from "./TicketModal.module.scss";
import { planeIcon } from "../MainHeader/MainHeader";
import MainTicket from "../MainTicket/MainTicket";
import { ticketProps } from "../FlightResults_M";
import {
  baggageIcon,
  baggageIconSmall,
} from "../MainTicket/TicketDetails/TicketDetails";

export default function TicketModal({ unmountModal, from, to, date }) {
  const closeModal = (evt) => {
    if (evt.target.classList.contains(styles.container)) {
      document.querySelector("html").style.overflow = "visible";
      document.querySelector("html").style.height = "auto";
      evt.target.classList.add(styles.fadeOut);
      setTimeout(() => {
        unmountModal();
      }, 230);
    }
    if (evt.target.classList.contains(styles.closeIcon)) {
      document.querySelector("html").style.overflow = "visible";
      document.querySelector("html").style.height = "auto";
      document
        .querySelector(`.${styles.container}`)
        .classList.add(styles.fadeOut);
      setTimeout(() => {
        unmountModal();
      }, 230);
    }
  };
  const [withoutBaggage, setWithoutBaggage] = useState(true);

  return (
    <div onClick={(evt) => closeModal(evt)} className={styles.container}>
      <div className={styles.wrapper}>
        <div onClick={closeModal} className={styles.closeIcon}>
          {closeIcon}
        </div>
        <div className={styles.main}>
          <div className={styles.flightDetails}>
            <div className={styles.top}>
              <div className={styles.planeIcon}>{planeIcon}</div>
              <div className={styles.fromTo}>
                {from} - {to}
              </div>
            </div>
            <div className={styles.bottom}>{date}</div>
          </div>

          <MainTicket
            id='modalTicketId'
            ticketProps={ticketProps}
            showPrice={false}
          />
          <Booking setWithoutBaggage={setWithoutBaggage} />
          {withoutBaggage ? <MainOffer /> : null}
        </div>
        <ModalFooter />
      </div>
    </div>
  );
}

const closeIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M13 11h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4z'
      fill='currentColor'
    ></path>
  </svg>
);

function Booking({ setWithoutBaggage }) {
  const selectThisButton = (className) => {
    if (className === "withBaggageBtn") {
      setWithoutBaggage(false);
      document
        .querySelector(`.${styles.withoutBaggageBtn}`)
        .classList.remove(styles.selectedBtn);
    } else {
      setWithoutBaggage(true);

      document
        .querySelector(`.${styles.withBaggageBtn}`)
        .classList.remove(styles.selectedBtn);
    }
    document
      .querySelector(`.${styles[className]}`)
      .classList.add(styles.selectedBtn);
  };
  return (
    <div className={styles.booking}>
      <div className={styles.bookingLeft}>
        <div className={styles.title}>Бронирование</div>
        <div className={styles.subtitle}>1 пассажир, эконом</div>
      </div>
      <div className={styles.bookingRight}>
        <div
          onClick={() => selectThisButton("withoutBaggageBtn")}
          className={`${styles.withoutBaggageBtn} ${styles.selectedBtn}`}
        >
          <div className={styles.baggageIcons}>
            <div className={styles.b1}>
              <div>{baggageIcon}</div>
              <div className={styles.weight}>x</div>
            </div>
            <div className={styles.b2}>
              <div>{baggageIconSmall}</div>
              <div className={styles.count}>8</div>
            </div>
          </div>
          <div className={styles.text}>без багажа</div>
        </div>
        <div
          onClick={() => selectThisButton("withBaggageBtn")}
          className={styles.withBaggageBtn}
        >
          <div className={styles.baggageIcons}>
            <div className={styles.b1}>
              <div>{baggageIcon}</div>
              <div className={styles.weight}>23</div>
            </div>
            <div className={styles.b2}>
              <div>{baggageIconSmall}</div>
              <div className={styles.count}>8</div>
            </div>
          </div>
          <div className={styles.text}>+100 $</div>
        </div>
      </div>
    </div>
  );
}
function MainOffer() {
  return (
    <div className={styles.subFooter}>
      <div className={styles.left}>
        <div className={styles.title}>Тинькофф</div>
        <div className={styles.subtitle1}>Наша поддержка и серви</div>
        <div className={styles.subtitle2}>Кэшбэк, бонусы, рассрочка</div>
      </div>
      <div className={styles.right}>
        <div className={styles.price}>280$</div>
        <div className={styles.btn}>Выбрать</div>
      </div>
    </div>
  );
}

function ModalFooter({
  title,
  subtitle1,
  subtitle2,
  price,
  btnBgColor,
  btnColor,
}) {
  return (
    <div className={styles.modalFooter}>
      <div className={styles.left}>
        <div className={styles.title}>KupiBilet.ru</div>
        <div className={styles.subtitle1}>Покупка у партнера</div>
        <div className={styles.subtitle2}>Кэшбэк и бонусы начисляются</div>
      </div>
      <div className={styles.right}>
        <div className={styles.price}>320$</div>
        <div className={styles.btn}>Выбрать</div>
      </div>
    </div>
  );
}
