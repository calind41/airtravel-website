import React, { useState, useEffect } from "react";
import BaggageSettings from "./BaggageSettings/BaggageSettings";
import TransferSettings from "./TransferSettings/TransferSettings";
import DepartureArrivalSettings from "./DepartureArrivalSettings/DepartureArrivalSettings";
import AircompanySettings from "./AircompanySettings/AircompanySettings";
import AirportSettings from "./AirportSettings/AirportSettings";
import SellerSettings from "./SellerSettings/SellerSettings";
import styles from "./FiltersModal.module.scss";
import { dom } from "../../../../../helpers/reuse";
import { transfCities, aircList, arrAirports, sellerList } from "../Filters";

export default function FiltersModal({ initialState, unmountModal }) {
  const s = initialState;
  const [withBaggageSelected, setWithBaggageSelected] = useState(
    s.withBaggageSelected
  );
  const [directFlightSelected, setDirectFlightSelected] = useState(
    s.directFlightSelected
  );
  const [renderBaggageSettingsModal, setRenderBaggageSettingsModal] = useState(
    s.renderBaggageSettingsModal
  );
  const [
    renderTransferSettingsModal,
    setRenderTransferSettingsModal,
  ] = useState(s.renderTransferSettingsModal);
  const [
    renderDepartureArrivalSettingsModal,
    setRenderDepartureArrivalSettingsModal,
  ] = useState(s.renderDepartureArrivalSettingsModal);
  const [
    renderAircompanySettingsModal,
    setRenderAircompanySettingsModal,
  ] = useState(s.renderAircompanySettingsModal);
  const [renderAirportSettingsModal, setRenderAirportSettingsModal] = useState(
    s.renderAirportSettingsModal
  );
  const [renderSellerSettingsModal, setRenderSellerSettingsModal] = useState(
    s.renderSellerSettingsModal
  );

  useEffect(() => {
    const htmlElem = dom("html");
    htmlElem.style.overflow = "hidden";
    return () => {
      htmlElem.style = {};
    };
  }, []);
  useEffect(() => {
    updateDropSettingsVisibility();
  }, [initialState]);

  useEffect(() => {
    updateDropSettingsVisibility();
  }, [withBaggageSelected, directFlightSelected]);

  const selectOption = (option) => {
    if (option === "withBaggage") {
      if (!withBaggageSelected) {
        setBaggageSettingCount(1);
        setBaggageSettingsInitialState({
          checkedWithBaggage: true,
          checkedWithoutBaggage: false,
        });
      } else {
        setBaggageSettingCount(0);
        setBaggageSettingsInitialState({
          checkedWithBaggage: false,
          checkedWithoutBaggage: false,
        });
      }

      setWithBaggageSelected((prevValue) => !prevValue);
    } else if (option === "directFlight") {
      if (directFlightSelected === false) {
        setNrTransfersInitialState({
          noTransfer: true,
          oneTransfer: false,
          twoPlusTransfer: false,
        });
        setNrTransfersInitialState2({
          noTransfer2: true,
          oneTransfer2: false,
          twoPlusTransfer2: false,
        });
        setTransferCitiesInitialState((prevValue) => {
          return prevValue.map((item) => ({ ...item, checked: false }));
        });
        setTransferCitiesInitialState2((prevValue) => {
          return prevValue.map((item) => ({ ...item, checked: false }));
        });
        setTransferSettingsCount(1);
        setTransferSettingsCount2(1);
      } else {
        setNrTransfersInitialState({
          noTransfer: false,
          oneTransfer: false,
          twoPlusTransfer: false,
        });
        setNrTransfersInitialState2({
          noTransfer2: false,
          oneTransfer2: false,
          twoPlusTransfer2: false,
        });
        setTransferSettingsCount(0);
        setTransferSettingsCount2(0);
      }
      setDirectFlightSelected((prevValue) => !prevValue);
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
      depArrSettingsCount2,
      airCompSettingsCount,
      airportSettingsCount,
      airportSettingsCount2,
      sellerSettingsCount,
    ].filter((item) => item !== 0).length;

    unmountModalHelper();
    setTimeout(() => {
      let stateObj = {
        withBaggageSelected,
        directFlightSelected,
        renderBaggageSettingsModal: false,
        renderTransferSettingsModal: false,
        renderDepartureArrivalSettingsModal: false,
        renderAircompanySettingsModal: false,
        renderAirportSettingsModal: false,
        renderSellerSettingsModal: false,
        baggageSettingCount,
        baggageSettingsInitialState,
        transferSettingsCount,
        nrTransfersInitialState,
        transferCitiesInitialState,
        transferSettingsCount2,
        nrTransfersInitialState2,
        transferCitiesInitialState2,
        depArrSettingsCount,
        deppArrSettingsInitialState,
        depArrSettingsCount2,
        deppArrSettingsInitialState2,
        airCompSettingsCount,
        airCompSettingsInitialState,

        airportSettingsCount,
        airportSettingsInitialState,
        airportSettingsCount2,
        airportSettingsInitialState2,

        sellerSettingsCount,
        sellerSettingsInitialState,
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
      transferSettingsCount2 !== 0 ||
      depArrSettingsCount !== 0 ||
      depArrSettingsCount2 !== 0 ||
      airCompSettingsCount !== 0 ||
      airportSettingsCount !== 0 ||
      airportSettingsCount2 !== 0 ||
      sellerSettingsCount !== 0 ||
      withBaggageSelected ||
      directFlightSelected;
    if (cond) {
      setShowDropSettings(true);
    } else {
      setShowDropSettings(false);
    }
  };

  const [baggageSettingCount, setBaggageSettingCount] = useState(
    s.baggageSettingCount
  );
  const [
    baggageSettingsInitialState,
    setBaggageSettingsInitialState,
  ] = useState(s.baggageSettingsInitialState);
  const openBaggageSettingsModal = () => {
    setRenderBaggageSettingsModal(true);
  };
  const unmountBaggageSettingsModal = (state, from) => {
    const s = state.baggageSettingsInitialState;
    if (s.checkedWithoutBaggage || !s.checkedWithBaggage) {
      setWithBaggageSelected(false);
    } else if (s.checkedWithBaggage) {
      setWithBaggageSelected(true);
    }
    setRenderBaggageSettingsModal(false);
    setBaggageSettingsInitialState(s);
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters({ ...state, baggageSettingCount });
    }
  };

  // tur
  const [transferSettingsCount, setTransferSettingsCount] = useState(
    s.transferSettingsCount
  );
  const [nrTransfersInitialState, setNrTransfersInitialState] = useState(
    s.nrTransfersInitialState
  );
  const [transferCitiesInitialState, setTransferCitiesInitialState] = useState(
    s.transferCitiesInitialState
  );

  // -- end tur

  // retur
  const [transferSettingsCount2, setTransferSettingsCount2] = useState(
    s.transferSettingsCount2
  );
  const [nrTransfersInitialState2, setNrTransfersInitialState2] = useState(
    s.nrTransfersInitialState2
  );
  const [
    transferCitiesInitialState2,
    setTransferCitiesInitialState2,
  ] = useState(s.transferCitiesInitialState2);
  // -- end retur

  const openTransferSettingsModal = () => {
    setRenderTransferSettingsModal(true);
  };
  const unmountTransferSettingsModal = (state, from) => {
    const nrT = state.nrTransfersInitialState;
    const nrT2 = state.nrTransfersInitialState2;
    setRenderTransferSettingsModal(false);

    setNrTransfersInitialState(nrT);
    setNrTransfersInitialState2(nrT2);

    setTransferCitiesInitialState(state.transferCitiesInitialState);
    setTransferCitiesInitialState2(state.transferCitiesInitialState2);

    if (
      nrT.oneTransfer ||
      nrT.twoPlusTransfer ||
      nrT2.oneTransfer2 ||
      nrT2.twoPlusTransfer2
    ) {
      setDirectFlightSelected(false);
    } else if (nrT.noTransfer || nrT2.noTransfer2) {
      setDirectFlightSelected(true);
    } else if (!nrT.noTransfer || !nrT2.noTransfer2) {
      setDirectFlightSelected(false);
    }
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters(state);
    }
  };

  // tur
  const [depArrSettingsCount, setDeppArrSettingsCount] = useState(
    s.depArrSettingsCount
  );
  const [
    deppArrSettingsInitialState,
    setDeppArrSettingsInitialState,
  ] = useState(s.deppArrSettingsInitialState);

  // -- end tur

  // retur
  const [depArrSettingsCount2, setDeppArrSettingsCount2] = useState(
    s.depArrSettingsCount2
  );
  const [
    deppArrSettingsInitialState2,
    setDeppArrSettingsInitialState2,
  ] = useState(s.deppArrSettingsInitialState2);
  // -- end retur

  const openDepArrSettingsModal = () => {
    setRenderDepartureArrivalSettingsModal(true);
  };
  const unmountDepArrSettingsModal = (state, from) => {
    setRenderDepartureArrivalSettingsModal(false);
    setDeppArrSettingsInitialState(state.deppArrSettingsInitialState);
    setDeppArrSettingsInitialState2(state.deppArrSettingsInitialState2);
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters(state);
    }
  };

  const [airCompSettingsCount, setAirCompSettingsCount] = useState(
    s.airCompSettingsCount
  );
  const [
    airCompSettingsInitialState,
    setAirCompSettingsInitialState,
  ] = useState(s.airCompSettingsInitialState);

  const unmountAircompanySettingsModal = (state, from) => {
    setRenderAircompanySettingsModal(false);
    setAirCompSettingsInitialState(state.airCompSettingsInitialState);
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters(state);
    }
  };
  const openAircompanySettingsModal = () => {
    setRenderAircompanySettingsModal(true);
  };

  // tur
  const [airportSettingsCount, setAirportSettingsCount] = useState(
    s.airportSettingsCount
  );
  const [
    airportSettingsInitialState,
    setAirportSettingsInitialState,
  ] = useState(s.airportSettingsInitialState);
  // -- end tur

  // retur
  const [airportSettingsCount2, setAirportSettingsCount2] = useState(
    s.airportSettingsCount2
  );
  const [
    airportSettingsInitialState2,
    setAirportSettingsInitialState2,
  ] = useState(s.airportSettingsInitialState2);
  // -- end retur

  const unmountAirportSettingsModal = (state, from) => {
    setRenderAirportSettingsModal(false);
    setAirportSettingsInitialState(state.airportSettingsInitialState);
    setAirportSettingsInitialState2(state.airportSettingsInitialState2);
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters(state);
    }
  };
  const openAirportSettingsModal = () => {
    setRenderAirportSettingsModal(true);
  };

  const [sellerSettingsCount, setSellerSettingsCount] = useState(
    s.sellerSettingsCount
  );
  const [sellerSettingsInitialState, setSellerSettingsInitialState] = useState(
    s.sellerSettingsInitialState
  );
  const unmountSellerSettingsModal = (state, from) => {
    setRenderSellerSettingsModal(false);
    setSellerSettingsInitialState(state.sellerSettingsInitialState);
    updateDropSettingsVisibility();
    if (from && from === "applyFilters") {
      applyFilters(state);
    }
  };
  const openSellerSettingsModal = () => {
    setRenderSellerSettingsModal(true);
  };

  const dropAllSettings = () => {
    setWithBaggageSelected(false);
    setDirectFlightSelected(false);
    setBaggageSettingCount(0);
    setBaggageSettingsInitialState({
      checkedWithBaggage: false,
      checkedWithoutBaggage: false,
    });
    setTransferSettingsCount(0);
    setNrTransfersInitialState({
      noTransfer: false,
      oneTransfer: false,
      twoPlusTransfer: false,
    });
    setTransferCitiesInitialState(transfCities);

    setTransferSettingsCount2(0);
    setNrTransfersInitialState2({
      noTransfer2: false,
      oneTransfer2: false,
      twoPlusTransfer2: false,
    });
    setTransferCitiesInitialState2(transfCities);

    setDeppArrSettingsCount(0);
    setDeppArrSettingsInitialState({
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
    });
    setDeppArrSettingsCount2(0);
    setDeppArrSettingsInitialState2({
      depSliderValues2: [0, 720],
      depStartTime2: "00:00",
      depEndTime2: "24:00",
      arrSliderValues2: [0, 1440],
      arrStartTime2: "00:00, 13 мар",
      arrEndTime2: "24:00, 14 мар",
      arrivalStartDate2: "13 мар",
      arrivalEndDate2: "14 мар",
      flightDurationSliderValue2: [2160],
      flightDuration2: "72ч 00м",
    });

    setAirCompSettingsCount(0);
    setAirCompSettingsInitialState({
      oneWorldAlliance: false,
      skyTeamAlliance: false,
      starAlliance: false,
      checkedChooseAll: false,
      aircompanyList: aircList,
    });

    setAirportSettingsCount(0);
    setAirportSettingsInitialState({
      arrivalAirports: arrAirports,
      depAirport: {
        name: "Кишинёв",
        code: "KIV",
      },
    });
    setAirportSettingsCount2(0);
    setAirportSettingsInitialState2({
      arrivalAirports2: arrAirports,
      depAirport2: {
        name: "Кишинёв",
        code: "KIV",
      },
    });

    setSellerSettingsCount(0);
    setSellerSettingsInitialState({
      sellers: sellerList,
    });
    dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
    setShowDropSettings(false);
  };
  return (
    <>
      <div className={`${styles.container} ${styles.slideLeft}`}>
        <div className={styles.header}>
          <div
            onClick={(evt) => {
              evt.persist();
              dom(`.${styles.goBackIcon}`).style.transform = "scale(.8)";
              setTimeout(() => {
                applyFilters();
              }, 150);
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
                  transferSettingsCount + transferSettingsCount2 === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {transferSettingsCount + transferSettingsCount2}
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
                  depArrSettingsCount + depArrSettingsCount2 === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {depArrSettingsCount + depArrSettingsCount2}
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
                  airportSettingsCount + airportSettingsCount2 === 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
                className={styles.settingsCount}
              >
                {airportSettingsCount + airportSettingsCount2}
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
        <BaggageSettings
          initialState={baggageSettingsInitialState}
          setBaggageSettingCount={setBaggageSettingCount}
          unmountModal={unmountBaggageSettingsModal}
        />
      ) : null}
      {renderTransferSettingsModal ? (
        <TransferSettings
          nrTransfersInitialState={nrTransfersInitialState}
          transferCitiesInitialState={transferCitiesInitialState}
          setTransferSettingsCount={setTransferSettingsCount}
          nrTransfersInitialState2={nrTransfersInitialState2}
          transferCitiesInitialState2={transferCitiesInitialState2}
          setTransferSettingsCount2={setTransferSettingsCount2}
          unmountModal={unmountTransferSettingsModal}
        />
      ) : null}
      {renderDepartureArrivalSettingsModal ? (
        <DepartureArrivalSettings
          deppArrSettingsInitialState={deppArrSettingsInitialState}
          setDeppArrSettingsCount={setDeppArrSettingsCount}
          depArrSettingsCount={depArrSettingsCount}
          deppArrSettingsInitialState2={deppArrSettingsInitialState2}
          setDeppArrSettingsCount2={setDeppArrSettingsCount2}
          depArrSettingsCount2={depArrSettingsCount2}
          unmountModal={unmountDepArrSettingsModal}
        />
      ) : null}
      {renderAircompanySettingsModal ? (
        <AircompanySettings
          airCompSettingsInitialState={airCompSettingsInitialState}
          setAirCompSettingsCount={setAirCompSettingsCount}
          unmountModal={unmountAircompanySettingsModal}
        />
      ) : null}
      {renderAirportSettingsModal ? (
        <AirportSettings
          airportSettingsInitialState={airportSettingsInitialState}
          setAirportSettingsCount={setAirportSettingsCount}
          airportSettingsCount={airportSettingsCount}
          airportSettingsInitialState2={airportSettingsInitialState2}
          setAirportSettingsCount2={setAirportSettingsCount2}
          airportSettingsCount2={airportSettingsCount2}
          unmountModal={unmountAirportSettingsModal}
        />
      ) : null}
      {renderSellerSettingsModal ? (
        <SellerSettings
          sellerSettingsInitialState={sellerSettingsInitialState}
          setSellerSettingsCount={setSellerSettingsCount}
          unmountModal={unmountSellerSettingsModal}
        />
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
