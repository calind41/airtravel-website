import React, { useState, useEffect } from "react";
import styles from "./TwoCheckboxComponent.module.scss";

export default function TwoCheckboxComponent({
  cancelFilters,
  setNumOfFilters,
  title,
  textOne,
  textTwo,
}) {
  const [valueOne, setValueOne] = useState(true);
  const [valueTwo, setValueTwo] = useState(true);

  useEffect(() => {
    if (cancelFilters) {
      setValueOne(true);
      setValueTwo(true);
    }
  }, [cancelFilters]);

  const changeCheckboxState = (className, value, setValue) => {
    if (value) {
      setNumOfFilters((prevValue) => prevValue + 1);
      setValue(false);
      document
        .querySelector(`.${styles[className]}`)
        .classList.remove(styles.checkBoxContainerChecked);
    } else {
      setValue(true);
      setNumOfFilters((prevValue) => prevValue - 1);

      document
        .querySelector(`.${styles[className]}`)
        .classList.add(styles.checkBoxContainerChecked);
    }
  };

  return (
    <div className={styles.transfers}>
      <div className={styles.title}>{title}</div>
      <div className={styles.settings}>
        <div
          onClick={() => changeCheckboxState("valueOne", valueOne, setValueOne)}
          className={styles.valueOne}
        >
          <div
            className={
              valueOne
                ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                : `${styles.checkBoxContainer}`
            }
          ></div>
          <div className={styles.text}>{textOne}</div>
        </div>
        <div
          onClick={() => changeCheckboxState("valueTwo", valueTwo, setValueTwo)}
          className={styles.valueTwo}
        >
          <div
            className={
              valueTwo
                ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                : `${styles.checkBoxContainer}`
            }
          ></div>
          <div className={styles.text}>{textTwo}</div>
        </div>
      </div>
    </div>
  );
}
