import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Registration.module.scss";
import { passwordVisibilitySvg } from "./svg";
import PhoneInput from "../Authorization/PhoneInput/PhoneInput";

import { i18n } from "../../i18n";

export default function Registration({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`register:${key}`);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidPhoneNr, setIsValidPhoneNr] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const router = useRouter();

  const submitForm = (evt) => {
    evt.preventDefault();

    const submit = isValidPhoneNr && isValidEmail && isValidPassword;
    if (!submit) return;
    let registration = true;
    router.push(
      `/verification-code?registration=${registration}`,
      "verification-code"
    );
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

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {getLanguageSpecificContent("title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("subtitle")}
        </div>
      </div>

      <form noValidate onSubmit={submitForm}>
        <PhoneInput
          t={t}
          inRegister={true}
          setIsValidPhoneNr={setIsValidPhoneNr}
        />
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
            />
            <span className={styles.emailPlaceholder}>
              {getLanguageSpecificContent("emailPlaceholder")}
            </span>
          </label>
          <span className={styles.requiredFieldEmail}>
            {getLanguageSpecificContent("requiredFieldEmail")}
          </span>
          <span className={styles.emailNotValid}>
            {getLanguageSpecificContent("emailNotValid")}
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
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.passwordVisibilityIcon}
            >
              {passwordVisibilitySvg}
            </span>
            <span className={styles.passwordPlaceholder}>
              {getLanguageSpecificContent("passwordPlaceholder")}
            </span>
          </label>

          <div className={styles.passworIndicatorC}>
            <span>{getLanguageSpecificContent("passwordIndicator-1")}</span>
            {/* <span className={styles.passwordStrength}>Слабый</span> */}
            <span className={styles.passwordWeak}>
              {getLanguageSpecificContent("passwordIndicator-2")}
            </span>
            <span className={styles.passwordStrong}>
              {getLanguageSpecificContent("passwordIndicator-3")}
            </span>
          </div>
        </div>
        <div className={styles.next}>
          <button
            className={
              isValidPhoneNr && isValidEmail && isValidPassword
                ? styles.activeBtn
                : ""
            }
            type='submit'
          >
            {getLanguageSpecificContent("continue")}
          </button>
          <Link href='/auth'>
            <a
              className={
                isValidPhoneNr && isValidEmail && isValidPassword
                  ? styles.activeLink
                  : ""
              }
            >
              {getLanguageSpecificContent("linkToAuth")}
            </a>
          </Link>
        </div>
      </form>
    </section>
  );
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
