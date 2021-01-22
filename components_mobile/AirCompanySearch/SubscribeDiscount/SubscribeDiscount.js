import React, { useState } from "react";
import styles from "./SubscribeDiscount.module.scss";

import { i18n } from "../../../i18n";

export default function SubscribeDiscount({ airC }) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`subscribeDiscount:${key}`);
  };

  const [phoneNr, setPhoneNr] = useState("");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [inputKeyCode, setInputKeyCode] = useState(50);

  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);

  const onChangePhoneNr = (evt) => {
    const target = evt.target.value;
    const targetWithoutWhiteSpace = target.replace(/\s/g, "");
    const len = target.length;

    if (len === 10) {
      setIsValidPhoneNr(true);
    } else {
      setIsValidPhoneNr(false);
    }
    // Prevent space characters to be introduced
    if (inputKeyCode === 32) {
      setInputKeyCode(50);
      return;
    }

    // If user pressed key that is not a digit do not add it to input
    if (isNaN(Number(target.substr(len - 1, len)))) {
      setPhoneNr(target.substr(0, len - 1));
      return;
    }

    // Case when you type a digit in place of a pre-planned space char
    if (
      (targetWithoutWhiteSpace.length === 3 && target.length === 3) ||
      (targetWithoutWhiteSpace.length === 6 && target.length === 7)
    ) {
      const newValue =
        target.substr(0, len - 1) + " " + target.substr(len - 1, len);
      setPhoneNr(newValue);
      return;
    }

    // Add pre-planned whitespace to match desired format [xx xxx xxx]
    if ((len === 2 || len === 6) && prevPhoneNrLen <= len) {
      setPhoneNr(evt.target.value + " ");
      setPrevPhoneNrLen(len + 1);
    } else {
      setPhoneNr(evt.target.value);
      setPrevPhoneNrLen(len);
    }
  };

  const onFocusAddPhoneNrPrefix = (evt) => {
    document.querySelector(`.${styles.phonePrefix}`).style.display = "block";
  };
  const onKeyDownPreventSpaceChars = (evt) => {
    if (evt.keyCode === 32) {
      setInputKeyCode(evt.keyCode);
    }
  };
  const onBlurPhoneInputHidePrefix = (evt) => {
    if (phoneNr.length === 0) {
      document.querySelector(`.${styles.phonePrefix}`).style.display = "none";
    }

    const phoneInput = evt.target;
    const phoneNrLength = evt.target.value.length;
    const requiredField = document.querySelector(`.${styles.requiredField}`);
    const numberNotValid = document.querySelector(`.${styles.numberNotValid}`);
    // Check if it contains a valid phone nr and show a warning if it doesn't
    if (phoneNrLength === 0) {
      phoneInput.classList.add(styles.warningBorder);
      requiredField.classList.add(styles.requiredFieldShow);
      numberNotValid.classList.remove(styles.numberNotValidShow);
    } else if (phoneNrLength < 10) {
      phoneInput.classList.add(styles.warningBorder);
      numberNotValid.classList.add(styles.numberNotValidShow);
      requiredField.classList.remove(styles.requiredFieldShow);
    } else {
      phoneInput.classList.remove(styles.warningBorder);
      requiredField.classList.remove(styles.requiredFieldShow);
      numberNotValid.classList.remove(styles.numberNotValidShow);
    }
  };
  return (
    <div
      className={
        airC
          ? `${styles.container} ${styles.container_AirC}`
          : `${styles.container}`
      }
    >
      <header>{getLanguageSpecificContent("SubscribeDiscount-header")}</header>
      <main className={styles.phoneNrC}>
        <label htmlFor='phoneNr'>
          <span className={styles.phonePrefix}>+373 </span>
          <input
            type='tel'
            id='phoneNr'
            onChange={(evt) => onChangePhoneNr(evt)}
            onFocus={onFocusAddPhoneNrPrefix}
            onBlur={(evt) => onBlurPhoneInputHidePrefix(evt)}
            onKeyDown={onKeyDownPreventSpaceChars}
            value={phoneNr}
            maxLength='10'
            autoComplete='off'
            required
          />
          <span className={styles.phoneNrPlaceholder}>
            {getLanguageSpecificContent("phoneNrPlaceholder")}
          </span>
        </label>
        <span className={styles.requiredField}>
          {getLanguageSpecificContent("requiredField")}
        </span>
        <span className={styles.numberNotValid}>
          {getLanguageSpecificContent("numberNotValid")}
        </span>
      </main>
      <footer className={styles.subscribeButton}>
        {getLanguageSpecificContent("subscribe")}
      </footer>
    </div>
  );
}
