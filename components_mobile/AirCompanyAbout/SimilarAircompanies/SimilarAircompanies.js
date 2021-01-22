import React from "react";
import styles from "./SimilarAircompanies.module.scss";

export default function SimilarAircompanies({
  logoList,
  headerTextValue,
  footerMessage,
}) {
  return (
    <>
      <header id='similarAirCompanies' className={styles.similarAirCheader}>
        {headerTextValue}
      </header>
      <section className={styles.similarAirCompaniesC}>
        {logoList.map((item, idx) => {
          return <div key={idx}>{item}</div>;
        })}
      </section>
      {footerMessage ? (
        <footer className={styles.footerMessage}>{footerMessage}</footer>
      ) : null}
    </>
  );
}
