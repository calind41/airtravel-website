import React, { useState } from "react";
import InsuranceOption from "./InsuranceOption/InsuranceOption";
import styles from "./InsuranceOptions.module.scss";

import { redXSvg, greenCheckmarkSvg } from "./InsuranceOption/svg";

import { i18n } from "../../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`payment:${key}`);
};

export default function InsuranceOptions() {
  const withoutProps = {
    name: getLanguageSpecificContent("Insurance-option1"),
    type: "without",
    medicalExpenses: "0",
    liabilityOne: "0",
    liabilityTwo: "0",
    baggageInsurance: "0",
    price: "0",
  };

  const basicProps = {
    name: "iFly Basic",
    type: "basic",
    medicalExpenses: "600 000",
    liabilityOne: "0",
    liabilityTwo: "0",
    baggageInsurance: "0",
    price: "54",
  };
  const plusProps = {
    name: "iFly Plus",
    type: "plus",
    medicalExpenses: "600 000",
    liabilityOne: "30 000",
    liabilityTwo: "15 000",
    baggageInsurance: "800",
    price: "76",
  };
  const [selectedInsurance, setSelectedInsurance] = useState(basicProps);

  const receiveOptionSelected = (type) => {
    switch (type) {
      case "without":
        setSelectedInsurance(withoutProps);
        break;
      case "basic":
        setSelectedInsurance(basicProps);
        break;
      case "plus":
        setSelectedInsurance(plusProps);
        break;
      default:
        setSelectedInsurance(basicProps);
    }
  };
  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.heading}>
          <div>
            {getLanguageSpecificContent("InsuranceOptions-heading-title")}
          </div>
        </div>
        <div className={styles.insuranceOptionsContainer}>
          <InsuranceOption
            {...withoutProps}
            passOptionSelected={receiveOptionSelected}
          />
          <InsuranceOption
            {...basicProps}
            passOptionSelected={receiveOptionSelected}
          />
          <InsuranceOption
            {...plusProps}
            passOptionSelected={receiveOptionSelected}
          />
        </div>
      </section>
      <SelectedInsurance {...selectedInsurance} />
    </div>
  );
}

const SelectedInsurance = ({
  name,
  type,
  medicalExpenses,
  liabilityOne,
  liabilityTwo,
  baggageInsurance,
  price,
}) => {
  return (
    <main className={styles.insuranceDetails}>
      <div>
        <span className={styles.icon}>
          {type === "basic" || type === "plus" ? greenCheckmarkSvg : redXSvg}
        </span>
        <span>{getLanguageSpecificContent("InsuranceOption-text1")}</span>
      </div>

      <div className={styles.medicalExpenses}>
        <div className={styles.title}>
          {getLanguageSpecificContent("InsuranceOption-text2")}
        </div>
        <div>
          <span className={styles.icon}>
            {type === "basic" || type === "plus" ? greenCheckmarkSvg : redXSvg}
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
            <span style={type === "plus" ? { paddingBottom: "10.8px" } : {}}>
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
  );
};
