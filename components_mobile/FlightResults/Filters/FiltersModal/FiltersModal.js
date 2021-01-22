import React, { useState, useEffect, useContext } from "react";
import BaggageSettings from "./BaggageSettings/BaggageSettings";
import TransferSettings from "./TransferSettings/TransferSettings";
import DepartureArrivalSettings from "./DepartureArrivalSettings/DepartureArrivalSettings";
import AircompanySettings from "./AircompanySettings/AircompanySettings";
import AirportSettings from "./AirportSettings/AirportSettings";
import SellerSettings from "./SellerSettings/SellerSettings";
import styles from "./FiltersModal.module.scss";
import { dom } from "../../../../helpers/reuse";
import { FiltersStateContext, FiltersDispatchContext } from "../Filters";
import { fmis } from "../filtersReducer";

export default function FiltersModal({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { dispatch } = useContext(FiltersDispatchContext);
  const { filtersModalInitialState } = state;
  const {
    withBaggageSelected,
    directFlightSelected,
    renderBaggageSettingsModal,
    renderTransferSettingsModal,
    renderDepartureArrivalSettingsModal,
    renderAircompanySettingsModal,
    renderAirportSettingsModal,
    renderSellerSettingsModal,
    baggageSettingCount,
    transferSettingsCount,
    nrTransfersInitialState,
    depArrSettingsCount,
    airCompSettingsCount,
    airportSettingsCount,
    sellerSettingsCount,
  } = filtersModalInitialState;

  const { noTransfer, oneTransfer, twoPlusTransfer } = nrTransfersInitialState;

  useEffect(() => {
    const htmlElem = dom("html");
    htmlElem.style.overflow = "hidden";
    return () => {
      htmlElem.style = {};
    };
  }, []);
  useEffect(() => {
    updateDropSettingsVisibility();
  }, [filtersModalInitialState, withBaggageSelected, directFlightSelected]);

  const selectOption = (option) => {
    if (option === "withBaggage") {
      if (!withBaggageSelected) {
        dispatch({
          type: "selectOptionWithBaggage",
        });
        // dispatch({
        //   type: "field",
        //   fieldName: "baggageSettingsInitialState",
        //   payload: {
        //     checkedWithBaggage: true,
        //     checkedWithoutBaggage: false,
        //   },
        // });
        // setBaggageSettingCount(1);
        // setBaggageSettingsInitialState({
        //   checkedWithBaggage: true,
        //   checkedWithoutBaggage: false,
        // });
      } else {
        // setBaggageSettingCount(0);
        // setBaggageSettingsInitialState({
        //   checkedWithBaggage: false,
        //   checkedWithoutBaggage: false,
        // });
        dispatch({ type: "deselectOptionWithBaggage" });
      }

      // setWithBaggageSelected((prevValue) => !prevValue);
    } else if (option === "directFlight") {
      if (directFlightSelected === false) {
        dispatch({ type: "selectOptionDirectFlight" });
        // setNrTransfersInitialState({
        //   noTransfer: true,
        //   oneTransfer: false,
        //   twoPlusTransfer: false,
        // });
        // setTransferCitiesInitialState((prevValue) => {
        //   return prevValue.map((item) => ({ ...item, checked: false }));
        // });
        // setTransferSettingsCount(1);
      } else {
        // setNrTransfersInitialState({
        //   noTransfer: false,
        //   oneTransfer: false,
        //   twoPlusTransfer: false,
        // });
        // setTransferSettingsCount(0);
        dispatch({ type: "deselectOptionDirectFlight" });
      }
      // setDirectFlightSelected((prevValue) => !prevValue);
    }
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  const applyFilters = (state) => {
    let settingsAppliedCount = 0;
    if (withBaggageSelected || baggageSettingCount !== 0) {
      settingsAppliedCount++;
    }
    if (directFlightSelected || transferSettingsCount !== 0) {
      settingsAppliedCount++;
    }
    settingsAppliedCount += [
      depArrSettingsCount,
      airCompSettingsCount,
      airportSettingsCount,
      sellerSettingsCount,
    ].filter((item) => item !== 0).length;

    unmountModalHelper();
    setTimeout(() => {
      let stateObj = {
        settingsAppliedCount,
      };
      if (state) {
        stateObj = {
          ...stateObj,
          ...state,
        };
      }
      unmountModal(stateObj);
    }, 250);
  };

  const [showDropSettings, setShowDropSettings] = useState(false);
  const updateDropSettingsVisibility = () => {
    const cond =
      baggageSettingCount !== 0 ||
      transferSettingsCount !== 0 ||
      depArrSettingsCount !== 0 ||
      airCompSettingsCount !== 0 ||
      airportSettingsCount !== 0 ||
      sellerSettingsCount !== 0 ||
      withBaggageSelected ||
      directFlightSelected;
    if (cond) {
      setShowDropSettings(true);
    } else {
      setShowDropSettings(false);
    }
  };

  const openBaggageSettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderBaggageSettingsModal",
      payload: true,
    });
  };
  const unmountBaggageSettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderBaggageSettingsModal",
      payload: false,
    });
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };

  const openTransferSettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderTransferSettingsModal",
      payload: true,
    });
  };
  const unmountTransferSettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderTransferSettingsModal",
      payload: false,
    });

    if (oneTransfer || twoPlusTransfer) {
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "directFlightSelected",
        payload: false,
      });
    } else if (noTransfer) {
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "directFlightSelected",
        payload: true,
      });
    } else if (!noTransfer) {
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "directFlightSelected",
        payload: false,
      });
    }
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };

  const openDepArrSettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderDepartureArrivalSettingsModal",
      payload: true,
    });
  };
  const unmountDepArrSettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderDepartureArrivalSettingsModal",
      payload: false,
    });
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };

  const unmountAircompanySettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderAircompanySettingsModal",
      payload: false,
    });
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };
  const openAircompanySettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderAircompanySettingsModal",
      payload: true,
    });
  };

  const unmountAirportSettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderAirportSettingsModal",
      payload: false,
    });
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };
  const openAirportSettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderAirportSettingsModal",
      payload: true,
    });
  };

  const unmountSellerSettingsModal = (from) => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderSellerSettingsModal",
      payload: false,
    });
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters();
    }
  };
  const openSellerSettingsModal = () => {
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "renderSellerSettingsModal",
      payload: true,
    });
  };

  const dropAllSettings = () => {
    dispatch({
      type: "field",
      fieldName: "filtersModalInitialState",
      payload: fmis,
    });
    dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
  };
  return (
    <>
      <div className={`${styles.container} ${styles.slideLeft}`}>
        <div className={styles.header}>
          <div
            onClick={(evt) => {
              evt.persist();
              applyFilters();
            }}
            className={styles.goBackIcon}
          >
            {goBackIcon}
          </div>
          <div className={styles.title}>Фильтры</div>
          <div
            onClick={dropAllSettings}
            className={
              showDropSettings
                ? `${styles.dropSettings} ${styles.isVisible}`
                : `${styles.dropSettings} `
            }
          >
            Сбросить
          </div>
        </div>
        <div className={styles.options}>
          <button
            onClick={() => selectOption("withBaggage")}
            className={
              withBaggageSelected
                ? `${styles.withBaggage} ${styles.optionSelected}`
                : `${styles.withBaggage}`
            }
          >
            С багажом
          </button>
          <button
            onClick={() => {
              selectOption("directFlight");
            }}
            className={
              directFlightSelected
                ? `${styles.directFlight} ${styles.optionSelected}`
                : `${styles.directFlight}`
            }
          >
            Прямые рейсы
          </button>
        </div>
        <div className={styles.settingsList}>
          <div
            onClick={openBaggageSettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Багаж</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  baggageSettingCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {baggageSettingCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
          <div
            onClick={openTransferSettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Пересадки</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  transferSettingsCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {transferSettingsCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
          <div
            onClick={openDepArrSettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Вылет – Прилет</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  depArrSettingsCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {depArrSettingsCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
          <div
            onClick={openAircompanySettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Авиакомпании</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  airCompSettingsCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {airCompSettingsCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
          <div
            onClick={openAirportSettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Аэропорты</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  airportSettingsCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {airportSettingsCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
          <div
            onClick={openSellerSettingsModal}
            className={styles.settingWrapper}
          >
            <div className={styles.title}>Продавец</div>
            <div className={styles.arrowRightIcon}>
              <div
                style={
                  sellerSettingsCount === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {sellerSettingsCount}
              </div>
              {arrowRightIcon}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <div className={styles.title}>от 320$</div>
            <div className={styles.subtitle}>1 из 400 вариантов</div>
          </div>
          <div
            onClick={(evt) => {
              evt.persist();
              applyFilters();
            }}
            className={styles.showButton}
          >
            Показать
          </div>
        </div>
      </div>
      {renderBaggageSettingsModal ? (
        <BaggageSettings unmountModal={unmountBaggageSettingsModal} />
      ) : null}
      {renderTransferSettingsModal ? (
        <TransferSettings unmountModal={unmountTransferSettingsModal} />
      ) : null}
      {renderDepartureArrivalSettingsModal ? (
        <DepartureArrivalSettings unmountModal={unmountDepArrSettingsModal} />
      ) : null}
      {renderAircompanySettingsModal ? (
        <AircompanySettings unmountModal={unmountAircompanySettingsModal} />
      ) : null}
      {renderAirportSettingsModal ? (
        <AirportSettings unmountModal={unmountAirportSettingsModal} />
      ) : null}
      {renderSellerSettingsModal ? (
        <SellerSettings unmountModal={unmountSellerSettingsModal} />
      ) : null}
    </>
  );
}

export const goBackIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M14.707 17.293a1 1 0 01-1.414 1.414L8 13.414a2 2 0 010-2.828l5.293-5.293a1 1 0 011.414 1.414L9.414 12l5.293 5.293z'
      fill='currentColor'
    ></path>
  </svg>
);

const arrowRightIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M10.707 18.707a1 1 0 11-1.414-1.414L14.586 12 9.293 6.707a1 1 0 111.414-1.414L16 10.586a2 2 0 010 2.828l-5.293 5.293z'
      fill='currentColor'
    ></path>
  </svg>
);
