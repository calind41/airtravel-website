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
          10 марта, {nrPassengers} пассажир, {flightType}
        </div>
      </div>
    </div>
  );
}

const editSvg = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M19.004 15.589v3a3 3 0 01-3 3.001H6a3 3 0 01-3.001-3V8.586a3 3 0 013-3h5.002l-2 2H6a1 1 0 00-1 1v10.002a1 1 0 001 1h10.002a1 1 0 001-1v-3l2-2v2zM8 16.589v-4.415l8.588-8.588a2 2 0 012.829 0l1.586 1.586a2 2 0 010 2.829l-8.588 8.588H8.001zM19.59 6.586L18.004 5l-8.002 8.002v1.586h1.586l8.002-8.002z'
      fill='currentColor'
    ></path>
  </svg>
);
