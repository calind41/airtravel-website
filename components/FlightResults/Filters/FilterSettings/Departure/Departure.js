import React, { useState, useEffect, useContext } from "react";
import styles from "./Departure.module.scss";
import { cancelFilterIcon, arrowIcon } from "../FilterSettings";
import TwoWayRangeSlider from "../TwoWayRangeSlider/TwoWayRangeSlider";
import { FiltersDispatchContext } from "../../Filters";
import { dom } from "../../../../../helpers/reuse";
import { FiltersMultiwayDispatchContext } from "../../../multiway/Filters/Filters";

export default function Departure({ id, cancelFilters, multiway }) {
  const { dispatch } = useContext(
    multiway ? FiltersMultiwayDispatchContext : FiltersDispatchContext
  );
  const [departureStartTime, setDepartureStartTime] = useState("00:00");
  const [departureEndTime, setDepartureEndTime] = useState("24:00");
  const [sliderValues, setSliderValues] = useState([0, 720]);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (cancelFilters) {
      cancelDepartureFilters();
    }
  }, [cancelFilters]);

  useEffect(() => {
    const closeAllDropdowns = (evt) => {
      const departureTimesDropdown = dom(`#departureTimesDropdown_${id}`);

      // departureTimesDropdown
      const cond =
        departureTimesDropdown.classList.contains(styles.displayBlock) &&
        !evt.target.classList.contains(styles.timeSelect);
      if (cond) {
        departureTimesDropdown.classList.remove(styles.displayBlock);
        dom(`#timeSelect_${id} .${styles.arrowIcon} svg`).classList.remove(
          styles.rotate180deg
        );
      }
    };
    window.addEventListener("click", closeAllDropdowns);

    return () => {
      window.removeEventListener("click", closeAllDropdowns);
    };
  }, []);

  const cancelDepartureSettingsOnMouseEnterHandler = () => {
    const floatNotif = dom(`#floatingNotification2_${id}`);
    floatNotif.classList.add(styles.floatingNotificationUp);
    floatNotif.classList.remove(styles.floatingNotificationDown);
  };
  const cancelDepartureSettingsOnMouseLeaveHandler = () => {
    const floatNotif = dom(`#floatingNotification2_${id}`);

    floatNotif.classList.remove(styles.floatingNotificationUp);
    floatNotif.classList.add(styles.floatingNotificationDown);
  };
  const cancelDepartureFilters = () => {
    setDepartureStartTime("00:00");
    setDepartureEndTime("24:00");
    const floatingNotification = dom(`#floatingNotification2_${id}`);
    const cancelFilterIcon = dom(`#cancelFilterIcon2_${id}`);
    cancelFilterIcon.style.display = "none";
    floatingNotification.style.display = "none";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    setSliderValues([0, 720]);
    if (!cancelFilters) {
      dispatch({ type: "decreaseNumOfFilters" });
    }
    setCounted(false);
  };
  const toggleDepartureTimesDropdown = () => {
    dom(`#departureTimesDropdown_${id}`).classList.toggle(styles.displayBlock);
    dom(`#timeSelect_${id} .${styles.arrowIcon} svg`).classList.toggle(
      styles.rotate180deg
    );
  };
  const selectDepartureTime = (timeInterval) => {
    if (timeInterval === "") {
      cancelDepartureFilters();
      return;
    }
    const start = timeInterval.split("-")[0];
    const end = timeInterval.split("-")[1];
    setDepartureStartTime(start);
    setDepartureEndTime(end);
    displayDepartureCancelIcon();
    if (!counted) {
      setCounted(true);
      dispatch({ type: "increaseNumOfFilters" });
    }
  };
  const displayDepartureCancelIcon = () => {
    const floatingNotification = dom(`#floatingNotification2_${id}`);
    dom(`#cancelFilterIcon2_${id}`).style.display = "block";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    floatingNotification.style.display = "flex";
  };
  const receiveDepartureTimeSliderValues = (value1, value2) => {
    if (!counted) {
      setCounted(true);
      dispatch({ type: "increaseNumOfFilters" });
    }
    let rval1 = Math.round(value1);
    let rval2 = Math.round(value2);

    const diff1 = value1 - rval1;
    const diff2 = value2 - rval2;

    if (rval1 < 10) rval1 = "0" + rval1;
    if (rval2 < 10) rval2 = "0" + rval2;

    // 2.3 - 2 > 0
    if (diff1 > 0) {
      // 02:30
      rval1 = rval1 + ":30";
    }
    // 2.6 - 3 <= 0
    if (diff1 <= 0) {
      // 03:00
      rval1 = rval1 + ":00";
    }

    // 2.3 - 2 > 0
    if (diff2 > 0) {
      // 02:30
      rval2 = rval2 + ":30";
    }
    // 2.6 - 3 <= 0
    if (diff2 <= 0) {
      // 03:00
      rval2 = rval2 + ":00";
    }

    if (value1 === 0) {
      rval1 = "00:00";
    }
    if (value2 === 0) {
      rval2 = "00:00";
    }
    if (value2 === 24) {
      rval2 = "24:00";
    }
    if (value1 === 24) {
      rval1 = "24:00";
    }

    setDepartureStartTime(rval1);
    setDepartureEndTime(rval2);
  };
  const toggleAirportDropdown = () => {
    dom(`#airportDropdwon_${id}`).classList.toggle(styles.displayFlex);
    dom(`#departureAirport_${id} .${styles.arrowIcon} svg`).classList.toggle(
      styles.rotate180deg
    );
  };
  return (
    <div className={styles.departure}>
      <div className={styles.title}>
        Вылет
        <span
          onMouseEnter={cancelDepartureSettingsOnMouseEnterHandler}
          onMouseLeave={cancelDepartureSettingsOnMouseLeaveHandler}
          onClick={cancelDepartureFilters}
          className={styles.cancelFilterIcon2}
          id={`cancelFilterIcon2_${id}`}
        >
          {cancelFilterIcon}
          <span
            id={`floatingNotification2_${id}`}
            className={styles.floatingNotification2}
          >
            Сбросить выбор
            <span className={styles.arrowDown}></span>
          </span>
        </span>
      </div>

      <div
        onClick={toggleDepartureTimesDropdown}
        id={`timeSelect_${id}`}
        className={styles.timeSelect}
      >
        <div className={styles.timeDisplay}>
          {departureStartTime} – {departureEndTime}
        </div>
        <div className={styles.arrowIcon}>{arrowIcon}</div>
        <div
          id={`departureTimesDropdown_${id}`}
          className={styles.departureTimesDropdown}
        >
          <div onClick={() => selectDepartureTime("")}>
            <span>Любое</span>
            <span></span>
          </div>
          <div
            onClick={() => {
              selectDepartureTime("00:00-06:00");
              setSliderValues([0, 180]);
            }}
          >
            <span>Ночь</span>
            <span>00:00–06:00</span>
          </div>
          <div
            onClick={() => {
              selectDepartureTime("06:00-12:00");
              setSliderValues([180, 360]);
            }}
          >
            <span>Утро</span>
            <span>06:00–12:00</span>
          </div>
          <div
            onClick={() => {
              selectDepartureTime("12:00-18:00");
              setSliderValues([360, 540]);
            }}
          >
            <span>День</span>
            <span>12:00–18:00</span>
          </div>
          <div
            onClick={() => {
              selectDepartureTime("18:00-00:00");
              setSliderValues([540, 720]);
            }}
          >
            <span>Вечер</span>
            <span>18:00–00:00</span>
          </div>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <TwoWayRangeSlider
          displayCancelIcon={displayDepartureCancelIcon}
          sliderValues={sliderValues}
          passValues={receiveDepartureTimeSliderValues}
          min={0}
          max={720}
        />
      </div>
      <div
        onClick={toggleAirportDropdown}
        id={`departureAirport_${id}`}
        className={styles.departureAirport}
      >
        <div className={styles.title}>Аэропорт вылета</div>
        <div className={styles.arrowIcon}>{arrowIcon}</div>
        <div id={`airportDropdwon_${id}`} className={styles.airportDropdown}>
          <div
            className={`${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`}
          ></div>
          <div className={styles.text}>Кишинёв</div>
        </div>
      </div>
    </div>
  );
}
