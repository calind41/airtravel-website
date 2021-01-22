import React, { useState, useEffect, useContext } from "react";
import styles from "./DepartureArrivalSettings.module.scss";
import TwoWayRangeSlider from "../../FilterSettings/TwoWayRangeSlider/TwoWayRangeSlider";
import OneWaySlider from "../../FilterSettings/OneWaySlider/OneWaySlider";
import { goBackIcon } from "../FiltersModal";
import { dom } from "../../../../../helpers/reuse";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";

export default function DepartureArrivalSettings({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { dispatch } = useContext(FiltersDispatchContext);

  const { filtersModalInitialState } = state;
  const { deppArrSettingsInitialState } = filtersModalInitialState;

  const {
    depSliderValues,
    depStartTime,
    depEndTime,
    arrSliderValues,
    arrStartTime,
    arrEndTime,
    arrivalStartDate,
    arrivalEndDate,
    flightDurationSliderValue,
    flightDuration,
  } = deppArrSettingsInitialState;

  useEffect(() => {
    const cond1 = depStartTime !== "00:00";
    const cond2 = depEndTime !== "24:00";
    const cond3 = arrStartTime !== "00:00, 13 мар";
    const cond4 = arrEndTime !== "24:00, 14 мар";
    const cond5 = flightDuration !== "72ч 00м";

    let count = 0;
    if (cond1 || cond2) {
      count += 1;
    }
    if (cond3 || cond4) {
      count += 1;
    }
    if (cond5) {
      count += 1;
    }

    if (cond1 || cond2 || cond3 || cond4 || cond5) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "depArrSettingsCount",
        payload: count,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "depArrSettingsCount",
        payload: 0,
      });
    }
  }, [depStartTime, depEndTime, arrStartTime, arrEndTime, flightDuration]);

  const goBack = () => {
    unmountModalHelper();
    setTimeout(() => {
      unmountModal();
    }, [250]);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal("applyFilters");
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };

  const receiveDepartureTimeSliderValues = (value1, value2, origV1, origV2) => {
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

    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "depStartTime",
      payload: rval1,
    });
    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "depEndTime",
      payload: rval2,
    });
    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "depSliderValues",
      payload: [origV1, origV2],
    });
  };
  const receiveArrivalTimeSliderValues = (value1, value2, origV1, origV2) => {
    let rval1 = Math.round(value1);
    let rval2 = Math.round(value2);

    const diff1 = value1 - rval1;
    const diff2 = value2 - rval2;

    const date1 = origV1 < 720 ? arrivalStartDate : arrivalEndDate;
    const date2 = origV2 < 720 ? arrivalStartDate : arrivalEndDate;

    if (rval1 < 10) rval1 = "0" + rval1;
    if (rval2 < 10) rval2 = "0" + rval2;

    // 2.3 - 2 > 0
    if (diff1 > 0) {
      // 02:30
      rval1 = rval1 + ":30, " + date1;
    }
    // 2.6 - 3 <= 0
    if (diff1 <= 0) {
      // 03:00
      rval1 = rval1 + ":00, " + date1;
    }

    // 2.3 - 2 > 0
    if (diff2 > 0) {
      // 02:30
      rval2 = rval2 + ":30, " + date2;
    }
    // 2.6 - 3 <= 0
    if (diff2 <= 0) {
      // 03:00
      rval2 = rval2 + ":00, " + date2;
    }

    if (value1 === 0) {
      rval1 = "00:00, " + date1;
    }
    if (value2 === 0) {
      rval2 = "00:00, " + date2;
    }
    if (value2 === 24) {
      rval2 = "24:00, " + date2;
    }
    if (value1 === 24) {
      rval1 = "24:00, " + date1;
    }

    const sliced_rval1 = rval1.slice(0, 5);
    const sliced_rval2 = rval2.slice(0, 5);
    const cond1 =
      origV1 <= 750 && (sliced_rval1 === "24:30" || sliced_rval1 === "24:00");
    const cond2 =
      origV2 < 750 && (sliced_rval2 === "24:30" || sliced_rval2 === "24:00");
    if (cond1) {
      rval1 = "00" + rval1.slice(2, 5) + ", " + arrivalEndDate;
    }
    if (cond2) {
      rval2 = "00" + rval2.slice(2, 5) + ", " + arrivalEndDate;
    }

    let hours1 = parseInt(rval1.split(":")[0]);
    let hours2 = parseInt(rval2.split(":")[0]);

    let minutes1 = rval1.split(":")[1];
    let minutes2 = rval2.split(":")[1];

    hours1 = hours1 > 24 ? hours1 - 24 : hours1;
    hours2 = hours2 > 24 ? hours2 - 24 : hours2;

    hours1 = hours1 < 10 ? "0" + hours1 : "" + hours1;
    hours2 = hours2 < 10 ? "0" + hours2 : "" + hours2;

    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "arrStartTime",
      payload: hours1 + ":" + minutes1,
    });
    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "arrEndTime",
      payload: hours2 + ":" + minutes2,
    });
    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "arrSliderValues",
      payload: [origV1, origV2],
    });
  };

  const receiveFlightTimeDurationSliderValue = (value, origVal) => {
    let rval = Math.round(value);

    const diff = value - rval;

    // 2.3 - 2 > 0
    if (diff > 0) {
      rval = rval + "ч 30м";
    }
    // 2.6 - 3 <= 0
    if (diff <= 0) {
      rval = rval + "ч 00м";
    }

    if (value === 72) {
      rval = "71ч 30м";
    }

    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "flightDuration",
      payload: rval,
    });
    dispatch({
      type: "updateDeppArrSettings",
      fieldName: "flightDurationSliderValue",
      payload: [origVal],
    });
  };

  const dropAllSettings = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "deppArrSettingsInitialState",
      payload: {
        depSliderValues: [0, 720],
        depStartTime: "00:00",
        depEndTime: "24:00",
        arrSliderValues: [0, 1440],
        arrStartTime: "00:00, 13 мар",
        arrEndTime: "24:00, 14 мар",
        arrivalStartDate: "13 мар",
        arrivalEndDate: "14 мар",
        flightDurationSliderValue: [2160],
        flightDuration: "72ч 00м",
      },
    });
  };
  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Время</div>
        <div onClick={dropAllSettings} className={`${styles.dropSettings} `}>
          Сбросить
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>Кишинёв – Лондон</div>

        <div className={styles.departure}>
          <div className={styles.heading}>
            <div className={styles.name}>Вылет</div>
            <div className={styles.timeInterval}>
              {depStartTime}–{depEndTime}
            </div>
          </div>
          <TwoWayRangeSlider
            sliderValues={depSliderValues}
            passValues={receiveDepartureTimeSliderValues}
            min={0}
            max={720}
          />
        </div>

        <div className={styles.arrival}>
          <div className={styles.heading}>
            <div className={styles.name}>Прилет</div>
            <div className={styles.timeInterval}>
              {arrStartTime}–{arrEndTime}
            </div>
          </div>
          <TwoWayRangeSlider
            sliderValues={arrSliderValues}
            passValues={receiveArrivalTimeSliderValues}
            min={0}
            max={1440}
          />
        </div>

        <div className={styles.flightDuration}>
          <div className={styles.heading}>
            <div className={styles.name}>В пути</div>
            <div className={styles.timeInterval}>до {flightDuration}</div>
          </div>
          <OneWaySlider
            sliderValue={flightDurationSliderValue}
            passValue={receiveFlightTimeDurationSliderValue}
            min={90}
            max={2160}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceWrapper}>
          <div className={styles.title}>от 320$</div>
          <div className={styles.subtitle}>1 из 400 вариантов</div>
        </div>
        <div onClick={applyFilters} className={styles.showButton}>
          Показать
        </div>
      </div>
    </div>
  );
}
