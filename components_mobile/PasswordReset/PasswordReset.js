import React, { useState } from "react";
import styles from "./PasswordReset.module.scss";
import { useRouter } from "next/router";
import { arrowRightSvg } from "./svg";
import Link from "next/link";
import { closeIconSvg, arrowNextSvg } from "../SearchFlightForm/svg";

import { i18n } from "../../i18n";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`passwordReset:${key}`);
};

export default function PasswordReset_M() {
  const [phoneNr, setPhoneNr] = useState("");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);

  const [inputKeyCode, setInputKeyCode] = useState(50);

  const router = useRouter();

  const onChangeInputPhoneNr = (evt) => {
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

  const openMultiStepForm = () => {
    const modal = document.querySelector(`.${styles.phoneNrModalContainer}`);
    modal.classList.add(styles.displayBlock);
    modal.classList.remove(styles.displayNone);
    modal.classList.add(styles.slideUp);
    modal.classList.remove(styles.slideDown);
    modal.classList.remove(styles.slideLeft);
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {getLanguageSpecificContent("title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("subtitle")}
        </div>
      </div>
      <main>
        <div onClick={openMultiStepForm} className={styles.formEntryPoint}>
          {getLanguageSpecificContent("phoneNrPlaceholder")}
        </div>
        <PhoneNrModal
          phoneNr={phoneNr}
          onChangeInputPhoneNr={onChangeInputPhoneNr}
          onFocusAddPhoneNrPrefix={onFocusAddPhoneNrPrefix}
          onBlurHidePhonePrefix={onBlurHidePhonePrefix}
          onKeyDownPreventSpaceChars={onKeyDownPreventSpaceChars}
          isValidPhoneNr={isValidPhoneNr}
        />
        <div className={styles.actionsGroup}>
          <a>
            <span>{getLanguageSpecificContent("cancel")}</span>
          </a>
        </div>
        <div className={styles.bottomMessage}>
          {getLanguageSpecificContent("bottomMessage")}
        </div>
      </main>
    </div>
  );
}

function PhoneNrModal({
  phoneNr,
  onChangeInputPhoneNr,
  onFocusAddPhoneNrPrefix,
  onBlurHidePhonePrefix,
  onKeyDownPreventSpaceChars,
  isValidPhoneNr,
}) {
  const router = useRouter();
  const closeModal = () => {
    const modal = document.querySelector(`.${styles.phoneNrModalContainer}`);
    modal.classList.remove(styles.slideUp);
    modal.classList.add(styles.slideDown);

    setTimeout(() => {
      modal.classList.add(styles.displayNone);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideLeft);
    }, 400);
  };
  const toVerificationCode = () => {
    if (isValidPhoneNr) {
      const resetPassword = true;
      router.push({
        pathname: `/[lang]/verification-code`,
        query: { lang: i18n.language, resetPassword: true },
      });
    }
  };
  return (
    <div className={`${styles.phoneNrModalContainer} ${styles.displayNone}`}>
      <nav className={styles.navigationContainer}>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("title")}</div>
        <div className={styles.pastInputContent}>
          {getLanguageSpecificContent("subtitle")}
        </div>
      </header>
      <div className={styles.phoneNrC}>
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
            {getLanguageSpecificContent("phoneNrPlaceholder")}
          </span>
        </label>
        <span className={styles.requiredField}>
          {getLanguageSpecificContent("requiredField")}
        </span>
        <span className={styles.numberNotValid}>
          {getLanguageSpecificContent("numberNotValid")}
        </span>
      </div>

      <div onClick={toVerificationCode} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("continue")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}
