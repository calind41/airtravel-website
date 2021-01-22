import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./AirCompanySearch.module.scss";
import { searchIconSvg, arrowDownSvg } from "./svg";
import SubscribeDiscount from "./SubscribeDiscount/SubscribeDiscount";

export const airCompanies = [
  "Alrosa Mirny Air Enterprise",
  "Afriqiyah Airways",
  "Asian Wings Airways",
  "Alitalia Cityliner",
  "Avialeasing Aviation Company",
  "AirTran Airways",
  "Aurigny Air Services",
  "Aurigny Air Services",
  "Air Foyle",
  "Air Seychelles",
  "Augsburg Airway",
  "Adria Airways",
  "Alitalia Cityliner",
  "Aurigny Air Services",
  "Avialeasing Aviation Company",
  "Alrosa Mirny Air Enterprise",
  "Afriqiyah Airways",
  "Asian Wings Airways",
  "Alitalia Cityliner",
  "Avialeasing Aviation Company",
  "AirTran Airways",
  "Aurigny Air Services",
  "Aurigny Air Services",
  "Air Foyle",
  "Air Seychelles",
  "Augsburg Airway",
  "Adria Airways",
  "Alitalia Cityliner",
  "Aurigny Air Services",
  "Avialeasing Aviation Company",
  "Alrosa Mirny Air Enterprise",
  "Afriqiyah Airways",
  "Asian Wings Airways",
  "Alitalia Cityliner",
  "Avialeasing Aviation Company",
  "AirTran Airways",
  "Aurigny Air Services",
  "Aurigny Air Services",
  "Air Foyle",
  "Air Seychelles",
  "Augsburg Airway",
  "Adria Airways",
  "Alitalia Cityliner",
  "Aurigny Air Services",
  "Avialeasing Aviation Company",
];

export default function AirCompaniesSearch({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`airCompanies:${key}`);
  };

  const router = useRouter();
  useEffect(() => {
    const letters = document.querySelectorAll(
      `.${styles.alphabetIndex} > span`
    );
    letters.forEach((letter) => {
      letter.addEventListener("click", (evt) => chooseLetter(evt));
    });
  }, []);

  const [airC, setAirC] = useState(airCompanies);
  const [inputValue, setInputValue] = useState("");

  const filterLocations = (evt) => {
    if (evt.target.value.length === 1) {
      const typedLetter = evt.target.value.toLowerCase();
      moveAlphabetIndexTo(typedLetter);
    }
    setInputValue(evt.target.value);
    let input, filter;
    input = evt.target;
    filter = evt.target.value.toLowerCase();

    let filtered_companies = [];
    let temp = airCompanies;
    temp.map((company, index) => {
      if (company.toLowerCase().indexOf(filter) > -1) {
        // display it
        filtered_companies.push(company);
      }
    });

    setAirC(filtered_companies);
  };
  const moveAlphabetIndexTo = (letter) => {
    const pos = letter.charCodeAt(0) - 97;

    const letters = document.querySelectorAll(
      `.${styles.alphabetIndex} > span`
    );

    letters.forEach((item, idx) => {
      if (idx === pos) {
        item.classList.add(styles.selectedLetter);
      } else {
        item.classList.remove(styles.selectedLetter);
      }
    });
  };

  const chooseLetter = (evt) => {
    const letters = document.querySelectorAll(
      `.${styles.alphabetIndex} > span`
    );
    letters.forEach((letter) => letter.classList.remove(styles.selectedLetter));
    evt.target.classList.add(styles.selectedLetter);
  };

  const toAboutAircompanyPage = () => {
    router.push("/about-aircompany");
  };
  return (
    <section className={styles.container}>
      <div>
        <h1>{getLanguageSpecificContent("header")}</h1>
        <main>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              placeholder={getLanguageSpecificContent("inputPlaceholder")}
              onChange={filterLocations}
              spellCheck='false'
              autoComplete='off'
              value={inputValue}
            />
            <button onClick={toAboutAircompanyPage}>
              <span>{getLanguageSpecificContent("buttonText")}</span>
              <span>{searchIconSvg}</span>
            </button>
          </div>
          <div className={styles.alphabetIndex}>
            <span className={styles.selectedLetter}>
              A<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              B<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              C<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              D<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              E<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              F<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              G<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              H<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              I<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              J<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              K<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              L<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              M<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              N<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              O<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              P<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              Q<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              R<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              S<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              T<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              U<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              V<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              W<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              X<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              Y<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
            <span>
              Z<span className={styles.arrowDown}>{arrowDownSvg}</span>
            </span>
          </div>
          <ul>
            {airC.map((item, idx) => {
              return (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
      <div className={styles.subscribeDiscount}>
        <SubscribeDiscount t={t} airC={true} />
      </div>
    </section>
  );
}
