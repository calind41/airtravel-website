import React, { useState, useEffect } from "react";
import styles from "./ModalTwo.module.scss";
import { phoneLogo } from "../GetPhoneNrModal";
import { closeIconSvg } from "../../../components_mobile/SearchFlightForm/svg";

import { i18n } from "../../../i18n";

import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";

export default function ModalTwo() {
  const [phoneNr, setPhoneNr] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("MD");
  const [isModalRendered, setIsModalRendered] = useState(true);
  const [dialCode, setDialCode] = useState("");
  const [inpClass, setInpClass] = useState(styles.inputClass);

  const onCloseModalHandler = () => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + phoneNr);
    if (isValidPhoneNumber) {
      setIsModalRendered(false);
    } else {
      setInpClass(styles.inputClassDanger);
    }
  };
  const handleOnChange = (value, data, event, formattedValue) => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + value);
    if (isValidPhoneNumber) {
      setInpClass(styles.inputClassSuccess);
    } else {
      setInpClass(styles.inputClass);
    }

    setPhoneNr(value);
    setDialCode(data.dialCode);
  };
  const submitPhoneHanlder = () => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + phoneNr);
    if (isValidPhoneNumber) {
      setIsModalRendered(false);
    } else {
      setInpClass(styles.inputClassDanger);
    }
  };

  if (isModalRendered)
    return (
      <div className={styles.container}>
        <div onClick={onCloseModalHandler} className={styles.closeIcon}>
          {closeIconSvg}
        </div>
        <div className={styles.phoneLC}>{phoneLogo}</div>
        <div className={styles.text}>
          <div className={styles.title}>Не пропустите самое важное</div>
          <div className={styles.subtitle}>
            Pentru a continua căutarea zborului introduceți numărul de telefon
          </div>
        </div>
        <div className={styles.phoneInputContainer}>
          <div className={styles.phoneInput}>
            <PhoneInput
              localization={i18n.language === "ru" ? ru : ""}
              placeholder='Numărul de telefon'
              countryCodeEditable={false}
              country={"md"}
              value={phoneNr}
              onChange={handleOnChange}
              containerClass={styles.inputContainerClass}
              inputClass={inpClass}
              buttonClass={styles.buttonClass}
              dropdownClass={styles.dropdownClass}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          <div onClick={submitPhoneHanlder} className={styles.button}>
            Trimite
          </div>
        </div>
      </div>
    );
  else return null;
}
