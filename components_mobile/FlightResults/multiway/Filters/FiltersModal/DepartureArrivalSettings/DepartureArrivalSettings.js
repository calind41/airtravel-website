import React, { useState, useEffect } from "react";
import styles from "./DepartureArrivalSettings.module.scss";
import TwoWayRangeSlider from "../../FilterSettings/TwoWayRangeSlider/TwoWayRangeSlider";
import OneWaySlider from "../../FilterSettings/OneWaySlider/OneWaySlider";
import { goBackIcon } from "../FiltersModal";
import { dom } from "../../../../../../helpers/reuse";
import SectionTabs from "../../../SectionTabs/SectionTabs";

export default function DepartureArrivalSettings({
  deppArrSettingsInitialState,
  setDeppArrSettingsCount,
  depArrSettingsCount,
  deppArrSettingsInitialState2,
  setDeppArrSettingsCount2,
  depArrSettingsCount2,
  unmountModal,
}) {
  const [selectedTab, setSelectedTab] = useState("tur");
  const [isActiveSection1, setIsActiveSection1] = useState(true);

  const [nrSelSettings1, setNrSelSettings1] = useState(depArrSettingsCount);
  const [nrSelSettings2, setNrSelSettings2] = useState(depArrSettingsCount2);

  const receiveSelectedSection = (section) => {
    const mainWrapper = dom(`.${styles.main}`);
    const mainWrapper2 = dom(`.${styles.main2}`);

    if (section === "tur") {
      setSelectedTab("tur");
      if (mainWrapper2) {
        mainWrapper2.classList.add(styles.slideLeftReverse);
        setTimeout(() => {
          setIsActiveSection1(true);
        }, 100);
      } else {
        setIsActiveSection1(true);
      }
    } else {
      setSelectedTab("retur");

      if (mainWrapper) {
        mainWrapper.classList.add(styles.slideRightReverse);
        setTimeout(() => {
          setIsActiveSection1(false);
        }, 100);
      } else {
        setIsActiveSection1(false);
      }
    }
  };

  const initS = deppArrSettingsInitialState;
  const initS2 = deppArrSettingsInitialState2;

  // section 1
  const [depSliderValues, setDepSliderValues] = useState(initS.depSliderValues);
  const [depStartTime, setDepStartTime] = useState(initS.depStartTime);
  const [depEndTime, setDepEndTime] = useState(initS.depEndTime);

  const [arrSliderValues, setArrSliderValues] = useState(initS.arrSliderValues);
  const [arrStartTime, setArrStartTime] = useState(initS.arrStartTime);
  const [arrEndTime, setArrEndTime] = useState(initS.arrEndTime);
  const [arrivalStartDate, setArrivalStartDate] = useState(
    initS.arrivalStartDate
  );
  const [arrivalEndDate, setArrivalEndDate] = useState(initS.arrivalEndDate);

  const [flightDurationSliderValue, setFlightDurationSliderValue] = useState(
    initS.flightDurationSliderValue
  );
  const [flightDuration, setFlightDuration] = useState(initS.flightDuration);

  // -- end

  // section 2
  const [depSliderValues2, setDepSliderValues2] = useState(
    initS2.depSliderValues2
  );
  const [depStartTime2, setDepStartTime2] = useState(initS2.depStartTime2);
  const [depEndTime2, setDepEndTime2] = useState(initS2.depEndTime2);

  const [arrSliderValues2, setArrSliderValues2] = useState(
    initS2.arrSliderValues2
  );
  const [arrStartTime2, setArrStartTime2] = useState(initS2.arrStartTime2);
  const [arrEndTime2, setArrEndTime2] = useState(initS2.arrEndTime2);
  const [arrivalStartDate2, setArrivalStartDate2] = useState(
    initS2.arrivalStartDate2
  );
  const [arrivalEndDate2, setArrivalEndDate2] = useState(
    initS2.arrivalEndDate2
  );

  const [flightDurationSliderValue2, setFlightDurationSliderValue2] = useState(
    initS2.flightDurationSliderValue2
  );
  const [flightDuration2, setFlightDuration2] = useState(
    initS2.flightDuration2
  );

  // -- end

  // section 1
  useEffect(() => {
    if (!isActiveSection1) return;
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
      setDeppArrSettingsCount(count);
      setNrSelSettings1(count);
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      setDeppArrSettingsCount(0);
      setNrSelSettings1(0);
    }
  }, [
    depStartTime,
    depEndTime,
    arrStartTime,
    arrEndTime,
    flightDuration,
    isActiveSection1,
  ]);

  // -- end

  // section 2
  useEffect(() => {
    if (isActiveSection1) return;
    const cond1 = depStartTime2 !== "00:00";
    const cond2 = depEndTime2 !== "24:00";
    const cond3 = arrStartTime2 !== "00:00, 13 мар";
    const cond4 = arrEndTime2 !== "24:00, 14 мар";
    const cond5 = flightDuration2 !== "72ч 00м";

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
      dom(`.${styles.dropSettings2}`).classList.add(styles.isVisible);
      setDeppArrSettingsCount2(count);
      setNrSelSettings2(count);
    } else {
      dom(`.${styles.dropSettings2}`).classList.remove(styles.isVisible);
      setDeppArrSettingsCount2(0);
      setNrSelSettings2(0);
    }
  }, [
    depStartTime2,
    depEndTime2,
    arrStartTime2,
    arrEndTime2,
    flightDuration2,
    isActiveSection1,
  ]);

  // -- end

  const goBack = () => {
    dom(`.${styles.goBackIcon}`).style.transform = "scale(.8)";
    setTimeout(() => {
      unmountModalHelper();
    }, 150);
    setTimeout(() => {
      unmountModal({
        deppArrSettingsInitialState: {
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
        },
        deppArrSettingsInitialState2: {
          depSliderValues2,
          depStartTime2,
          depEndTime2,
          arrSliderValues2,
          arrStartTime2,
          arrEndTime2,
          arrivalStartDate2,
          arrivalEndDate2,
          flightDurationSliderValue2,
          flightDuration2,
        },
      });
    }, [500]);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal(
      {
        deppArrSettingsInitialState: {
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
        },
        deppArrSettingsInitialState2: {
          depSliderValues2,
          depStartTime2,
          depEndTime2,
          arrSliderValues2,
          arrStartTime2,
          arrEndTime2,
          arrivalStartDate2,
          arrivalEndDate2,
          flightDurationSliderValue2,
          flightDuration2,
        },
      },
      "applyFilters"
    );
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };

  // section 1
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

    setDepStartTime(rval1);
    setDepEndTime(rval2);
    setDepSliderValues([origV1, origV2]);
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

    setArrStartTime(hours1 + ":" + minutes1);
    setArrEndTime(hours2 + ":" + minutes2);
    setArrSliderValues([origV1, origV2]);
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
    setFlightDuration(rval);
    setFlightDurationSliderValue([origVal]);
  };

  // -- end

  // section 2
  const receiveDepartureTimeSliderValues2 = (
    value1,
    value2,
    origV1,
    origV2
  ) => {
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

    setDepStartTime2(rval1);
    setDepEndTime2(rval2);
    setDepSliderValues2([origV1, origV2]);
  };
  const receiveArrivalTimeSliderValues2 = (value1, value2, origV1, origV2) => {
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

    setArrStartTime2(hours1 + ":" + minutes1);
    setArrEndTime2(hours2 + ":" + minutes2);
    setArrSliderValues2([origV1, origV2]);
  };

  const receiveFlightTimeDurationSliderValue2 = (value, origVal) => {
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
    setFlightDuration2(rval);
    setFlightDurationSliderValue2([origVal]);
  };

  // -- end

  // section 1
  const dropAllSettings = () => {
    setDepStartTime("00:00");
    setDepEndTime("24:00");
    setDepSliderValues([0, 720]);

    setArrStartTime("00:00, 13 мар");
    setArrEndTime("24:00, 14 мар");
    setArrSliderValues([0, 1440]);

    setFlightDuration("72ч 00м");
    setFlightDurationSliderValue([2160]);
  };
  // -- end

  // section 2
  const dropAllSettings2 = () => {
    setDepStartTime2("00:00");
    setDepEndTime2("24:00");
    setDepSliderValues2([0, 720]);

    setArrStartTime2("00:00, 13 мар");
    setArrEndTime2("24:00, 14 мар");
    setArrSliderValues2([0, 1440]);

    setFlightDuration2("72ч 00м");
    setFlightDurationSliderValue2([2160]);
  };
  // -- end
  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Время</div>
        {isActiveSection1 ? (
          <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
            Сбросить
          </div>
        ) : (
          <div onClick={dropAllSettings2} className={`${styles.dropSettings2}`}>
            Сбросить
          </div>
        )}
      </div>
      <SectionTabs
        iconTur='plane'
        iconRetur='plane'
        selectedTab={selectedTab}
        passSelectedOption={receiveSelectedSection}
        fromFiltersModal={true}
        nrSelSettings1={nrSelSettings1}
        nrSelSettings2={nrSelSettings2}
      />
      <div className={styles.sidesWrapper}>
        {isActiveSection1 ? (
          <div className={`${styles.main} ${styles.slideRight2}`}>
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
        ) : (
          <div className={`${styles.main2} ${styles.slideLeft2}`}>
            <div className={styles.header}>Лондон – Кишинёв </div>

            <div className={styles.departure}>
              <div className={styles.heading}>
                <div className={styles.name}>Вылет</div>
                <div className={styles.timeInterval}>
                  {depStartTime2}–{depEndTime2}
                </div>
              </div>
              <TwoWayRangeSlider
                sliderValues={depSliderValues2}
                passValues={receiveDepartureTimeSliderValues2}
                min={0}
                max={720}
              />
            </div>

            <div className={styles.arrival}>
              <div className={styles.heading}>
                <div className={styles.name}>Прилет</div>
                <div className={styles.timeInterval}>
                  {arrStartTime2}–{arrEndTime2}
                </div>
              </div>
              <TwoWayRangeSlider
                sliderValues={arrSliderValues2}
                passValues={receiveArrivalTimeSliderValues2}
                min={0}
                max={1440}
              />
            </div>

            <div className={styles.flightDuration}>
              <div className={styles.heading}>
                <div className={styles.name}>В пути</div>
                <div className={styles.timeInterval}>до {flightDuration2}</div>
              </div>
              <OneWaySlider
                sliderValue={flightDurationSliderValue2}
                passValue={receiveFlightTimeDurationSliderValue2}
                min={90}
                max={2160}
              />
            </div>
          </div>
        )}
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
