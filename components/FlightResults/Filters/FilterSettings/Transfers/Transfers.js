import React, { useState, useEffect, useContext } from "react";
import styles from "./Transfers.module.scss";
import { cancelFilterIcon } from "../FilterSettings";
import { FiltersDispatchContext } from "../../Filters";
import { dom } from "../../../../../helpers/reuse";
import { FiltersMultiwayDispatchContext } from "../../../multiway/Filters/Filters";

export default function Transfers({ id, cancelFilters, multiway }) {
  const { dispatch } = useContext(
    multiway ? FiltersMultiwayDispatchContext : FiltersDispatchContext
  );

  const [withoutTransfer, setWithoutTransfer] = useState(true);
  const [oneTransfer, setOneTransfer] = useState(true);
  const [twoPlusTransfer, setTwoPlusTransfer] = useState(true);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (cancelFilters) {
      cancelTransferFilters();
    }
  }, [cancelFilters]);

  const cancelTransferSettingsOnMouseEnterHandler = () => {
    const floatNotif = dom(`#floatingNotification_${id}`);
    floatNotif.classList.add(styles.floatingNotificationUp);
    floatNotif.classList.remove(styles.floatingNotificationDown);
  };
  const cancelTransferSettingsOnMouseLeaverHandler = () => {
    const floatNotif = dom(`#floatingNotification_${id}`);
    floatNotif.classList.remove(styles.floatingNotificationUp);
    floatNotif.classList.add(styles.floatingNotificationDown);
  };
  const cancelTransferFilters = (evt) => {
    if (!cancelFilters) {
      dispatch({ type: "decreaseNumOfFilters" });
    }
    setCounted(false);

    const floatingNotification = dom(`#floatingNotification_${id}`);
    const cancelFilterIcon = dom(`#cancelFilterIcon_${id}`);
    cancelFilterIcon.style.display = "none";
    floatingNotification.style.display = "none";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    setAllTransferCheckbox(true);
  };
  const changeCheckboxState = (className, value, setValue) => {
    displayTransferCancelIcon();
    const cond1 =
      (withoutTransfer && oneTransfer) ||
      (withoutTransfer && twoPlusTransfer) ||
      (oneTransfer && twoPlusTransfer);
    const cond2 = !withoutTransfer && !oneTransfer;
    const cond3 = !withoutTransfer && !twoPlusTransfer;
    const cond4 = !oneTransfer && !twoPlusTransfer;
    if (cond1) {
      if (!value) {
        cancelTransferFilters();
        return;
      }
    }
    if (cond2) {
      if (className === "twoPlusTransfers" && value) {
        cancelTransferFilters();
        return;
      }
    }
    if (cond3) {
      if (className === "oneTransfer" && value) {
        cancelTransferFilters();
        return;
      }
    }
    if (cond4) {
      if (className === "withoutTransfer" && value) {
        cancelTransferFilters();
        return;
      }
    }
    if (value) {
      setValue(false);
      dom(`.${styles[className]}`).classList.remove(
        styles.checkBoxContainerChecked
      );
    } else {
      setValue(true);
      dom(`.${styles[className]}`).classList.add(
        styles.checkBoxContainerChecked
      );
    }
    if (!counted) {
      dispatch({ type: "increaseNumOfFilters" });
      setCounted(true);
    }
  };

  const displayTransferCancelIcon = () => {
    const floatingNotification = document.querySelector(
      `#floatingNotification_${id}`
    );
    dom(`#cancelFilterIcon_${id}`).style.display = "block";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    floatingNotification.style.display = "flex";
  };
  const setAllTransferCheckbox = (value) => {
    setWithoutTransfer(value);
    setOneTransfer(value);
    setTwoPlusTransfer(value);
  };

  return (
    <div className={styles.transfers}>
      <div className={styles.title}>
        Пересадки
        <span
          onMouseEnter={cancelTransferSettingsOnMouseEnterHandler}
          onMouseLeave={cancelTransferSettingsOnMouseLeaverHandler}
          onClick={cancelTransferFilters}
          className={styles.cancelFilterIcon}
          id={`cancelFilterIcon_${id}`}
        >
          {cancelFilterIcon}
          <span
            id={`floatingNotification_${id}`}
            className={styles.floatingNotification}
          >
            Сбросить выбор
            <span className={styles.arrowDown}></span>
          </span>
        </span>
      </div>
      <div className={styles.settings}>
        <div
          onClick={() => {
            changeCheckboxState(
              "withoutTransfer",
              withoutTransfer,
              setWithoutTransfer
            );
          }}
          className={styles.withoutTransfer}
        >
          <div
            className={
              withoutTransfer
                ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                : `${styles.checkBoxContainer}`
            }
          ></div>
          <div className={styles.text}>Без пересадок</div>
        </div>
        <div
          onClick={() =>
            changeCheckboxState("oneTransfer", oneTransfer, setOneTransfer)
          }
          className={styles.oneTransfer}
        >
          <div
            className={
              oneTransfer
                ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                : `${styles.checkBoxContainer}`
            }
          ></div>
          <div className={styles.text}>1 пересадка</div>
        </div>
        <div
          onClick={() =>
            changeCheckboxState(
              "twoPlusTransfers",
              twoPlusTransfer,
              setTwoPlusTransfer
            )
          }
          className={styles.twoPlusTransfers}
        >
          <div
            className={
              twoPlusTransfer
                ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                : `${styles.checkBoxContainer}`
            }
          ></div>
          <div className={styles.text}>2+ пересадки</div>
        </div>
      </div>
    </div>
  );
}
