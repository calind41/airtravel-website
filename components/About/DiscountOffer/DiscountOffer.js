import React from "react";
import styles from "./DiscountOffer.module.scss";
import { discountSvg } from "./svg";
import PhoneNrInput from "./PhoneNrInput/PhoneNrInput";
// import { i18n } from "../../../i18n";

export default function DiscountOffer({ t, inAboutUs }) {
  const getLanguageSpecificContent = (key) => {
    return t(`discountOffer:${key}`);
  };
  return (
    <section
      style={inAboutUs ? { marginBottom: "43px" } : {}}
      className={styles.container}
    >
      <div className={styles.getDiscount}>
        <h2>{getLanguageSpecificContent("h2")}</h2>
        <form>
          <span className={styles.labelText}>
            {getLanguageSpecificContent("labelText")}
          </span>
          <PhoneNrInput t={t} inAboutUs={inAboutUs} />
        </form>
      </div>
      <div className={styles.svgContainer}>{discountSvg}</div>
    </section>
  );
}
