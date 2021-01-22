import React from "react";
import styles from "./CheckboxComponent.module.scss";
import { dom } from "../../../../../../helpers/reuse";

export default function CheckboxComponent({
  id,
  index,
  checked,
  disabled,
  setChecked,
  setCheckboxByIndex,
  setOnlyOneCheckboxByIndex,
  onClickHandler,
  name,
  children,
}) {
  const changeCheckboxState = () => {
    if (onClickHandler) {
      const isChecked = dom(`#${id}`).classList.contains(
        styles.checkBoxContainerChecked
      );
      onClickHandler(isChecked);
    }
    if (setChecked) {
      setChecked((prevValue) => !prevValue);
    }
    if (setCheckboxByIndex) {
      setCheckboxByIndex((oldItems) => {
        const newItems = [];
        oldItems.map((tc, idx) => {
          if (idx === index) {
            newItems.push({ ...tc, checked: !tc.checked });
          } else {
            newItems.push({ ...tc });
          }
        });
        return newItems;
      });
    }
    if (setOnlyOneCheckboxByIndex) {
      setOnlyOneCheckboxByIndex((oldItems) => {
        const newItems = [];
        oldItems.map((itm, idx) => {
          if (idx === index) {
            newItems.push({ ...itm, checked: !itm.checked });
          } else {
            newItems.push({ ...itm, checked: false });
          }
        });
        return newItems;
      });
    }
  };

  return (
    <div
      onClick={() => changeCheckboxState()}
      className={
        disabled
          ? `${styles.checkBoxWrapper} ${styles.checkboxDisabled}`
          : `${styles.checkBoxWrapper}`
      }
    >
      {name ? <div className={styles.name}>{name}</div> : children}
      <div className={styles.wrapper}>
        <div
          id={id}
          styles={disabled ? { opacity: 0.5 } : {}}
          className={
            checked
              ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
              : `${styles.checkBoxContainer}`
          }
        ></div>
      </div>
    </div>
  );
}
