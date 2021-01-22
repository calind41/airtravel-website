import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./VerificationCodeC.module.scss";
import router from "next/router";
import { i18n } from "../../../i18n";

const createStars = (n) => {
  return new Array(n + 1).join("●");
};
const getLanguageSpecificContent = (key) => {
  return i18n.t(`verificationCode:${key}`);
};

export default function VerificationCodeC_M() {
  // Check from where the component is rendered
  const router = useRouter();
  const { registration, resetPassword } = router.query;

  const [code, setCode] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [previousLength, setPreviousLength] = useState(0);
  let timer = null;

  useEffect(() => {
    // On clicking outside of InfoCard
    const hideInfoCard = (evt) => {
      const target = evt.target;
      const infoCardContainer = document.querySelector(
        `.${styles.infoCardContainer}`
      );
      let onInfoCardSurface = false;
      let classNames = [
        `${styles.infoCardContainer}`,
        `${styles.title}`,
        `${styles.info}`,
        `${styles.p1}`,
        `${styles.p2}`,
      ];
      classNames.forEach((item) => {
        if (target.classList.contains(item)) onInfoCardSurface = true;
      });
      if (onInfoCardSurface) return;

      infoCardContainer &&
        infoCardContainer.classList.remove(`${styles.infoCardContainerShow}`);
    };
    document
      .querySelector("body")
      .addEventListener("click", (evt) => hideInfoCard(evt));

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", (evt) => hideInfoCard(evt));
    };
  }, []);

  const onChangeInputVerificationCode = (evt) => {
    const target = evt.target;
    const value = target.value;
    const len = value.length;

    if (previousLength < len) {
      let temp = actualValue + value.substring(len - 1, len);
      setActualValue(temp);
      setPreviousLength(len);
    } else {
      let temp = actualValue.substring(0, len);
      setActualValue(temp);
      setPreviousLength(len);
    }

    let current_val;
    current_val = len;
    setCode(
      createStars(current_val - 1) +
        value.substring(current_val - 1, current_val)
    );
    clearTimeout(timer);
    timer = setTimeout(() => {
      setCode(createStars(current_val));
    }, 150);
  };

  const showInfoCard = () => {
    const infoCardContainer = document.querySelector(
      `.${styles.infoCardContainer}`
    );
    infoCardContainer.classList.add(styles.infoCardContainerShow);
  };

  const onKeyDownInputVCode = (evt) => {
    // Proceed to next step if user pressed Enter
    if (evt.keyCode === 13) {
      if (registration) router.push("/auth");
      if (resetPassword) router.push("/new-password");
    }
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
        <label htmlFor='verificationCode'>
          <input
            type='text'
            id='verificationCode'
            value={code}
            onChange={(evt) => {
              onChangeInputVerificationCode(evt);
            }}
            onKeyDown={(evt) => onKeyDownInputVCode(evt)}
            required
            maxLength='6'
            autoComplete='off'
            spellCheck='false'
          />
          <span className={styles.vCodePlaceholder}>
            {getLanguageSpecificContent("vCodePlaceholder")}
          </span>
        </label>
        <div className={styles.actionsGroup}>
          <a>
            <span>{getLanguageSpecificContent("actionsGroup1")}</span>
          </a>
          <a>
            <span onClick={showInfoCard}>
              {getLanguageSpecificContent("actionsGroup2")}
            </span>
          </a>
          <a>
            <span>{getLanguageSpecificContent("actionsGroup3")}</span>
          </a>
        </div>
        <div className={styles.bottomMessage}>
          {getLanguageSpecificContent("bottomMessage")}
        </div>
      </main>
      <InfoCard />
    </div>
  );
}

const InfoCard = () => {
  return (
    <div className={styles.infoCardContainer}>
      <div className={styles.title}>
        {getLanguageSpecificContent("InfoCard-title")}
      </div>
      <div className={styles.info}>
        <span className={styles.p1}>
          {getLanguageSpecificContent("InfoCard-p1")}
        </span>
        <span className={styles.p2}>
          {getLanguageSpecificContent("InfoCard-p2")}
        </span>
      </div>
    </div>
  );
};
