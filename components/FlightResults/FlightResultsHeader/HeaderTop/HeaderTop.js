import React from "react";
import styles from "./HeaderTop.module.scss";

export default function HeaderTop({
  from,
  to,
  nrPassengers,
  flightType,
  swithToSearchForm,
}) {
  const editSearchForm = () => {
    swithToSearchForm();
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.fromTo}>
          <div>
            {from} - {to}
          </div>
          <div onClick={editSearchForm} className={styles.editIcon}>
            {editSvg}
          </div>
        </div>
        <div className={styles.flightDetails}>
          {nrPassengers} пассажир, {flightType}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.calendar}>
          <span>26 декабря, сб</span>
        </div>
      </div>
    </div>
  );
}

const editSvg = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
    <path
      d='M13 8a1 1 0 012 0v5a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2h4a1 1 0 110 2H3v10h10V8zm-.293-6.707l2 2a1 1 0 010 1.414l-6 6A1 1 0 018 11H6a1 1 0 01-1-1V8a1 1 0 01.293-.707l6-6a1 1 0 011.414 0zM7 8.414V9h.586l5-5L12 3.414l-5 5z'
      fill='currentColor'
    ></path>
  </svg>
);
