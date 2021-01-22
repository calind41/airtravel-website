import React, { useState, useEffect } from "react";
import styles from "./AirportSettings.module.scss";
import { dom } from "../../../../../../helpers/reuse";
import { goBackIcon } from "../FiltersModal";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import SectionTabs from "../../../SectionTabs/SectionTabs";

export default function AirportSettings({
  airportSettingsInitialState,
  setAirportSettingsCount,
  airportSettingsCount,
  airportSettingsInitialState2,
  setAirportSettingsCount2,
  airportSettingsCount2,
  unmountModal,
}) {
  const [selectedTab, setSelectedTab] = useState("tur");
  const [isActiveSection1, setIsActiveSection1] = useState(true);

  const [nrSelSettings1, setNrSelSettings1] = useState(airportSettingsCount);
  const [nrSelSettings2, setNrSelSettings2] = useState(airportSettingsCount2);

  const receiveSelectedSection = (section) => {
    const mainWrapper = dom(`.${styles.scrollableContainer}`);
    const mainWrapper2 = dom(`.${styles.scrollableContainer2}`);
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

  const s = airportSettingsInitialState;
  const s2 = airportSettingsInitialState2;
  const { depAirport } = s;
  const { depAirport2 } = s2;
  const [arrivalAirports, setArrivalAirports] = useState(s.arrivalAirports);
  const [arrivalAirports2, setArrivalAirports2] = useState(s2.arrivalAirports2);

  // tur
  useEffect(() => {
    if (!isActiveSection1) return;
    const isAtLeastOneChecked = arrivalAirports.some(
      (item) => item.checked === true
    );
    const arrAirportsCheckedCount = arrivalAirports.filter(
      (item) => item.checked === true
    ).length;

    if (isAtLeastOneChecked) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      setAirportSettingsCount(arrAirportsCheckedCount);
      setNrSelSettings1(arrAirportsCheckedCount);
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      setAirportSettingsCount(0);
      setNrSelSettings1(0);
    }
  }, [arrivalAirports, isActiveSection1]);

  // end tur

  // retur
  useEffect(() => {
    if (isActiveSection1) return;
    const isAtLeastOneChecked = arrivalAirports2.some(
      (item) => item.checked === true
    );
    const arrAirportsCheckedCount = arrivalAirports2.filter(
      (item) => item.checked === true
    ).length;

    if (isAtLeastOneChecked) {
      dom(`.${styles.dropSettings2}`).classList.add(styles.isVisible);
      setAirportSettingsCount2(arrAirportsCheckedCount);
      setNrSelSettings2(arrAirportsCheckedCount);
    } else {
      dom(`.${styles.dropSettings2}`).classList.remove(styles.isVisible);
      setAirportSettingsCount2(0);
      setNrSelSettings2(0);
    }
  }, [arrivalAirports2, isActiveSection1]);
  // end retur

  const goBack = () => {
    dom(`.${styles.goBackIcon}`).style.transform = "scale(.8)";
    setTimeout(() => {
      unmountModalHelper();
    }, 150);
    setTimeout(() => {
      unmountModal({
        airportSettingsInitialState: {
          depAirport,
          arrivalAirports,
        },
        airportSettingsInitialState2: {
          depAirport2,
          arrivalAirports2,
        },
      });
    }, [500]);
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal(
      {
        airportSettingsInitialState: {
          depAirport,
          arrivalAirports,
        },
        airportSettingsInitialState2: {
          depAirport2,
          arrivalAirports2,
        },
      },
      "applyFilters"
    );
  };

  // tur
  const dropAllSettings = () => {
    const temp = arrivalAirports.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setArrivalAirports(temp);
  };
  // end tur

  // retur
  const dropAllSettings2 = () => {
    const temp = arrivalAirports2.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setArrivalAirports2(temp);
  };
  // end retur

  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Аэропорты</div>
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
          <div
            className={`${styles.scrollableContainer} ${styles.slideRight2}`}
          >
            <div className={styles.departureAirport}>
              <div className={styles.header}>Вылет, Кишинёв</div>
              <CheckboxComponent
                id='departureAirport'
                checked={true}
                disabled={true}
              >
                <div
                  className={`${styles.description} ${styles.descriptionDisabled}`}
                >
                  <div className={styles.title}>{depAirport.name}</div>
                  <div className={styles.subtitle}>{depAirport.code}</div>
                </div>
              </CheckboxComponent>
            </div>

            <div className={styles.arrivalAirports}>
              <div className={styles.header}>Прилет, Лондон</div>
              {arrivalAirports.map((item, idx) => {
                return (
                  <CheckboxComponent
                    key={idx}
                    id={`arrAirport${idx}`}
                    checked={false}
                    index={idx}
                    checked={item.checked}
                    setCheckboxByIndex={setArrivalAirports}
                  >
                    <div className={styles.description}>
                      <div className={styles.title}>{item.name}</div>
                      <div className={styles.subtitle}>{item.code}</div>
                    </div>
                  </CheckboxComponent>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className={`${styles.scrollableContainer2} ${styles.slideLeft2}`}
          >
            <div className={styles.arrivalAirports}>
              <div className={styles.header}>Вылет, Лондон</div>
              {arrivalAirports2.map((item, idx) => {
                return (
                  <CheckboxComponent
                    key={idx}
                    id={`arrAirport2_${idx}`}
                    checked={false}
                    index={idx}
                    checked={item.checked}
                    setCheckboxByIndex={setArrivalAirports2}
                  >
                    <div className={styles.description}>
                      <div className={styles.title}>{item.name}</div>
                      <div className={styles.subtitle}>{item.code}</div>
                    </div>
                  </CheckboxComponent>
                );
              })}
            </div>
            <div className={styles.departureAirport}>
              <div className={styles.header}>Прилет, Кишинёв</div>
              <CheckboxComponent
                id='departureAirport2'
                checked={true}
                disabled={true}
              >
                <div
                  className={`${styles.description} ${styles.descriptionDisabled}`}
                >
                  <div className={styles.title}>{depAirport2.name}</div>
                  <div className={styles.subtitle}>{depAirport2.code}</div>
                </div>
              </CheckboxComponent>
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
