import React from "react";
import stylesPopup from "./UserDataFormPopup.module.scss";
import styles from "../../PassengerInformationPage/PassengerInformationForm/PassengerInformationForm.module.scss";
import Form from "../Form/Form";
import { goBackMobileSvg, closeIconSvg } from "../../SearchFlightForm/svg";

import { i18n } from "../../../i18n";

export default function UserDataFormPopup() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`personalRoom:${key}`);
  };

  const closeFormPopup = () => {
    const modal = document.querySelector(`.${stylesPopup.formContainer}`);
    modal.classList.remove(stylesPopup.slideUp);
    modal.classList.add(stylesPopup.slideDown);
    setTimeout(() => {
      modal.classList.add(stylesPopup.displayNone);
      modal.classList.remove(stylesPopup.displayFlex);
    }, 400);
  };
  const openFormPopup = () => {
    const fp = document.querySelector(`.${stylesPopup.formContainer}`);
    fp.classList.add(stylesPopup.displayBlock);
    fp.classList.remove(stylesPopup.displayNone);
    fp.classList.add(stylesPopup.slideUp);
    fp.classList.remove(stylesPopup.slideDown);
  };
  const receivePassengerData = () => {};
  return (
    <>
      <section onClick={openFormPopup} className={stylesPopup.container}>
        <div className={stylesPopup.title}>
          <div className={stylesPopup.text}>
            {getLanguageSpecificContent("UserDataFormPopup-title-mobile")}
            <span>*</span>
          </div>
          <div className={stylesPopup.arrowRight}>{goBackMobileSvg}</div>
        </div>
      </section>
      <div
        className={`${stylesPopup.formContainer} ${stylesPopup.displayNone}`}
      >
        <div onClick={closeFormPopup} className={stylesPopup.closeIcon}>
          {closeIconSvg}
        </div>
        <Form
          transmitPassengerData={receivePassengerData}
          additionalPassenger={true}
        />
      </div>
    </>
  );
}
