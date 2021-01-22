import React from "react";
import styles from "./PaymentMethods.module.scss";
import { iflyLogoSvg, bankPaymentSvg } from "./svg";
import OfficePaymentModal from "./OfficePaymentModal/OfficePaymentModal";
import opStyles from "./OfficePaymentModal/OfficePaymentModal.module.scss";

import { i18n } from "../../../i18n";

export default function PaymentMethods() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`payment:${key}`);
  };
  const showOfficePaymentModal = () => {
    document.querySelector(`.${opStyles.container}`).style.display = "flex";
  };
  return (
    <section className={styles.container}>
      <header className={styles.title}>
        {getLanguageSpecificContent("PaymentMethods-title")}
      </header>
      <main className={styles.paymentOptions}>
        <div onClick={showOfficePaymentModal} className={styles.officePay}>
          <span>{iflyLogoSvg}</span>
          <span>{getLanguageSpecificContent("PaymentMethods-m1")}</span>
        </div>
        <div className={styles.bankPay}>
          <span>{bankPaymentSvg}</span>
          <span>{getLanguageSpecificContent("PaymentMethods-m2")}</span>
        </div>
        <div className={styles.terminalPay}>
          <span>{getLanguageSpecificContent("PaymentMethods-m3")}</span>
        </div>
      </main>
      <footer>{getLanguageSpecificContent("PaymentMethods-footer")}</footer>
      <OfficePaymentModal />
    </section>
  );
}
