import React, { useState, useEffect } from "react";
import styles from "./ModalThree.module.scss";
import { phoneLogoLight, phoneLogoDark } from "../GetPhoneNrModal";
import { closeIconSvg } from "../../../components_mobile/SearchFlightForm/svg";
import { i18n } from "../../../i18n";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";

export default function ModalThree({ mode }) {
  const [phoneNr, setPhoneNr] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("MD");
  const [isModalRendered, setIsModalRendered] = useState(true);
  const [dialCode, setDialCode] = useState("");
  const [inpClass, setInpClass] = useState(
    mode === "dark" ? styles.inputClassDark : styles.inputClass
  );

  const onCloseModalHandler = () => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + phoneNr);
    if (isValidPhoneNumber) {
      setIsModalRendered(false);
    } else {
      setInpClass(
        mode === "dark" ? styles.inputClassDangerDark : styles.inputClassDanger
      );
    }
  };
  const handleOnChange = (value, data, event, formattedValue) => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + value);
    if (isValidPhoneNumber) {
      setInpClass(
        mode === "dark"
          ? styles.inputClassSuccessDark
          : styles.inputClassSuccess
      );
    } else {
      setInpClass(mode === "dark" ? styles.inputClassDark : styles.inputClass);
    }

    setPhoneNr(value);
    setDialCode(data.dialCode);
  };
  const submitPhoneHanlder = () => {
    const isValidPhoneNumber = isPossiblePhoneNumber("+" + phoneNr);
    if (isValidPhoneNumber) {
      setIsModalRendered(false);
    } else {
      setInpClass(
        mode === "dark" ? styles.inputClassDangerDark : styles.inputClassDanger
      );
    }
  };

  if (isModalRendered)
    return (
      <div
        style={mode === "dark" ? { backgroundColor: "#020B20" } : {}}
        className={styles.container}
      >
        <div onClick={onCloseModalHandler} className={styles.closeIcon}>
          <span> {closeIconSvg}</span>
        </div>
        <div className={styles.phoneLC}>
          {mode === "dark" ? phoneLogoDark : phoneLogoLight}
        </div>
        <div className={styles.text}>
          <div
            style={mode === "dark" ? { color: "#fff" } : {}}
            className={styles.title}
          >
            Introdu numărul de telefon (obligatoriu)
          </div>
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
              buttonClass={
                mode === "dark" ? styles.buttonClassDark : styles.buttonClass
              }
              dropdownClass={
                mode === "dark"
                  ? styles.dropdownClassDark
                  : styles.dropdownClass
              }
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          <div
            style={mode === "dark" ? { backgroundColor: "#3161DC" } : {}}
            onClick={submitPhoneHanlder}
            className={styles.button}
          >
            Sunt persoană reală
          </div>
        </div>
      </div>
    );
  else return null;
}
