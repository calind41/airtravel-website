import React from "react";
import styles from "./OfficePaymentModal.module.scss";

import { i18n } from "../../../../i18n";

export default function OfficePaymentModal({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`payment:${key}`);
  };

  const hideModal = (evt) => {
    if (evt.target.classList.contains(styles.container))
      evt.target.style.display = "none";
    if (
      evt.target.classList.contains(styles.closeIcon) ||
      evt.target.parentNode.classList.contains(styles.closeIcon)
    ) {
      document.querySelector(`.${styles.container}`).style.display = "none";
    }
  };
  return (
    <section onClick={hideModal} className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.heading}>
          <span>{getLanguageSpecificContent("op-modal-heading")}</span>
          <span className={styles.closeIcon} onClick={hideModal}>
            {closeIconSvg}
          </span>
        </div>
        <div className={styles.bookingNr}>
          <div>{getLanguageSpecificContent("op-modal-bookingNr")}</div>
          <div>12392139123</div>
        </div>
        <div className={styles.details}>
          <div>{getLanguageSpecificContent("op-modal-details")}</div>
          <div className={styles.availability}>
            {getLanguageSpecificContent("op-modal-availability")} 09:00-18:00
          </div>
          <div className={styles.address}>Str. Armeneasca 33</div>
          <div className={styles.contactNr}>+373 22 895 895</div>
          <div className={styles.picture}>
            <img src='/images/office.png' alt='iFly Office Image' />
          </div>
        </div>
      </div>
    </section>
  );
}

const closeIconSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='12.828'
    height='12.828'
    viewBox='0 0 12.828 12.828'
  >
    <path
      id='icons8-multiply'
      d='M18,18,8,8M8,18,18,8'
      transform='translate(-6.586 -6.586)'
      fill='none'
      stroke='#2e3d4d'
      strokeLinecap='round'
      strokeMiterlimit='10'
      strokeWidth='2'
    />
  </svg>
);
