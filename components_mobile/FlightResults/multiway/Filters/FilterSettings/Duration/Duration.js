import React, { useState, useEffect } from "react";
import styles from "./Duration.module.scss";
import { cancelFilterIcon, arrowIcon } from "../FilterSettings";
import TwoWayRangeSlider from "../TwoWayRangeSlider/TwoWayRangeSlider";

export default function Duration({ id, cancelFilters, setNumOfFilters }) {
  const [durationStartTime, setDurationStartTime] = useState("3ч 00м");
  const [durationEndTime, setDurationEndTime] = useState("71ч 30м");
  const [sliderThreeValues, setSliderThreeValues] = useState([90, 2160]);
  const [nrOfSelectedTransferCities, setNrOfSelectedTransferCities] = useState(
    -1
  );
  const [selectedTransferCities, setSelectedTransferCities] = useState([]);

  const [countedTimeSelect, setCountedTimeSelect] = useState(false);
  const [countedTransferCitySelect, setCountedTransferCitySelect] = useState(
    false
  );

  useEffect(() => {
    if (cancelFilters) {
      cancelDurationFilters();
      // setNumOfFilters(0);
    }
  }, [cancelFilters]);

  useEffect(() => {
    if (
      nrOfSelectedTransferCities === 0 ||
      nrOfSelectedTransferCities === selectedTransferCities.length - 1
    ) {
      if (countedTransferCitySelect) {
        setNumOfFilters((prevValue) => prevValue - 1);
        setCountedTransferCitySelect(false);
      }
    } else {
      if (!countedTransferCitySelect) {
        setCountedTransferCitySelect(true);
        setNumOfFilters((prevValue) => prevValue + 1);
      }
    }
  }, [nrOfSelectedTransferCities]);

  useEffect(() => {
    const transferCities = [
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

    setSelectedTransferCities([
      { name: "all", selected: true },
      ...transferCities,
    ]);
  }, []);

  const cancelDurationSettingsOnMouseEnterHandler = () => {
    const floatNotif = document.querySelector(`#floatingNotification4_${id}`);
    floatNotif.classList.add(styles.floatingNotificationUp);
    floatNotif.classList.remove(styles.floatingNotificationDown);
  };
  const cancelDurationSettingsOnMouseLeaveHandler = () => {
    const floatNotif = document.querySelector(`#floatingNotification4_${id}`);

    floatNotif.classList.remove(styles.floatingNotificationUp);
    floatNotif.classList.add(styles.floatingNotificationDown);
  };
  const cancelDurationFilters = () => {
    setDurationStartTime("3ч 00м");
    setDurationEndTime("71ч 30м");
    const floatingNotification = document.querySelector(
      `#floatingNotification4_${id}`
    );
    const cancelFilterIcon = document.querySelector(`#cancelFilterIcon4_${id}`);
    cancelFilterIcon.style.display = "none";
    floatingNotification.style.display = "none";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    setSliderThreeValues([90, 2160]);
    selectedTransferCities.map((item) => (item.selected = true));
    setSelectedTransferCities([...selectedTransferCities]);
    setNrOfSelectedTransferCities(0);

    if (!cancelFilters) {
      if (countedTransferCitySelect && countedTimeSelect) {
        setNumOfFilters((prevValue) => prevValue - 2);
      } else {
        setNumOfFilters((prevValue) => prevValue - 1);
      }
    }
    setCountedTransferCitySelect(false);
    setCountedTimeSelect(false);
  };
  const displayDurationCancelIcon = () => {
    const floatingNotification = document.querySelector(
      `#floatingNotification4_${id}`
    );
    document.querySelector(`#cancelFilterIcon4_${id}`).style.display = "block";
    floatingNotification.classList.remove(styles.floatingNotificationDown);
    floatingNotification.classList.remove(styles.floatingNotificationUp);
    floatingNotification.style.display = "flex";
  };
  const receiveDurationTimeSliderValues = (value1, value2) => {
    if (!countedTimeSelect) {
      setNumOfFilters((prevValue) => prevValue + 1);
      setCountedTimeSelect(true);
    }
    let rval1 = Math.round(value1);
    let rval2 = Math.round(value2);

    const diff1 = value1 - rval1;
    const diff2 = value2 - rval2;

    // 2.3 - 2 > 0
    if (diff1 > 0) {
      rval1 = rval1 + "ч 30м";
    }
    // 2.6 - 3 <= 0
    if (diff1 <= 0) {
      rval1 = rval1 + "ч 00м";
    }

    // 2.3 - 2 > 0
    if (diff2 > 0) {
      rval2 = rval2 + "ч 30м";
    }
    // 2.6 - 3 <= 0
    if (diff2 <= 0) {
      rval2 = rval2 + "ч 00м";
    }

    if (value2 === 72) {
      rval2 = "71ч 30м";
    }
    if (value1 === 72) {
      rval1 = "71ч 30м";
    }

    setDurationStartTime(rval1);
    setDurationEndTime(rval2);
  };
  const toggleAirportDropdownThree = (evt) => {
    if (evt.target.classList.contains(styles.tranferCityWrapper)) return;
    if (evt.target.classList.contains(styles.onHoverText)) return;
    document
      .querySelector(`#airportDropdownThree_${id}`)
      .classList.toggle(styles.displayFlex);
    document
      .querySelector(`#transferCity_${id} .${styles.arrowIcon} svg`)
      .classList.toggle(styles.rotate180deg);
  };
  const toggleTransferCityCheckbox = (evt, airport) => {
    displayDurationCancelIcon();
    if (evt.target.classList.contains(styles.onHoverText)) return;
    if (airport.name === "all") {
      if (airport.selected === false) {
        selectedTransferCities.map((item) => {
          item.selected = true;
        });
        setSelectedTransferCities([...selectedTransferCities]);
      } else {
        selectedTransferCities.map((item) => {
          item.selected = false;
        });
        setSelectedTransferCities([...selectedTransferCities]);
      }
      setNrOfSelectedTransferCities(0);
      return;
    }

    let nrOfSelectedItems = 0;
    selectedTransferCities.forEach((item) => {
      if (item.selected) nrOfSelectedItems++;
    });
    if (nrOfSelectedItems === 1 && airport.selected === true) {
      selectedTransferCities.map((item) => {
        item.selected = true;
      });
      setSelectedTransferCities([...selectedTransferCities]);
      setNrOfSelectedTransferCities(0);
      return;
    }

    selectedTransferCities.map((item, index) => {
      if (index === 0) {
        if (airport.selected === true) {
          item.selected = false;
        } else if (nrOfSelectedItems === selectedTransferCities.length - 2) {
          item.selected = true;
        }
      }
      if (item.name === airport.name) {
        item.selected = !item.selected;
      }
    });
    setSelectedTransferCities([...selectedTransferCities]);
    nrOfSelectedItems = 0;
    selectedTransferCities.forEach((item) => {
      if (item.selected && item.name !== "all") nrOfSelectedItems++;
    });
    setNrOfSelectedTransferCities(nrOfSelectedItems);
  };
  const selectOnlyThisTransferAirport = (evt, airport) => {
    selectedTransferCities.map((item) => {
      if (airport.name === item.name) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setSelectedTransferCities([...selectedTransferCities]);
    setNrOfSelectedTransferCities(1);
  };
  return (
    <div className={styles.duration}>
      <div className={styles.title}>
        В пути
        <span
          onMouseEnter={cancelDurationSettingsOnMouseEnterHandler}
          onMouseLeave={cancelDurationSettingsOnMouseLeaveHandler}
          onClick={cancelDurationFilters}
          className={styles.cancelFilterIcon4}
          id={`cancelFilterIcon4_${id}`}
        >
          {cancelFilterIcon}
          <span
            id={`floatingNotification4_${id}`}
            className={styles.floatingNotification4}
          >
            Сбросить выбор
            <span className={styles.arrowDown}></span>
          </span>
        </span>
      </div>

      <div className={styles.timeSelectThree}>
        <div className={styles.timeDisplay}>
          {durationStartTime} – {durationEndTime}
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <TwoWayRangeSlider
          displayCancelIcon={displayDurationCancelIcon}
          sliderValues={sliderThreeValues}
          passValues={receiveDurationTimeSliderValues}
          min={90}
          max={2160}
        />
      </div>
      <div
        onClick={toggleAirportDropdownThree}
        id={`transferCity_${id}`}
        className={styles.transferCity}
      >
        <div className={styles.title}>Город пересадки</div>
        <div className={styles.arrowIcon}>
          <span
            style={
              nrOfSelectedTransferCities === 0 ||
              nrOfSelectedTransferCities === -1 ||
              nrOfSelectedTransferCities === selectedTransferCities.length - 1
                ? { display: "none" }
                : {}
            }
            className={styles.selectedTransferCitiesCount}
          >
            {nrOfSelectedTransferCities}
          </span>
          {arrowIcon}
        </div>
        <div
          id={`airportDropdownThree_${id}`}
          className={styles.airportDropdownThree}
        >
          {selectedTransferCities.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  className={styles.tranferCityWrapper}
                  onClick={(evt) => toggleTransferCityCheckbox(evt, item)}
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
                className={styles.tranferCityWrapper}
                onClick={(evt) => toggleTransferCityCheckbox(evt, item)}
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
                    onClick={(evt) => selectOnlyThisTransferAirport(evt, item)}
                    className={styles.onHoverText}
                  >
                    только
                  </span>
                </div>
              </div>
            );
            1;
          })}
        </div>
      </div>
    </div>
  );
}
