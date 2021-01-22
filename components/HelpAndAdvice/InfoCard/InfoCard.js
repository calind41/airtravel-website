import React, { useState } from "react";
import styles from "./InfoCard.module.scss";

export default function InfoCard(props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const onClickArrowIconHandler = () => {
    setIsOpenDropdown((prevValue) => !prevValue);
    document
      .querySelector(`#${props.id}`)
      .classList.toggle(styles.rotate180deg);
    document
      .querySelector(`#icc_${props.id}`)
      .classList.toggle(styles.openContainer);
  };
  return (
    <div id={`icc_${props.id}`} className={`${styles.container} `}>
      <div className={styles.wrapper}>
        <div className={styles.topic}>{props.topic}</div>
        <div
          id={props.id}
          onClick={onClickArrowIconHandler}
          className={styles.arrowIcon}
        ></div>
      </div>
      {isOpenDropdown ? (
        <div className={styles.dropdownContent}>
          <DropdownItem text={props.dropdownText} />
        </div>
      ) : null}
    </div>
  );
}

function DropdownItem({ text }) {
  return (
    <div className={styles.item}>
      <div className={styles.text}>{text} </div>
      <div className={styles.cta}>Читать полностью</div>
    </div>
  );
}
