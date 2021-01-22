import React, { useState } from "react";
import Link from "next/link";
import styles from "./Authorization.module.scss";
import { arrowRightSvg } from "./svg";
import { useRouter } from "next/router";
import PhoneInput from "./PhoneInput/PhoneInput";

// import { i18n } from "../../i18n";

export default function Authorization({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`auth:${key}`);
  };

  const router = useRouter();
  const [password, setPassword] = useState("");

  const [showPhoneNrC, setShowPhoneNrC] = useState(true);
  const [showPasswordC, setShowPasswordC] = useState(false);

  const setVisiblePasswordField = () => {
    setShowPasswordC(true);
  };
  const setHeaderTitleForPasswordField = () => {
    setShowPhoneNrC(false);
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };
  const toMyPersonalRoom = () => {
    router.push("/personal-room");
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {getLanguageSpecificContent("heading-title")} iFly
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("heading-subtitle-1")}
          {showPhoneNrC
            ? `${getLanguageSpecificContent("heading-subtitle-2")}`
            : `${getLanguageSpecificContent("heading-subtitle-3")}`}
          {getLanguageSpecificContent('heading-subtitle-4"')}
        </div>
      </div>
      <main>
        {/* PhoneNr Container */}
        <PhoneInput
          t={t}
          setVisiblePasswordField={setVisiblePasswordField}
          setHeaderTitleForPasswordField={setHeaderTitleForPasswordField}
        />
        {/* Password Container */}
        <div
          style={showPasswordC ? { display: "block" } : { display: "none" }}
          className={styles.passwordC}
        >
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
            <span onClick={toMyPersonalRoom} className={styles.iconArrowNext}>
              {arrowRightSvg}
            </span>
          </label>
        </div>

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
