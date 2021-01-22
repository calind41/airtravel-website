import React, { useState } from "react";
import styles from "./TicketPrice.module.scss";
import Popup from "../../Popup/Popup";

export default function TicketPrice() {
  const [priceSlideAnimation, setPriceSlideAnimation] = useState("");
  const onMouseEnterPopupArea = (setValue, value) => {
    // if (setValue === setPriceSlideAnimation) {
    //   if (priceSlideAnimation === "") {
    //     setTimeout(() => {
    //       setValue(value);
    //     }, 300);
    //   } else setValue(value);
    // }
    setValue(value);
  };
  const onMouseLeavePopupArea = (setValue, value) => {
    setValue(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.popupWrapper}>
          <Popup left='-37px' slideAnimation={priceSlideAnimation}>
            <div className={styles.ticketPricePopupItem}>В одну сторону</div>
            <div className={styles.ticketPricePopupItem}>
              <strong>300$</strong>– без багажа
            </div>
          </Popup>

          <div
            onMouseLeave={() =>
              onMouseLeavePopupArea(setPriceSlideAnimation, "slideDown")
            }
            onMouseEnter={() =>
              onMouseEnterPopupArea(setPriceSlideAnimation, "slideUp")
            }
            className={styles.price}
          >
            300$
          </div>
          <div className={styles.baggagePrice}>без багажа</div>
        </div>
      </div>
    </div>
  );
}
