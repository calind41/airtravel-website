import React, { useEffect, useState } from "react";
import styles from "./UserPersonalData.module.scss";
import Form from "../Form/Form";
import { goBackMobileSvg, closeIconSvg } from "../../SearchFlightForm/svg";

import { i18n } from "../../../i18n";

export default function UserPersonalData() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`personalRoom:${key}`);
  };

  const [passengersData, setPassengersData] = useState([
    {
      fName: "Ivan",
      lName: "Ivanov",
      birthday: "22/02/2020",
      nationalityD: "Moldova, Republic Of",
      genderD: "male",
      serialNrD: "123456789",
      serialNrReleaseDateD: "20/02/2020",
      serialNrExpireDateD: "22/02/2020",
      id: 1,
    },
  ]);

  const [currentlyOpenFormD, setCurrentlyOpenFormD] = useState({});
  const [isRenderedFormUpdate, setIsRenderedFormUpdate] = useState(false);
  const [isRenderedFormAdd, setIsRenderedFormAdd] = useState(false);

  const addPassenger = () => {
    const modal = document.querySelector(`.${styles.right}`);
    modal.classList.add(styles.displayBlock);
    modal.classList.remove(styles.displayNone);
    modal.classList.add(styles.slideUp);
    modal.classList.remove(styles.slideDown);
    setIsRenderedFormAdd(true);
  };
  const updatePassenger = (passenger) => {
    setCurrentlyOpenFormD(passenger);

    const modal = document.querySelector(`.${styles.rightUpdate}`);
    modal.classList.add(styles.displayBlock);
    modal.classList.remove(styles.displayNone);
    modal.classList.add(styles.slideUp);
    modal.classList.remove(styles.slideDown);
    setIsRenderedFormUpdate(true);
  };
  const closeFormAdd = () => {
    setIsRenderedFormAdd(false);

    const modal = document.querySelector(`.${styles.right}`);
    modal.classList.remove(styles.slideUp);
    modal.classList.add(styles.slideDown);
    setTimeout(() => {
      modal.classList.add(styles.displayNone);
      modal.classList.remove(styles.displayFlex);
    }, 400);
  };
  const closeFormUpdate = () => {
    setIsRenderedFormUpdate(false);
    const modal = document.querySelector(`.${styles.rightUpdate}`);
    console.log(modal);
    modal.classList.remove(styles.slideUp);
    modal.classList.add(styles.slideDown);
    setTimeout(() => {
      modal.classList.add(styles.displayNone);
      modal.classList.remove(styles.displayFlex);
    }, 400);
  };

  const receiveNewPassengerData = (data, updating) => {
    const {
      fName,
      lName,
      birthday,
      serialNrD,
      serialNrReleaseDateD,
      serialNrExpireDateD,
      nationalityD,
      genderD,
      id,
    } = data;
    if (updating) {
      // update passenger data with id: `id`
      // no need to create new array, array values are objects in this case
      passengersData.map((p) => {
        if (p.id === id) {
          for (let key in data) {
            let value = data[key];
            if (value !== "") {
              p[key] = value;
            }
          }
        }
      });

      setPassengersData(passengersData);
    } else {
      setPassengersData([
        ...passengersData,
        {
          fName,
          lName,
          birthday,
          nationalityD,
          genderD,
          serialNrD,
          serialNrReleaseDateD,
          serialNrExpireDateD,
          id,
        },
      ]);
    }
  };
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          {getLanguageSpecificContent("UserPersonalData-title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("UserPersonalData-subtitle")}
        </div>
        <div onClick={addPassenger} className={styles.addPassengerButton}>
          <div>{getLanguageSpecificContent("UserPersonalData-button")}</div>
          <div className={styles.arrowRight}>{goBackMobileSvg}</div>
        </div>

        {passengersData.map((passenger, idx) => {
          return (
            <div
              key={idx}
              onClick={() => updatePassenger(passenger)}
              className={styles.updatePassengerButton}
            >
              <div>
                {passenger.fName} {passenger.lName}
              </div>
              <div className={styles.arrowRight}>{goBackMobileSvg}</div>
            </div>
          );
        })}
      </div>

      {/* <div className={styles.right}>{forms}</div> */}
      <div className={`${styles.right} ${styles.displayNone}`}>
        <div className={styles.passengerF}>
          <div onClick={closeFormAdd} className={styles.closeIcon}>
            {closeIconSvg}
          </div>
          <div>
            {passengersData.length + 1}.{" "}
            {getLanguageSpecificContent("UserPersonalData-t1")}
          </div>
          {isRenderedFormAdd ? (
            <Form
              transmitPassengerData={receiveNewPassengerData}
              update={false}
              additionalPassenger={true}
              id={passengersData.length + 1}
            />
          ) : null}
        </div>
      </div>

      <div
        className={`${styles.right} ${styles.rightUpdate} ${styles.displayNone}`}
      >
        <div className={`${styles.passengerF} ${styles.passengerFormUpdate}`}>
          <div onClick={closeFormUpdate} className={styles.closeIcon}>
            {closeIconSvg}
          </div>
          <div>
            {passengersData.length + 1}.{" "}
            {getLanguageSpecificContent("UserPersonalData-t1")}
          </div>

          {isRenderedFormUpdate ? (
            <Form
              transmitPassengerData={receiveNewPassengerData}
              fName={currentlyOpenFormD.fName}
              lName={currentlyOpenFormD.lName}
              birthday={currentlyOpenFormD.birthday}
              nationalityD={currentlyOpenFormD.nationalityD}
              genderD={currentlyOpenFormD.genderD}
              serialNrD={currentlyOpenFormD.serialNrD}
              serialNrReleaseDateD={currentlyOpenFormD.serialNrReleaseDateD}
              serialNrExpireDateD={currentlyOpenFormD.serialNrExpireDateD}
              id={currentlyOpenFormD.id}
              update={true}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
