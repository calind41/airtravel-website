import React, { useState, useEffect, useContext } from "react";
import styles from "./TwoCheckboxComponent.module.scss";
import { FiltersDispatchContext } from "../../Filters";
import { FiltersMultiwayDispatchContext } from "../../../multiway/Filters/Filters";
import { dom } from "../../../../../helpers/reuse";

export default function TwoCheckboxComponent({
  cancelFilters,
  title,
  textOne,
  textTwo,
  multiway,
}) {
  const { dispatch } = useContext(
    multiway ? FiltersMultiwayDispatchContext : FiltersDispatchContext
  );
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
      dispatch({ type: "increaseNumOfFilters" });
      setValue(false);
      dom(`.${styles[className]}`).classList.remove(
        styles.checkBoxContainerChecked
      );
    } else {
      setValue(true);
      dispatch({ type: "decreaseNumOfFilters" });

      dom(`.${styles[className]}`).classList.add(
        styles.checkBoxContainerChecked
      );
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
