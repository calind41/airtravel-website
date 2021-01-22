import React, { useState } from "react";
import Link from "next/link";
import styles from "./Authorization.module.scss";
import { arrowRightSvg } from "./svg";
import { useRouter } from "next/router";
import {
  closeIconSvg,
  arrowNextSvg,
  goBackMobileSvg,
} from "../SearchFlightForm/svg";

import { i18n } from "../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`auth:${key}`);
};

export default function Authorization_M() {
  const [phoneNr, setPhoneNr] = useState("");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);

  const [inputKeyCode, setInputKeyCode] = useState(50);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [showPhoneNrC, setShowPhoneNrC] = useState(true);
  const [showPasswordC, setShowPasswordC] = useState(false);

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

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
    if (evt.target.value.length > 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const goToNextStep = (evt) => {
    // User entered a valid phone nr
    if (phoneNr.length === 10) {
      setShowPhoneNrC(false);
      setShowPasswordC(true);
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
          {getLanguageSpecificContent("heading-title")} iFly
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("heading-subtitle-1")}{" "}
          {showPhoneNrC
            ? `${getLanguageSpecificContent("heading-subtitle-2")}`
            : `${getLanguageSpecificContent("heading-subtitle-3")}`}{" "}
          {getLanguageSpecificContent("heading-subtitle-4")}
        </div>
      </div>
      <main>
        <div onClick={openMultiStepForm} className={styles.formEntryPoint}>
          {getLanguageSpecificContent("PhoneInput-placeholder")}
        </div>

        <PhoneNrModal
          showPhoneNrC={showPhoneNrC}
          phoneNr={phoneNr}
          onChangeInputPhoneNr={onChangeInputPhoneNr}
          onFocusAddPhoneNrPrefix={onFocusAddPhoneNrPrefix}
          onBlurHidePhonePrefix={onBlurHidePhonePrefix}
          onKeyDownPreventSpaceChars={onKeyDownPreventSpaceChars}
          goToNextStep={goToNextStep}
          isValidPhoneNr={isValidPhoneNr}
        />

        <PasswordModal
          onChangePassword={onChangePassword}
          password={password}
          isValidPassword={isValidPassword}
        />
        <div className={styles.actionsGroup}>
          <Link style={{ textDecoration: "none !important" }} href='/register'>
            <a>{getLanguageSpecificContent("actionsGroup1")}</a>
          </Link>
          <Link style={{ textDecoration: "none" }} href='/password-reset'>
            <a>{getLanguageSpecificContent("actionsGroup2")}</a>
          </Link>
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
  const toNextInput = () => {
    const modal = document.querySelector(`.${styles.phoneNrModalContainer}`);
    const modalPassword = document.querySelector(
      `.${styles.passwordModalContainer}`
    );

    if (isValidPhoneNr) {
      modal.classList.add(styles.slideLeft);
      setTimeout(() => {
        modal.classList.add(styles.displayNone);
      }, 400);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideUp);
      modal.classList.remove(styles.slideDown);

      modalPassword.classList.add(styles.displayBlock);
      modalPassword.classList.remove(styles.displayNone);
      modalPassword.classList.remove(styles.slideUp);
      modalPassword.classList.remove(styles.slideDown);
      modalPassword.classList.remove(styles.slideLeft);
    }
  };
  return (
    <div className={`${styles.phoneNrModalContainer} ${styles.displayNone}  `}>
      <nav className={styles.navigationContainer}>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("phoneNrModal-header")}</div>
        <div className={styles.pastInputContent}>
          {getLanguageSpecificContent("heading-subtitle-1")}{" "}
          {getLanguageSpecificContent("heading-subtitle-2")}{" "}
          {getLanguageSpecificContent("phoneNrModal-t")}
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
            {getLanguageSpecificContent("PhoneInput-placeholder")}
          </span>
        </label>
        <span className={styles.requiredField}>
          {getLanguageSpecificContent("PhoneInput-requiredField")}
        </span>
        <span className={styles.numberNotValid}>
          {getLanguageSpecificContent("PhoneInput-numberNotValid")}
        </span>
      </div>
      <div onClick={toNextInput} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("mobile-continue")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}
function PasswordModal({ password, onChangePassword, isValidPassword }) {
  const router = useRouter();
  const closeModal = () => {
    const modal = document.querySelector(`.${styles.passwordModalContainer}`);
    modal.classList.remove(styles.slideUp);
    modal.classList.add(styles.slideDown);
    setTimeout(() => {
      modal.classList.add(styles.displayNone);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideLeft);
    }, 400);
  };
  const toPrevInput = () => {
    const modal = document.querySelector(`.${styles.passwordModalContainer} `);
    const modalPhoneNr = document.querySelector(
      `.${styles.phoneNrModalContainer}`
    );
    modal.classList.remove(styles.displayBlock);
    modal.classList.add(styles.displayNone);
    modal.classList.remove(styles.slideDown);
    modal.classList.remove(styles.slideUp);
    modal.classList.remove(styles.slideLeft);

    modalPhoneNr.classList.add(styles.displayBlock);
    modalPhoneNr.classList.remove(styles.displayNone);
    modalPhoneNr.classList.remove(styles.slideLeft);
    modalPhoneNr.classList.remove(styles.slideUp);
    modalPhoneNr.classList.remove(styles.slideLeft);
  };

  const toMyPersonalRoom = () => {
    if (isValidPassword) router.push("/personal-room");
  };
  return (
    <div className={`${styles.passwordModalContainer} ${styles.displayNone}`}>
      <nav className={styles.navigationContainer}>
        <div onClick={toPrevInput}>{goBackMobileSvg}</div>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("phoneNrModal-header")}</div>
        <div className={styles.pastInputContent}>
          {getLanguageSpecificContent("heading-subtitle-1")}
          {getLanguageSpecificContent("heading-subtitle-3")}
          {getLanguageSpecificContent("phoneNrModal-t")}
        </div>
      </header>
      <div className={styles.passwordC}>
        <label>
          <input
            name='password'
            type='password'
            id='password'
            minLength='6'
            required
            spellCheck='false'
            autoComplete='off'
            value={password}
            onChange={(evt) => onChangePassword(evt)}
          />

          <span className={styles.passwordPlaceholder}>
            {getLanguageSpecificContent("passwordInputPlaceholder")}
          </span>
        </label>
      </div>
      <div className={styles.actionsGroup}>
        <Link style={{ textDecoration: "none" }} href='/password-reset'>
          <a>
            <span>{getLanguageSpecificContent("actionsGroup2")}</span>
          </a>
        </Link>
      </div>
      <div onClick={toMyPersonalRoom} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("mobile-continue2")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}
