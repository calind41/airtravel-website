import React, { useState, useEffect, useContext } from "react";
import styles from "./Arrival.module.scss";
import { cancelFilterIcon, arrowIcon } from "../FilterSettings";
import TwoWayRangeSlider from "../TwoWayRangeSlider/TwoWayRangeSlider";
import { FiltersDispatchContext } from "../../Filters";
import { dom } from "../../../../../helpers/reuse";
import { FiltersMultiwayDispatchContext } from "../../../multiway/Filters/Filters";

export default function Arrival({ id, cancelFilters, multiway }) {
  const { dispatch } = useContext(
    multiway ? FiltersMultiwayDispatchContext : FiltersDispatchContext
  );
  const [sliderTwoValues, setSliderTwoValues] = useState([0, 720]);
  const [arrivalEndTime, setArrivalEndTime] = useState("24:00");
  const [arrivalStartTime, setArrivalStartTime] = useState("00:00");
  const [selectedArrivalAirports, setSelectedArrivalAirports] = useState([]);
  const [
    nrOfSelectedArrivalAirports,
    setNrOfSelectedArrivalAirports,
  ] = useState(-1);
  const [countedTimeSelect, setCountedTimeSelect] = useState(false);
  const [countedAirportSelect, setCountedAirportSelect] = useState(false);

  useEffect(() => {
    if (cancelFilters) {
      cancelArrivalFilters();
    }
  }, [cancelFilters]);

  useEffect(() => {
    const cond =
      nrOfSelectedArrivalAirports === 0 ||
      nrOfSelectedArrivalAirports === selectedArrivalAirports.length - 1;
    if (cond) {
      if (countedAirportSelect) {
        dispatch({ type: "decreaseNumOfFilters" });
        setCountedAirportSelect(false);
      }
    } else {
      if (!countedAirportSelect) {
        setCountedAirportSelect(true);
        dispatch({ type: "increaseNumOfFilters" });
      }
    }
  }, [nrOfSelectedArrivalAirports]);

  useEffect(() => {
    // getting the the list of arrival airports and set the corresponding variable
    const arrivalAirports = [
      {
        name: "Стенстед",
        code: "STN",
        selected: true,
      },
      {
        name: "Хитроу",
        code: "LHR",
        selected: true,
      },
      {
        name: "Гатвик",
        code: "LGW",
        selected: true,
      },
      {
        name: "Лутон",
        code: "LTN",
        selected: true,
      },
      {
        name: "Лондон-Сити",
        code: "LCI",
        selected: true,
      },
    ];
    setSelectedArrivalAirports([
      { name: "all", selected: true },
      ...arrivalAirports,
    ]);
  }, []);
  useEffect(() => {
    const closeAllDropdowns = (evt) => {
      const arrivalTimesDropdown = dom(`#arrivalTimesDropdown_${id}`);

      const cond =
        arrivalTimesDropdown.classList.contains(styles.displayBlock) &&
        !evt.target.classList.contains(styles.timeSelectTwo);
      // arrivalTimesDropdown
      if (cond) {
        arrivalTimesDropdown.classList.remove(styles.displayBlock);
        dom(`#timeSelectTwo_${id} .${styles.arrowIcon} svg`).classList.remove(
          styles.rotate180deg
        );
      }
    };
    window.addEventListener("click", closeAllDropdowns);

    return () => {
      window.removeEventListener("click", closeAllDropdowns);
    };
  }, []);

  const cancelArrivalSettingsOnMouseEnterHandler = () => {
    const floatNotif = dom(`#floatingNotification3_${id}`);
    floatNotif.classList.add(styles.floatingNotificationUp);
    floatNotif.classList.remove(styles.floatingNotificationDown);
  };
  const cancelArrivalSettingsOnMouseLeaveHandler = () => {
    const floatNotif = dom(`#floatingNotification3_${id}`);
    floatNotif.classList.remove(styles.floatingNotificationUp);
    floatNotif.classList.add(styles.floatingNotificationDown);
  };
  const cancelArrivalFilters = () => {
    setArrivalStartTime("00:00");
    setArrivalEndTime("24:00");
    const floatingNotification = dom(`#floatingNotification3_${id}`);
    const cancelFilterIcon = dom(`#cancelFilterIcon3_${id}`);
    cancelFilterIcon.style.display = "none";
    floatingNotification.style.display = "none";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    setSliderTwoValues([0, 720]);
    selectedArrivalAirports.map((item) => (item.selected = true));
    setSelectedArrivalAirports([...selectedArrivalAirports]);
    setNrOfSelectedArrivalAirports(0);
    if (!cancelFilters) {
      if (countedAirportSelect && countedTimeSelect) {
        dispatch({ type: "decreaseNumOfFilters", payload: 2 });
      } else {
        dispatch({ type: "decreaseNumOfFilters" });
      }
    }
    setCountedAirportSelect(false);
    setCountedTimeSelect(false);
  };
  const toggleArrivalTimesDropdown = () => {
    dom(`#arrivalTimesDropdown_${id}`).classList.toggle(styles.displayBlock);
    dom(`#timeSelectTwo_${id} .${styles.arrowIcon} svg`).classList.toggle(
      styles.rotate180deg
    );
  };
  const selectArrivalTime = (timeInterval) => {
    const timeIntervalEmpty = timeInterval === "";
    if (timeIntervalEmpty) {
      cancelArrivalFilters();
      return;
    }
    const start = timeInterval.split("-")[0];
    const end = timeInterval.split("-")[1];
    setArrivalStartTime(start);
    setArrivalEndTime(end);
    displayArrivalCancelIcon();
    if (!countedTimeSelect) {
      dispatch({ type: "increaseNumOfFilters" });
      setCountedTimeSelect(true);
    }
  };
  const displayArrivalCancelIcon = () => {
    const floatingNotification = dom(`#floatingNotification3_${id}`);
    dom(`#cancelFilterIcon3_${id}`).style.display = "block";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    floatingNotification.style.display = "flex";
  };
  const receiveArrivalTimeSliderValues = (value1, value2) => {
    if (!countedTimeSelect) {
      dispatch({ type: "increaseNumOfFilters" });

      setCountedTimeSelect(true);
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

    setArrivalStartTime(rval1);
    setArrivalEndTime(rval2);
  };
  const toggleAirportDropdownTwo = (evt) => {
    const returnCond1 = evt.target.classList.contains(styles.airportWrapper);
    const returnCond2 = evt.target.classList.contains(styles.onHoverText);
    if (returnCond1) return;
    if (returnCond2) return;
    dom(`#airportDropdownTwo_${id}`).classList.toggle(styles.displayFlex);
    dom(`#arrivalAirport_${id} .${styles.arrowIcon} svg`).classList.toggle(
      styles.rotate180deg
    );
  };
  const toggleArrivalAirportCheckbox = (evt, airport) => {
    displayArrivalCancelIcon();
    const returnCond = evt.target.classList.contains(styles.onHoverText);
    if (returnCond) return;
    const hasAirportNameAll = airport.name === "all";
    if (hasAirportNameAll) {
      const isNotAirportSelected = airport.selected === false;
      if (isNotAirportSelected) {
        selectedArrivalAirports.map((item) => {
          item.selected = true;
        });
        setSelectedArrivalAirports([...selectedArrivalAirports]);
      } else {
        selectedArrivalAirports.map((item) => {
          item.selected = false;
        });
        setSelectedArrivalAirports([...selectedArrivalAirports]);
      }
      setNrOfSelectedArrivalAirports(0);
      return;
    }

    let nrOfSelectedItems = 0;
    selectedArrivalAirports.forEach((item) => {
      if (item.selected) nrOfSelectedItems++;
    });
    const cond = nrOfSelectedItems === 1 && airport.selected === true;
    if (cond) {
      selectedArrivalAirports.map((item) => {
        item.selected = true;
      });
      setSelectedArrivalAirports([...selectedArrivalAirports]);
      setNrOfSelectedArrivalAirports(0);

      return;
    }

    selectedArrivalAirports.map((item, index) => {
      const isIndexZero = index === 0;
      if (isIndexZero) {
        const isAirportSelected = airport.selected === true;
        const cond = nrOfSelectedItems === selectedArrivalAirports.length - 2;

        if (isAirportSelected) {
          item.selected = false;
        } else if (cond) {
          item.selected = true;
        }
      }
      const condition = item.name === airport.name;
      if (condition) {
        item.selected = !item.selected;
      }
    });
    setSelectedArrivalAirports([...selectedArrivalAirports]);
    nrOfSelectedItems = 0;
    selectedArrivalAirports.forEach((item) => {
      const cond = item.selected && item.name !== "all";
      if (cond) nrOfSelectedItems++;
    });
    setNrOfSelectedArrivalAirports(nrOfSelectedItems);
  };
  const selectOnlyThisArrivalAirport = (evt, airport) => {
    selectedArrivalAirports.map((item) => {
      const cond = airport.name === item.name;
      if (cond) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setSelectedArrivalAirports([...selectedArrivalAirports]);
    setNrOfSelectedArrivalAirports(1);
  };
  return (
    <div className={styles.arrival}>
      <div className={styles.title}>
        Прилет
        <span
          onMouseEnter={cancelArrivalSettingsOnMouseEnterHandler}
          onMouseLeave={cancelArrivalSettingsOnMouseLeaveHandler}
          onClick={cancelArrivalFilters}
          className={styles.cancelFilterIcon3}
          id={`cancelFilterIcon3_${id}`}
        >
          {cancelFilterIcon}
          <span
            id={`floatingNotification3_${id}`}
            className={styles.floatingNotification3}
          >
            Сбросить выбор
            <span className={styles.arrowDown}></span>
          </span>
        </span>
      </div>

      <div
        onClick={toggleArrivalTimesDropdown}
        id={`timeSelectTwo_${id}`}
        className={styles.timeSelectTwo}
      >
        <div className={styles.timeDisplay}>
          {arrivalStartTime} – {arrivalEndTime}
        </div>
        <div className={styles.arrowIcon}>{arrowIcon}</div>
        <div
          id={`arrivalTimesDropdown_${id}`}
          className={styles.arrivalTimesDropdown}
        >
          <div onClick={() => selectArrivalTime("")}>
            <span>Любое</span>
            <span></span>
          </div>
          <div
            onClick={() => {
              selectArrivalTime("00:00-06:00");
              setSliderTwoValues([0, 180]);
            }}
          >
            <span>Ночь</span>
            <span>00:00–06:00</span>
          </div>
          <div
            onClick={() => {
              selectArrivalTime("06:00-12:00");
              setSliderTwoValues([180, 360]);
            }}
          >
            <span>Утро</span>
            <span>06:00–12:00</span>
          </div>
          <div
            onClick={() => {
              selectArrivalTime("12:00-18:00");
              setSliderTwoValues([360, 540]);
            }}
          >
            <span>День</span>
            <span>12:00–18:00</span>
          </div>
          <div
            onClick={() => {
              selectArrivalTime("18:00-00:00");
              setSliderTwoValues([540, 720]);
            }}
          >
            <span>Вечер</span>
            <span>18:00–00:00</span>
          </div>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <TwoWayRangeSlider
          displayCancelIcon={displayArrivalCancelIcon}
          sliderValues={sliderTwoValues}
          passValues={receiveArrivalTimeSliderValues}
          min={0}
          max={720}
        />
      </div>
      <div
        onClick={toggleAirportDropdownTwo}
        id={`arrivalAirport_${id}`}
        className={styles.arrivalAirport}
      >
        <div className={styles.title}>Аэропорт прилета</div>
        <div className={styles.arrowIcon}>
          <span
            style={
              nrOfSelectedArrivalAirports === 0 ||
              nrOfSelectedArrivalAirports === -1 ||
              nrOfSelectedArrivalAirports === selectedArrivalAirports.length - 1
                ? { display: "none" }
                : {}
            }
            className={styles.selectedAirportsCount}
          >
            {nrOfSelectedArrivalAirports}
          </span>
          {arrowIcon}
        </div>
        <div
          id={`airportDropdownTwo_${id}`}
          className={styles.airportDropdownTwo}
        >
          {selectedArrivalAirports.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  key={index}
                  className={styles.airportWrapper}
                  onClick={(evt) => toggleArrivalAirportCheckbox(evt, item)}
                >
                  <div
                    className={
                      item.selected
                        ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                        : styles.checkBoxContainer
                    }
                  ></div>
                  <div className={styles.text}>Все</div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={styles.airportWrapper}
                onClick={(evt) => toggleArrivalAirportCheckbox(evt, item)}
              >
                <div
                  className={
                    item.selected
                      ? `${styles.checkBoxContainer} ${styles.checkBoxContainerChecked}`
                      : styles.checkBoxContainer
                  }
                ></div>
                <div className={styles.text}>{item.name}</div>
                <div className={styles.airportCode}>
                  <span className={styles.code}>{item.code}</span>
                  <span
                    onClick={(evt) => selectOnlyThisArrivalAirport(evt, item)}
                    className={styles.onHoverText}
                  >
                    только
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
