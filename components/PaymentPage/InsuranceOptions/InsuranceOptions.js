import React from "react";
import InsuranceOption from "./InsuranceOption/InsuranceOption";
import styles from "./InsuranceOptions.module.scss";

// import { i18n } from "../../../i18n";

export default function InsuranceOptions({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`payment:${key}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div>
          {getLanguageSpecificContent("InsuranceOptions-heading-title")}
        </div>
        <div>
          <span>
            {getLanguageSpecificContent("InsuranceOptions-heading-subtitle1")}
          </span>
          <span>
            {getLanguageSpecificContent("InsuranceOptions-heading-subtitle2")}
          </span>
        </div>
      </div>
      <InsuranceOption
        t={t}
        name={getLanguageSpecificContent("Insurance-option1")}
        type='without'
        medicalExpenses='0'
        liabilityOne='0'
        liabilityTwo='0'
        baggageInsurance='0'
        price='0'
      />
      <InsuranceOption
        t={t}
        name='iFly Basic'
        type='basic'
        medicalExpenses='600 000'
        liabilityOne='0'
        liabilityTwo='0'
        baggageInsurance='0'
        price='54'
      />
      <InsuranceOption
        t={t}
        name='iFly Plus'
        type='plus'
        medicalExpenses='600 000'
        liabilityOne='30 000'
        liabilityTwo='15 000'
        baggageInsurance='800'
        price='76'
      />
    </section>
  );
}
