import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Registration.module.scss";
import { passwordVisibilitySvg } from "./svg";
import {
  closeIconSvg,
  arrowNextSvg,
  goBackMobileSvg,
} from "../SearchFlightForm/svg";
import { i18n } from "../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`register:${key}`);
};

export default function Registration_M() {
  const [phoneNr, setPhoneNr] = useState("");
  const [prevPhoneNrLen, setPrevPhoneNrLen] = useState(5);
  const [inputKeyCode, setInputKeyCode] = useState(50);
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

  const openMultistepForm = () => {
    const modal = document.querySelector(`.${styles.phoneNrModalContainer}`);
    modal.classList.add(styles.displayBlock);
    modal.classList.remove(styles.displayNone);
    modal.classList.add(styles.slideUp);
    modal.classList.remove(styles.slideDown);
    modal.classList.remove(styles.slideLeft);
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
      <div className={styles.formEntryPoint} onClick={openMultistepForm}>
        {getLanguageSpecificContent("phoneNr")}
      </div>
      <div className={styles.next}>
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
      <PhoneNrModal
        onChangePhoneNr={onChangePhoneNr}
        onFocusAddPhoneNrPrefix={onFocusAddPhoneNrPrefix}
        onBlurPhoneInputHidePrefix={onBlurPhoneInputHidePrefix}
        onKeyDownPreventSpaceChars={onKeyDownPreventSpaceChars}
        phoneNr={phoneNr}
        isValidPhoneNr={isValidPhoneNr}
      />
      <EmailModal
        onChangeEmail={onChangeEmail}
        onBlurEmail={onBlurEmail}
        email={email}
        phoneNrInput={phoneNr}
        isValidEmail={isValidEmail}
      />
      <PasswordModal
        onChangePassword={onChangePassword}
        togglePasswordVisibility={togglePasswordVisibility}
        password={password}
        phoneNrInput={phoneNr}
        emailInput={email}
        isValidPassword={isValidPassword}
      />
    </section>
  );
}

function PhoneNrModal({
  onChangePhoneNr,
  onFocusAddPhoneNrPrefix,
  onBlurPhoneInputHidePrefix,
  onKeyDownPreventSpaceChars,
  phoneNr,
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
    const modalEmail = document.querySelector(`.${styles.emailModalContainer}`);

    if (isValidPhoneNr) {
      modal.classList.add(styles.slideLeft);
      setTimeout(() => {
        modal.classList.add(styles.displayNone);
      }, 400);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideUp);
      modal.classList.remove(styles.slideDown);

      modalEmail.classList.add(styles.displayBlock);
      modalEmail.classList.remove(styles.displayNone);
      modalEmail.classList.remove(styles.slideUp);
      modalEmail.classList.remove(styles.slideDown);
      modalEmail.classList.remove(styles.slideLeft);
    }
  };
  return (
    <div className={`${styles.phoneNrModalContainer} ${styles.displayNone}`}>
      <nav className={styles.navigationContainer}>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("title")}</div>
        <div className={styles.pastInputContent}></div>
      </header>
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
          />
          <span className={styles.phoneNrPlaceholder}>
            {getLanguageSpecificContent("phoneNr")}
          </span>
        </label>
        <span className={styles.requiredField}>
          {getLanguageSpecificContent("requiredFieldPhoneNr")}
        </span>
        <span className={styles.numberNotValid}>
          {getLanguageSpecificContent("numberNotValid")}
        </span>
      </div>
      <div onClick={toNextInput} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("next")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}
function EmailModal({
  onChangeEmail,
  onBlurEmail,
  email,
  phoneNrInput,
  isValidEmail,
}) {
  const toPrevInput = () => {
    const modal = document.querySelector(`.${styles.emailModalContainer}`);
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
  const closeModal = () => {
    const modal = document.querySelector(`.${styles.emailModalContainer}`);
    modal.classList.remove(styles.slideUp);
    modal.classList.add(styles.slideDown);
    setTimeout(() => {
      modal.classList.add(styles.displayNone);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideLeft);
    }, 400);
  };
  const toNextInput = () => {
    const modal = document.querySelector(`.${styles.emailModalContainer}`);
    const modalEmail = document.querySelector(
      `.${styles.passwordModalContainer}`
    );

    if (isValidEmail) {
      modal.classList.add(styles.slideLeft);
      setTimeout(() => {
        modal.classList.add(styles.displayNone);
      }, 400);
      modal.classList.remove(styles.displayBlock);
      modal.classList.remove(styles.slideUp);
      modal.classList.remove(styles.slideDown);

      modalEmail.classList.add(styles.displayBlock);
      modalEmail.classList.remove(styles.displayNone);
      modalEmail.classList.remove(styles.slideUp);
      modalEmail.classList.remove(styles.slideDown);
      modalEmail.classList.remove(styles.slideLeft);
    }
  };
  return (
    <div className={`${styles.emailModalContainer}  ${styles.displayNone}`}>
      <nav className={styles.navigationContainer}>
        <div onClick={toPrevInput}>{goBackMobileSvg}</div>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("title")}</div>
        <div className={styles.pastInputContent}>+373 {phoneNrInput}</div>
      </header>
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
      <div onClick={toNextInput} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("next")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}
function PasswordModal({
  onChangePassword,
  password,
  togglePasswordVisibility,
  phoneNrInput,
  emailInput,
  isValidPassword,
}) {
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
    console.log("called");
  };
  const toPrevInput = () => {
    const modal = document.querySelector(`.${styles.passwordModalContainer}`);
    const modalPhoneNr = document.querySelector(
      `.${styles.emailModalContainer}`
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

  const toVerificationCode = () => {
    if (isValidPassword) {
      const registration = true;

      router.push(
        `/verification-code?registration=${registration}`,
        "verification-code"
      );
    }
  };
  return (
    <div className={`${styles.passwordModalContainer} ${styles.displayNone}  `}>
      <nav className={styles.navigationContainer}>
        <div onClick={toPrevInput}>{goBackMobileSvg}</div>
        <div onClick={closeModal}>{closeIconSvg}</div>
      </nav>
      <header>
        <div>{getLanguageSpecificContent("title")}</div>
        <div className={styles.pastInputContent}>
          +373 {phoneNrInput} · {emailInput}{" "}
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
          <span className={styles.passwordWeak}>
            {getLanguageSpecificContent("passwordIndicator-2")}
          </span>
          <span className={styles.passwordStrong}>
            {getLanguageSpecificContent("passwordIndicator-3")}
          </span>
        </div>
      </div>
      <div onClick={toVerificationCode} className={styles.toNextInputBtn}>
        <span>{getLanguageSpecificContent("continue")}</span>
        <span>{arrowNextSvg}</span>
      </div>
    </div>
  );
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
