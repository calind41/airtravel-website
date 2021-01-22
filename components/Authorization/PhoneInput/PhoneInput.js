import React, { useState } from "react";
import styles from "./PhoneInput.module.scss";
import { arrowRightSvg } from "../svg";
// import { i18n } from "../../../i18n";

export default function PhoneInput({
  t,
  setVisiblePasswordField,
  setHeaderTitleForPasswordField,
  inRegister,
  setIsValidPhoneNr,
}) {
  const getLanguageSpecificContent = (key) => {
    return t(`auth:${key}`);
  };

  const [phoneNr, setPhoneNr] = useState("");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [inputKeyCode, setInputKeyCode] = useState(50);

  const [showPhoneNrC, setShowPhoneNrC] = useState(true);
  const onChangeInputPhoneNr = (evt) => {
    const target = evt.target.value;
    const targetWithoutWhiteSpace = target.replace(/\s/g, "");
    const len = target.length;

    if (inRegister) {
      if (len === 10) {
        setIsValidPhoneNr(true);
      } else {
        setIsValidPhoneNr(false);
      }
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
  const onFocusAddPhoneNrPrefix = () => {
    document.querySelector(`.${styles.phonePrefix}`).style.display = "block";
  };
  const onBlurHidePhonePrefix = (evt) => {
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
  const onKeyDownPreventSpaceChars = (evt) => {
    if (evt.keyCode === 32) {
      setInputKeyCode(evt.keyCode);
    }
  };

  const goToNextStep = (evt) => {
    // User entered a valid phone nr
    if (phoneNr.length === 10) {
      setShowPhoneNrC(false);
      setHeaderTitleForPasswordField();
      setVisiblePasswordField(true);
    }
  };
  return (
    <div
      style={showPhoneNrC ? { display: "block" } : { display: "none" }}
      className={styles.phoneNrC}
    >
      <label htmlFor='authorizationPhoneNr'>
        <span className={styles.phonePrefix}>+373 </span>
        <input
          type='tel'
          id='authorizationPhoneNr'
          value={phoneNr}
          onChange={(evt) => {
            onChangeInputPhoneNr(evt);
          }}
          onFocus={onFocusAddPhoneNrPrefix}
          onBlur={(evt) => onBlurHidePhonePrefix(evt)}
          onKeyDown={(evt) => onKeyDownPreventSpaceChars(evt)}
          required
          maxLength='10'
          autoComplete='off'
          spellCheck='false'
        />
        <span className={styles.phoneNrPlaceholder}>
          {getLanguageSpecificContent("PhoneInput-placeholder")}
        </span>
        {!inRegister ? (
          <span onClick={goToNextStep} className={styles.iconArrowNext}>
            {arrowRightSvg}
          </span>
        ) : null}
      </label>
      <span className={styles.requiredField}>
        {getLanguageSpecificContent("PhoneInput-requiredField")}
      </span>
      <span className={styles.numberNotValid}>
        {getLanguageSpecificContent("PhoneInput-numberNotValid")}
      </span>
    </div>
  );
}
