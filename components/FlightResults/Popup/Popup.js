import React from "react";
import styles from "./Popup.module.scss";

export default function Popup({
  transferPopupClassName,
  children,
  slideAnimation,
  left,
}) {
  return (
    <div
      style={{ left: left }}
      className={`${styles.popup} ${styles[slideAnimation]} ${styles[transferPopupClassName]}`}
    >
      {children}
    </div>
  );
}
