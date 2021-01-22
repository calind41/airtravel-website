import React, { useState, useEffect, useContext } from "react";
import styles from "./AirportSettings.module.scss";
import { dom } from "../../../../../helpers/reuse";
import { goBackIcon } from "../FiltersModal";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";

export default function AirportSettings({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { dispatch } = useContext(FiltersDispatchContext);
  const { filtersModalInitialState } = state;
  const { airportSettingsInitialState } = filtersModalInitialState;

  const s = airportSettingsInitialState;
  const { depAirport } = s;
  const [arrivalAirports, setArrivalAirports] = useState(s.arrivalAirports);

  useEffect(() => {
    const isAtLeastOneChecked = arrivalAirports.some(
      (item) => item.checked === true
    );
    const arrAirportsCheckedCount = arrivalAirports.filter(
      (item) => item.checked === true
    ).length;

    if (isAtLeastOneChecked) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "airportSettingsCount",
        payload: arrAirportsCheckedCount,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "airportSettingsCount",
        payload: 0,
      });
    }
    dispatch({
      type: "updateAirportSettings",
      fieldName: "arrivalAirports",
      payload: arrivalAirports,
    });
  }, [arrivalAirports]);

  const goBack = () => {
    unmountModalHelper();
    setTimeout(() => {
      unmountModal();
    }, [250]);
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal("applyFilters");
  };

  const dropAllSettings = () => {
    const temp = arrivalAirports.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setArrivalAirports(temp);
  };

  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Аэропорты</div>
        <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
          Сбросить
        </div>
      </div>
      <div className={styles.scrollableContainer}>
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
