import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./AirCompanySearch.module.scss";
import { searchIconSvg, arrowDownSvg } from "./svg";
import SubscribeDiscount from "./SubscribeDiscount/SubscribeDiscount";

import { i18n } from "../../i18n";

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
];

export default function AirCompanySearch_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`airCompanies:${key}`);
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

  const [inputPlaceholder, setInputPlaceholder] = useState("");

  useEffect(() => {
    const val = getLanguageSpecificContent("inputPlaceholder");
    setInputPlaceholder(val);
  }, []);

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
    const alphabetIndexWrapper = document.querySelector(
      `.${styles.alphabetIndexWrapper}`
    );

    const letters = document.querySelectorAll(
      `.${styles.alphabetIndex} > span`
    );

    letters.forEach((item, idx) => {
      if (idx === pos) {
        item.classList.add(styles.selectedLetter);
        const letterIdx = parseInt(item.getAttribute("data-idx")) - 3;
        alphabetIndexWrapper.scrollLeft = letterIdx * 34;
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
              placeholder={inputPlaceholder}
              onChange={filterLocations}
              spellCheck='false'
              autoComplete='off'
              value={inputValue}
            />
            <button onClick={toAboutAircompanyPage}>
              <span>{searchIconSvg}</span>
            </button>
          </div>
          <div className={styles.alphabetIndexWrapper}>
            <div className={styles.alphabetIndex}>
              <span data-idx='1' className={styles.selectedLetter}>
                A<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='2'>
                B<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='3'>
                C<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='4'>
                D<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='5'>
                E<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='6'>
                F<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='7'>
                G<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='8'>
                H<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='9'>
                I<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='10'>
                J<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='11'>
                K<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='12'>
                L<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='13'>
                M<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='14'>
                N<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='15'>
                O<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='16'>
                P<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='17'>
                Q<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='18'>
                R<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='19'>
                S<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='20'>
                T<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='21'>
                U<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='22'>
                V<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='23'>
                W<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='24'>
                X<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='25'>
                Y<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
              <span data-idx='26'>
                Z<span className={styles.arrowDown}>{arrowDownSvg}</span>
              </span>
            </div>
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
      <SubscribeDiscount airC={true} />
    </section>
  );
}
