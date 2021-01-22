import React from "react";
import styles from "./InsuranceOption.module.scss";
import {
  withoutInsuranceSvg,
  iflyBasicSvg,
  iflyPlusSvg,
  redXSvg,
  greenCheckmarkSvg,
} from "./svg";
// import { i18n } from "../../../../i18n";

export default function InsuranceOption({
  t,
  name,
  type,
  medicalExpenses,
  liabilityOne,
  liabilityTwo,
  baggageInsurance,
  price,
}) {
  const getLanguageSpecificContent = (key) => {
    return t(`payment:${key}`);
  };

  let typeIcon;
  if (type === "without") {
    typeIcon = withoutInsuranceSvg;
  } else if (type === "basic") {
    typeIcon = iflyBasicSvg;
  } else if (type === "plus") {
    typeIcon = iflyPlusSvg;
  }
  const chooseOption = (evt) => {
    const buttons = document.querySelectorAll(`.${styles.insurancePrice}`);
    buttons.forEach((b) => {
      const splitRes = b.textContent.split(
        `${getLanguageSpecificContent("InsuranceOption-chosen")} `
      );
      if (splitRes.length === 2) {
        b.textContent = splitRes[1];
      }
      b.classList.remove(styles.selectedInsuranceOption);
    });
    evt.target.textContent =
      `${getLanguageSpecificContent("InsuranceOption-chosen")} ` +
      evt.target.textContent;
    evt.target.classList.add(styles.selectedInsuranceOption);
  };
  return (
    <div
      className={
        type === "plus"
          ? `${styles.container} ${styles.containerInsurancePlus}`
          : `${styles.container}`
      }
    >
      <header>
        <span>{name}</span>
        <span>{typeIcon}</span>
      </header>
      <main
        style={type === "plus" ? { borderRight: "none", width: "195.6px" } : {}}
        className={styles.insuranceDetails}
      >
        <div>
          <span className={styles.icon}>
            {type === "basic" || type === "plus" ? greenCheckmarkSvg : redXSvg}
          </span>
          <span>{getLanguageSpecificContent("InsuranceOption-text1")}</span>
        </div>

        <div className={styles.medicalExpenses}>
          <div className={styles.title}>
            {getLanguageSpecificContent("InsuranceOption-text2")}{" "}
          </div>
          <div>
            <span className={styles.icon}>
              {type === "basic" || type === "plus"
                ? greenCheckmarkSvg
                : redXSvg}
            </span>
            <span>{medicalExpenses}€</span>
          </div>
        </div>
        <div className={styles.materialLiability}>
          <div className={styles.title}>
            {getLanguageSpecificContent("InsuranceOption-text3")}
          </div>
          <div>
            <div className={styles.icon}>
              {type === "plus" ? greenCheckmarkSvg : redXSvg}
            </div>
            <div>
              <span>
                {liabilityOne}€{" "}
                {getLanguageSpecificContent("InsuranceOption-text4")}
              </span>
              <span style={type === "plus" ? { paddingBottom: "10px" } : {}}>
                {liabilityTwo}€{" "}
                {getLanguageSpecificContent("InsuranceOption-text5")}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.baggageInsurance}>
          <div className={styles.title}>
            {getLanguageSpecificContent("InsuranceOption-text6")}
          </div>
          <div>
            <div className={styles.icon}>
              {type === "plus" ? greenCheckmarkSvg : redXSvg}
            </div>
            <div>{baggageInsurance}€</div>
          </div>
        </div>
      </main>
      <footer onClick={chooseOption} className={styles.insurancePrice}>
        {price === "0"
          ? `${getLanguageSpecificContent("InsuranceOption-text7")}`
          : `${price} €`}
      </footer>
    </div>
  );
}
