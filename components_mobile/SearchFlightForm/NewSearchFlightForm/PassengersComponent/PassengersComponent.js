import React, { useState, useEffect } from "react";
import styles from "./PassengersComponent.module.scss";
import { closeIconSvg } from "../../svg";
import Counters from "./Counters/Counters";
import FlightTypeRadioButtons from "./FlightTypeRadioButtons/FlightTypeRadioButtons";

import { i18n } from "../../../../i18n";

export default function PassengersComponent({
  passPassengerComponentData,
  unmountPassengersComponent,
  defaultNrPassengers,
  defaultNrAdults,
  defaultNrChilds,
  defaultNrBabies,
  defaultFlightType,
}) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`common:${key}`);
  };
  const closePassengersComponent = () => {
    document
      .querySelector("#passengersCountContainerId")
      .classList.add(styles.slideRight);
    passPassengerComponentData(
      nrPassengers,
      nrAdults,
      nrChilds,
      nrBabies,
      selectedRadioButton
    );
    setTimeout(() => {
      unmountPassengersComponent();
    }, 400);
  };

  const [nrAdults, setNrAdults] = useState(defaultNrAdults);
  const [nrChilds, setNrChilds] = useState(defaultNrChilds);
  const [nrBabies, setNrBabies] = useState(defaultNrBabies);
  const [nrPassengers, setNrPassengers] = useState(defaultNrPassengers);

  const receiveNrPassengers = (nr) => {
    setNrPassengers(nr);
  };
  const receiveNrAdults = (nrAdults) => {
    setNrAdults(nrAdults);
  };
  const receiveNrChilds = (nrChilds) => {
    setNrChilds(nrChilds);
  };
  const receiveNrBabies = (nrBabies) => {
    setNrBabies(nrBabies);
  };
  const passSelectedType = (selectedType) => {
    setSelectedType(selectedType);
  };

  const [selectedRadioButton, setSelectedRadioButton] = useState(
    defaultFlightType
  );

  return (
    <div id='passengersCountContainerId' className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.title}>
          {getLanguageSpecificContent("passengerDropdownMobile-title")}
        </span>
        <span className={styles.closeIcon} onClick={closePassengersComponent}>
          {closeIconSvg}
        </span>
      </div>
      <Counters
        nr={nrAdults}
        display={true}
        setNrPassengers={setNrPassengers}
        setNrAdults={setNrAdults}
        setNrChilds={setNrChilds}
        setNrBabies={setNrBabies}
        nrPassengers={nrPassengers}
        nrAdults={nrAdults}
        nrBabies={nrBabies}
        nrChilds={nrChilds}
        passNrAdults={receiveNrPassengers}
      />
      <FlightTypeRadioButtons
        selectedRadioButton={selectedRadioButton}
        setSelectedRadioButton={setSelectedRadioButton}
      />
      <div className={styles.doneButtonC}>
        <button
          className={styles.doneButton}
          onClick={closePassengersComponent}
          // id='selectBtnId'
        >
          <span>
            {getLanguageSpecificContent("passengerDropdownMobile-done")}
          </span>
        </button>
      </div>
    </div>
  );
}
