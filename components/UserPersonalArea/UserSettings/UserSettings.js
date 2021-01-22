import React, { useState } from "react";
import styles from "./UserSettings.module.scss";
import { passwordVisibilitySvg } from "../../Registration/svg";
import { useRouter } from "next/router";

import { i18n } from "../../../i18n";

export default function UserSettings({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`personalRoom:${key}`);
  };

  const router = useRouter();
  const [phoneNr, setPhoneNr] = useState("68 085 320");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [inputKeyCode, setInputKeyCode] = useState(50);
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("password");

  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [phoneNrChanged, setPhoneNrChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const onChangePhoneNr = (evt) => {
    setPhoneNrChanged(true);
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
    // if (phoneNr.length === 0) {
    //   document.querySelector(`.${styles.phonePrefix}`).style.display = "none";
    // }

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
  const onBlurEmail = (evt) => {
    const emailInput = evt.target;
    const emailInputLength = evt.target.value.length;
    const requiredField = document.querySelector(
      `.${styles.requiredFieldEmail}`
    );
    const emailNotValid = document.querySelector(`.${styles.emailNotValid}`);
    // Check if it contains a valid phone nr and show a warning if it doesn't
    if (emailInputLength === 0) {
      emailInput.classList.add(styles.warningBorder);
      requiredField.classList.add(styles.requiredFieldShow);
      emailNotValid.classList.remove(styles.emailNotValidShow);
    } else {
      emailInput.classList.remove(styles.warningBorder);
      requiredField.classList.remove(styles.requiredFieldShow);
    }
  };
  const onChangeEmail = (evt) => {
    setEmailChanged(true);
    setEmail(evt.target.value);

    const isValid = validateEmail(evt.target.value);
    const emailNotValid = document.querySelector(`.${styles.emailNotValid}`);
    const requiredField = document.querySelector(
      `.${styles.requiredFieldEmail}`
    );

    // Display/remove warnings as underline text
    if (isValid === false) {
      emailNotValid.classList.add(styles.emailNotValidShow);
      requiredField.classList.remove(styles.requiredFieldShow);
      setIsValidEmail(false);
    } else {
      emailNotValid.classList.remove(styles.emailNotValidShow);
      setIsValidEmail(true);
    }
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);

    const target = evt.target.value;
    const len = target.length;

    if (len > 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }

    // Indicate strength password
    const passwordWeak = document.querySelector(`.${styles.passwordWeak}`);
    const passwordStrong = document.querySelector(`.${styles.passwordStrong}`);
    if (len < 10) {
      passwordWeak.classList.add(styles.passwordWeakShow);
      passwordStrong.classList.remove(styles.passwordStrongShow);
    } else {
      passwordStrong.classList.add(styles.passwordStrongShow);
      passwordWeak.classList.remove(styles.passwordWeakShow);
    }

    // Toggle display for `Show password` icon
    const passIcon = document.querySelector(
      `.${styles.passwordVisibilityIcon}`
    );
    if (len !== 0) {
      passIcon.style.display = "block";
    } else {
      passIcon.style.display = "none";
    }
  };
  const togglePasswordVisibility = () => {
    const passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const enablePhoneNrInput = (evt, id) => {
    let input = document.querySelector(id);
    if (input.disabled) {
      input.disabled = false;
      input.style.backgroundColor = "#fff";

      evt.target.textContent = `${getLanguageSpecificContent(
        "UserSettings-t1"
      )}`;
    } else {
      if (!isValidPhoneNr && phoneNrChanged) return;
      input.disabled = true;
      input.style.backgroundColor = "#e4e6eb";
      evt.target.textContent = `${getLanguageSpecificContent(
        "UserSettings-t2"
      )}`;
    }
  };
  const enableEmailInput = (evt, id) => {
    let input = document.querySelector(id);
    if (input.disabled) {
      input.disabled = false;
      input.style.backgroundColor = "#fff";

      evt.target.textContent = `${getLanguageSpecificContent(
        "UserSettings-t1"
      )}`;
    } else {
      if (!isValidEmail && emailChanged) return;

      input.disabled = true;
      input.style.backgroundColor = "#e4e6eb";
      evt.target.textContent = `${getLanguageSpecificContent(
        "UserSettings-t2"
      )}`;
    }
  };
  const changePassword = (evt) => {
    router.push("/password-reset");
  };
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          {getLanguageSpecificContent("UserSettings-title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("UserSettings-subtitle")}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.phoneNrC}>
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
              disabled={true}
            />
            <span className={styles.phoneNrPlaceholder}>
              {getLanguageSpecificContent("UserSettings-phoneNrPlaceholder")}
            </span>
            <div
              onClick={(evt) => enablePhoneNrInput(evt, "#phoneNr")}
              className={styles.changeInput}
            >
              {getLanguageSpecificContent("UserSettings-t2")}
            </div>
          </label>
          <span className={styles.requiredField}>
            {getLanguageSpecificContent("UserSettings-requiredField")}
          </span>
          <span className={styles.numberNotValid}>
            {getLanguageSpecificContent("UserSettings-numberNotValid")}р
          </span>
        </div>
        <div className={styles.emailC}>
          <label htmlFor='email'>
            <input
              type='email'
              id='email'
              minLength='1'
              autoComplete='off'
              value={email}
              onChange={(evt) => onChangeEmail(evt)}
              onBlur={(evt) => onBlurEmail(evt)}
              disabled={true}
            />
            <span className={styles.emailPlaceholder}>
              {getLanguageSpecificContent("UserSettings-emailPlaceholder")}
            </span>
            <div
              onClick={(evt) => enableEmailInput(evt, "#email")}
              className={styles.changeInput}
            >
              {getLanguageSpecificContent("UserSettings-t2")}
            </div>
          </label>
          <span className={styles.requiredFieldEmail}>
            {getLanguageSpecificContent("UserSettings-requiredFieldEmail")}
          </span>
          <span className={styles.emailNotValid}>
            {getLanguageSpecificContent("UserSettings-emailNotValid")}
          </span>
        </div>
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
              disabled={true}
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.passwordVisibilityIcon}
            >
              {passwordVisibilitySvg}
            </span>
            <span className={styles.passwordPlaceholder}>
              {getLanguageSpecificContent("UserSettings-passwordPlaceholder")}
            </span>
            <div
              onClick={(evt) => changePassword(evt)}
              className={styles.changeInput}
            >
              {getLanguageSpecificContent("UserSettings-forgotPassword")}
            </div>
          </label>

          <div className={styles.passworIndicatorC}>
            {/* <span>Больше 6 символов</span> */}
            {/* <span className={styles.passwordStrength}>Слабый</span> */}
            <span className={styles.passwordWeak}>
              {getLanguageSpecificContent("UserSettings-passwordIndicator1")}
            </span>
            <span className={styles.passwordStrong}>
              {getLanguageSpecificContent("UserSettings-passwordIndicator2")}
            </span>
          </div>
        </div>
        <div className={styles.deleteUserDataButton}>
          {getLanguageSpecificContent("UserSettings-deleteUserData")}
        </div>
      </div>
    </section>
  );
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
