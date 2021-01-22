import React from "react";
import styles from "./MenuItems.module.css";

export default function MenuItems() {
  return (
    <div
      id='menuItemsId'
      className={`${styles.menuItems} ${styles.opacityZero}`}
    >
      <div>FLIGHTS</div>
      <div>HOTELS</div>
      <div>BONUS POINTS</div>
      <div>MOBILE APP</div>
      <div>CUSTOMER SUPPORT</div>
    </div>
  );
}
