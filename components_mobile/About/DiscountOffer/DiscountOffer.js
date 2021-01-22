import React, { useState } from "react";
import styles from "./DiscountOffer.module.scss";
import { discountSvg } from "./svg";

import { i18n } from "../../../i18n";

export default function DiscountOffer_M({ inAboutUs, containerClass }) {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`discountOffer:${key}`);
  };

  const [phoneNr, setPhoneNr] = useState("");

  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [inputKeyCode, setInputKeyCode] = useState(50);
  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);

  const submitPhoneNr = (evt) => {
    evt.preventDefault();
  };

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
  const onBlurPhoneInputHidePrefix = (evt) => {
    const phoneInput = evt.target;
    const phoneNrLength = evt.target.value.length;
    const numberNotValid = document.querySelector(`.${styles.numberNotValid}`);
    // Check if it contains a valid phone nr and show a warning if it doesn't
    if (phoneNrLength === 0) {
      phoneInput.classList.add(styles.warningBorder);
      numberNotValid.classList.remove(styles.numberNotValidShow);
    } else if (phoneNrLength < 10) {
      phoneInput.classList.add(styles.warningBorder);
      numberNotValid.classList.add(styles.numberNotValidShow);
    } else {
      phoneInput.classList.remove(styles.warningBorder);
      numberNotValid.classList.remove(styles.numberNotValidShow);
    }
  };
  const onKeyDownPreventSpaceChars = (evt) => {
    if (evt.keyCode === 32) {
      setInputKeyCode(evt.keyCode);
    }
  };
  return (
    <section
      style={inAboutUs ? { marginBottom: "43px" } : {}}
      className={
        containerClass
          ? `${styles.container} ${styles[containerClass[0]]} ${
              styles[containerClass[1]]
            }`
          : `${styles.container}`
      }
    >
      <div className={styles.getDiscount}>
        <h2>{getLanguageSpecificContent("h2")}</h2>
        <form>
          <span className={styles.labelText}>
            {getLanguageSpecificContent("labelText")}
          </span>
          <div className={styles.phoneNrC}>
            <label htmlFor='phoneNr'>
              <span
                className={
                  inAboutUs
                    ? `${styles.phonePrefix} ${styles.phonePrefixAboutUs}`
                    : `${styles.phonePrefix}`
                }
              >
                +373{" "}
              </span>
              <input
                type='tel'
                id='phoneNr'
                onChange={(evt) => onChangePhoneNr(evt)}
                onBlur={(evt) => onBlurPhoneInputHidePrefix(evt)}
                onKeyDown={onKeyDownPreventSpaceChars}
                value={phoneNr}
                maxLength='10'
                autoComplete='off'
                placeholder='22 895 895'
              />
            </label>
            <button onClick={submitPhoneNr} type='submit'>
              {getLanguageSpecificContent("submitPhoneNrButton")}
            </button>

            <span className={styles.numberNotValid}>
              {getLanguageSpecificContent("numberNotValid")}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
