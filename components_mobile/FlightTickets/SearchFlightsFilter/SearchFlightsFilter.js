import React, { useState, useEffect } from "react";
import MultiHandleRangeSlider from "./MultiHandleRangeSlider/MultiHandleRangeSlider";
import styles from "./SearchFlightsFilter.module.scss";
import FlightTickets from "../FlightTickets";
import { SearchForm_M } from "../../SearchFlightForm/SearchFlightForm";
import { editIcon, filterSettingsIcon } from "./svg";
import { closeIconSvg } from "../../SearchFlightForm/svg";

import stylesSearchFlightForm from "../../SearchFlightForm/SearchFlightForm.module.scss";

import { i18n } from "../../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`flightSearchResult:${key}`);
};

export default function SearchFlightsFilter_M() {
  const [checkedWithBaggage, setCheckedWithBaggage] = useState(false);
  const [checkedWithoutBaggage, setCheckedWithoutBaggage] = useState(true);
  const [checkedOneTransfer, setCheckedOneTransfer] = useState(true);
  const [checkedTwoTransfer, setCheckedTwoTransfer] = useState(false);

  const [
    selectedFlightFeatureOption,
    setSelectedFlightFeatureOption,
  ] = useState(`${getLanguageSpecificContent("t10")} $249`);

  useEffect(() => {
    document
      .querySelectorAll(`.${styles.flightFeatureOptions} > div`)
      .forEach((el) =>
        el.addEventListener("click", (evt) => selectFlightFeatureOption(evt))
      );
  }, []);

  const selectFlightFeatureOption = (evt) => {
    document
      .querySelectorAll(`.${styles.flightFeatureOptions} > div`)
      .forEach((el) => el.classList.remove(styles.selected));

    evt.target.classList.add(styles.selected);
    console.log(evt.target.textContent);
    setSelectedFlightFeatureOption(evt.target.textContent);
  };
  const setWithoutTransfer = (evt) => {
    const value = evt.target.textContent;
    if (value === getLanguageSpecificContent("t5")) {
      evt.target.textContent = getLanguageSpecificContent("t6");
      setCheckedOneTransfer(false);
      setCheckedTwoTransfer(false);
    } else {
      evt.target.textContent = getLanguageSpecificContent("t5");
    }
  };
  const onChangeWithBaggageI = (evt) => {
    setCheckedWithBaggage(!checkedWithBaggage);
  };
  const onChangeWithoutBaggageI = (evt) => {
    setCheckedWithoutBaggage(!checkedWithoutBaggage);
  };
  const onChangeOneTransferI = (evt) => {
    const withoutTransfer = document.querySelector("#withoutTransferSpan")
      .textContent;
    if (withoutTransfer === getLanguageSpecificContent("t6")) {
      return;
    }
    setCheckedOneTransfer(!checkedOneTransfer);
    if (!checkedOneTransfer !== !checkedTwoTransfer)
      setCheckedTwoTransfer(!checkedTwoTransfer);
  };
  const onChangeTwoTransferI = (evt) => {
    const withoutTransfer = document.querySelector("#withoutTransferSpan")
      .textContent;
    if (withoutTransfer === getLanguageSpecificContent("t6")) {
      return;
    }
    setCheckedTwoTransfer(!checkedTwoTransfer);
    if (!checkedOneTransfer !== !checkedTwoTransfer)
      setCheckedOneTransfer(!checkedOneTransfer);
  };
  const closeFilterSettings = () => {
    const filtersWrapper = document.querySelector("#filters_wrapper_id");
    filtersWrapper.classList.remove(styles.slideUpAnimation);
    filtersWrapper.classList.add(styles.slideDownAnimation);
    // filtersWrapper.style.display = "none";
  };
  return (
    <div className={styles.wrapper}>
      <EditSearchFlightForm
        departureLocation='Кишинев KIV'
        arrivalLocation='Стамбул IST'
        departureDate='18 Авг.'
        arrivalDate='23 Авг.'
        nrPassengers={3}
      />
      <Filters selectedFlightFeatureOption={selectedFlightFeatureOption} />
      <section id='sf_filter_id' className={`${styles.container}`}>
        <div id='filters_wrapper_id' className={styles.filtersWrapper}>
          <div onClick={closeFilterSettings} className={styles.closeIcon}>
            {closeIconSvg}
          </div>
          <header>{getLanguageSpecificContent("mobile-searchSettings")}</header>
          <div className={styles.wrapper}>
            <div className={styles.flightFeatureOptions}>
              <div className={`${styles.fastest} ${styles.selected}`}>
                {getLanguageSpecificContent("t10")} 249$
              </div>
              <div className={styles.cheapest}>
                {getLanguageSpecificContent("t11")} 249$
              </div>
              <div className={styles.optimal}>
                {getLanguageSpecificContent("t12")} 249$
              </div>
            </div>
          </div>
          <div className={styles.filterContainer}>
            <div className={styles.baggageRelated}>
              <h3>{getLanguageSpecificContent("h3")}</h3>
              <div>
                <div className={styles.txt}>
                  {getLanguageSpecificContent("t1")}
                </div>
                <label className={styles.switchW}>
                  <input
                    checked={checkedWithBaggage}
                    onChange={onChangeWithBaggageI}
                    type='checkbox'
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
              <div>
                <div className={styles.txt}>
                  {getLanguageSpecificContent("t2")}
                </div>
                <label className={styles.switchW}>
                  <input
                    checked={checkedWithoutBaggage}
                    onChange={onChangeWithoutBaggageI}
                    // defaultChecked={true}
                    type='checkbox'
                  />
                  <span
                    className={`${styles.slider} ${styles.slider2} ${styles.round}`}
                  ></span>
                </label>
              </div>
            </div>
            <div className={styles.transferRelated}>
              <h3>{getLanguageSpecificContent("t3")}</h3>
              <div className={styles.withoutTransfer}>
                <span>{getLanguageSpecificContent("t4")}</span>
                <span
                  id='withoutTransferSpan'
                  onClick={(evt) => setWithoutTransfer(evt)}
                >
                  {getLanguageSpecificContent("t5")}
                </span>
              </div>
              <div className={styles.transferOption}>
                <div className={styles.txt}>
                  1 {getLanguageSpecificContent("t7")}
                </div>
                <label className={styles.switchW}>
                  <input
                    checked={checkedOneTransfer}
                    onChange={onChangeOneTransferI}
                    // defaultChecked={true}
                    type='checkbox'
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
              <div className={styles.transferOption}>
                <div className={styles.txt}>
                  2 {getLanguageSpecificContent("t8")}
                </div>
                <label className={styles.switchW}>
                  <input
                    checked={checkedTwoTransfer}
                    onChange={onChangeTwoTransferI}
                    type='checkbox'
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
            </div>
            <div className={styles.transferDuration}>
              <h3>{getLanguageSpecificContent("t9")}</h3>
              <MultiHandleRangeSlider />
            </div>
          </div>
        </div>

        <FlightTickets />
      </section>
    </div>
  );
}

