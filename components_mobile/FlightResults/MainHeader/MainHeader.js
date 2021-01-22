import React from "react";
import styles from "./MainHeader.module.scss";

export default function MainHeader({ from, to, date }) {
  return (
    <div id='mainHeaderId' className={styles.container}>
      <div className={styles.flightDetails}>
        <div className={styles.top}>
          <div className={styles.fromTo}>
            {from} - {to}
          </div>
        </div>
        <div className={styles.bottom}>{date}</div>
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
