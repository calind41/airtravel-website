import React, { useState, useEffect } from "react";
import styles from "./Arrival.module.scss";
import { cancelFilterIcon, arrowIcon } from "../FilterSettings";
import TwoWayRangeSlider from "../TwoWayRangeSlider/TwoWayRangeSlider";

export default function Arrival({ id, cancelFilters, setNumOfFilters }) {
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
    if (
      nrOfSelectedArrivalAirports === 0 ||
      nrOfSelectedArrivalAirports === selectedArrivalAirports.length - 1
    ) {
      if (countedAirportSelect) {
        setNumOfFilters((prevValue) => prevValue - 1);
        setCountedAirportSelect(false);
      }
    } else {
      if (!countedAirportSelect) {
        setCountedAirportSelect(true);
        setNumOfFilters((prevValue) => prevValue + 1);
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
      const arrivalTimesDropdown = document.querySelector(
        `#arrivalTimesDropdown_${id}`
      );

      // arrivalTimesDropdown
      if (
        arrivalTimesDropdown.classList.contains(styles.displayBlock) &&
        !evt.target.classList.contains(styles.timeSelectTwo)
      ) {
        arrivalTimesDropdown.classList.remove(styles.displayBlock);
        document
          .querySelector(`#timeSelectTwo_${id} .${styles.arrowIcon} svg`)
          .classList.remove(styles.rotate180deg);
      }
    };
    window.addEventListener("click", closeAllDropdowns);

    return () => {
      window.removeEventListener("click", closeAllDropdowns);
    };
  }, []);

  const cancelArrivalSettingsOnMouseEnterHandler = () => {
    const floatNotif = document.querySelector(`#floatingNotification3_${id}`);

    floatNotif.classList.add(styles.floatingNotificationUp);
    floatNotif.classList.remove(styles.floatingNotificationDown);
  };
  const cancelArrivalSettingsOnMouseLeaveHandler = () => {
    const floatNotif = document.querySelector(`#floatingNotification3_${id}`);

    floatNotif.classList.remove(styles.floatingNotificationUp);
    floatNotif.classList.add(styles.floatingNotificationDown);
  };
  const cancelArrivalFilters = () => {
    setArrivalStartTime("00:00");
    setArrivalEndTime("24:00");
    const floatingNotification = document.querySelector(
      `#floatingNotification3_${id}`
    );
    const cancelFilterIcon = document.querySelector(`#cancelFilterIcon3_${id}`);
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
        setNumOfFilters((prevValue) => prevValue - 2);
      } else {
        setNumOfFilters((prevValue) => prevValue - 1);
      }
    }
    setCountedAirportSelect(false);
    setCountedTimeSelect(false);
  };
  const toggleArrivalTimesDropdown = () => {
    document
      .querySelector(`#arrivalTimesDropdown_${id}`)
      .classList.toggle(styles.displayBlock);

    document
      .querySelector(`#timeSelectTwo_${id} .${styles.arrowIcon} svg`)
      .classList.toggle(styles.rotate180deg);
  };
  const selectArrivalTime = (timeInterval) => {
    if (timeInterval === "") {
      cancelArrivalFilters();
      return;
    }
    const start = timeInterval.split("-")[0];
    const end = timeInterval.split("-")[1];
    setArrivalStartTime(start);
    setArrivalEndTime(end);
    displayArrivalCancelIcon();
    if (!countedTimeSelect) {
      setNumOfFilters((prevValue) => prevValue + 1);
      setCountedTimeSelect(true);
    }
  };
  const displayArrivalCancelIcon = () => {
    const floatingNotification = document.querySelector(
      `#floatingNotification3_${id}`
    );
    document.querySelector(`#cancelFilterIcon3_${id}`).style.display = "block";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    floatingNotification.style.display = "flex";
  };
  const receiveArrivalTimeSliderValues = (value1, value2) => {
    if (!countedTimeSelect) {
      setNumOfFilters((prevValue) => prevValue + 1);
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
    if (evt.target.classList.contains(styles.airportWrapper)) return;
    if (evt.target.classList.contains(styles.onHoverText)) return;
    document
      .querySelector(`#airportDropdownTwo_${id}`)
      .classList.toggle(styles.displayFlex);
    document
      .querySelector(`#arrivalAirport_${id} .${styles.arrowIcon} svg`)
      .classList.toggle(styles.rotate180deg);
  };
  const toggleArrivalAirportCheckbox = (evt, airport) => {
    displayArrivalCancelIcon();
    if (evt.target.classList.contains(styles.onHoverText)) return;
    if (airport.name === "all") {
      if (airport.selected === false) {
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
    if (nrOfSelectedItems === 1 && airport.selected === true) {
      selectedArrivalAirports.map((item) => {
        item.selected = true;
      });
      setSelectedArrivalAirports([...selectedArrivalAirports]);
      setNrOfSelectedArrivalAirports(0);

      return;
    }

    selectedArrivalAirports.map((item, index) => {
      if (index === 0) {
        if (airport.selected === true) {
          item.selected = false;
        } else if (nrOfSelectedItems === selectedArrivalAirports.length - 2) {
          item.selected = true;
        }
      }
      if (item.name === airport.name) {
        item.selected = !item.selected;
      }
    });
    setSelectedArrivalAirports([...selectedArrivalAirports]);
    nrOfSelectedItems = 0;
    selectedArrivalAirports.forEach((item) => {
      if (item.selected && item.name !== "all") nrOfSelectedItems++;
    });
    setNrOfSelectedArrivalAirports(nrOfSelectedItems);
  };
  const selectOnlyThisArrivalAirport = (evt, airport) => {
    selectedArrivalAirports.map((item) => {
      if (airport.name === item.name) {
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
