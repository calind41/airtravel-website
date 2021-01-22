import React from "react";
import styles from "./MainHeader.module.scss";
import { dom, domAll } from "../../../helpers/reuse";

export default function MainHeader({ from, to, date }) {
  const onClickHandler = (evt, index) => {
    const hasClassActiveButton = evt.target.classList.contains(
      styles.activeButton
    );
    if (hasClassActiveButton) {
      evt.target.classList.toggle(styles.descendantSorting);
    }
    const btns = domAll(`.${styles.btn}`);

    domAll(`.${styles.sortIcon}`).forEach((item) =>
      item.classList.remove(styles.isVisible)
    );
    btns.forEach((item) => item.classList.remove(styles.activeButton));

    dom(`#sortIcon${index}`).classList.add(styles.isVisible);
    evt.target.classList.add(styles.activeButton);
  };
  return (
    <div id='mainHeaderId' className={styles.container}>
      <div className={styles.flightDetails}>
        <div className={styles.top}>
          <div className={styles.planeIcon}>{planeIcon}</div>
          <div className={styles.fromTo}>
            {from} - {to}
          </div>
        </div>
        <div className={styles.bottom}>{date}</div>
      </div>
      <div className={styles.ticketHeader}>
        <button
          className={styles.btn}
          onClick={(evt) => onClickHandler(evt, 1)}
        >
          <span>Вылет</span>
          <span id='sortIcon1' className={styles.sortIcon}>
            {sortIcon}
          </span>
        </button>
        <button
          className={styles.btn}
          onClick={(evt) => onClickHandler(evt, 2)}
        >
          <span>В пути</span>
          <span id='sortIcon2' className={styles.sortIcon}>
            {sortIcon}
          </span>
        </button>
        <button
          className={styles.btn}
          onClick={(evt) => onClickHandler(evt, 3)}
        >
          <span>Прилет</span>
          <span id='sortIcon3' className={styles.sortIcon}>
            {sortIcon}
          </span>
        </button>
        <button
          onClick={(evt) => onClickHandler(evt, 4)}
          className={`${styles.activeButton} ${styles.btn}`}
        >
          <span>В одну сторону</span>
          <span
            id='sortIcon4'
            className={`${styles.sortIcon} ${styles.isVisible}`}
          >
            {sortIcon}
          </span>
        </button>
      </div>
    </div>
  );
}

export const planeIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <path
      className='icon__fill'
      d='M34.3 85.3h7.8L61.7 54h21.5c3.3 0 5.9-2.6 5.9-5.9 0-3.3-2.6-5.9-5.9-5.9H61.8L42.2 10.8h-7.8l9.8 31.3H22.6l-5.9-7.8h-5.9l4 13.7-3.9 13.7h5.9l5.9-7.8h21.5l-9.9 31.4z'
    ></path>
  </svg>
);

const sortIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
    <path
      d='M3.833 10h8.334a.833.833 0 110 1.667H3.833a.833.833 0 010-1.667zm0-6h4.334a.833.833 0 110 1.667H3.833a.833.833 0 010-1.667zm0 3h6.334a.833.833 0 110 1.667H3.833a.833.833 0 010-1.667z'
      fill='currentColor'
    ></path>
  </svg>
);