function EditSearchFlightForm({
  departureLocation,
  arrivalLocation,
  departureDate,
  arrivalDate,
  nrPassengers,
}) {
  const [isRenderedSearchForm, setIsRenderedSearchForm] = useState(false);

  const editSearchForm = () => {
    const searchForm = document.querySelector(`#editSearchFormId`);
    if (!isRenderedSearchForm) setIsRenderedSearchForm(true);
    else {
      searchForm.classList.remove(stylesSearchFlightForm.slideDown);
      searchForm.classList.add(stylesSearchFlightForm.slideUp);
      searchForm.style.display = "block";
    }
  };
  return (
    <>
      <div className={styles.editSearchFC}>
        <div className={styles.flightInfo}>
          <div>
            <span>{departureLocation}</span>
            <span>—</span>
            <span>{arrivalLocation}</span>
          </div>
          <div>
            <span>{departureDate}</span>
            <span>—</span>
            <span>{arrivalDate},</span>
            <span>
              {nrPassengers > 1
                ? `${nrPassengers} пассажира`
                : `${nrPassengers} пассажир`}
            </span>
          </div>
        </div>
        <div onClick={editSearchForm} className={styles.editIcon}>
          {editIcon}
        </div>
      </div>
      {isRenderedSearchForm ? <SearchForm id='editSearchFormId' /> : null}
    </>
  );
}

function Filters({ selectedFlightFeatureOption }) {
  const openSettings = () => {
    const filtersWrapper = document.querySelector("#filters_wrapper_id");
    filtersWrapper.style.display = "block";
    filtersWrapper.classList.add(styles.slideUpAnimation);
    filtersWrapper.classList.remove(styles.slideDownAnimation);
  };

  return (
    <div className={styles.filtersC}>
      <div className={styles.selectedOption}>{selectedFlightFeatureOption}</div>
      <div onClick={openSettings} className={styles.settingsIcon}>
        {filterSettingsIcon}
      </div>
    </div>
  );
}
