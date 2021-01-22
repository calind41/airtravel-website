import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./DirectionSearch.module.scss";
import { searchIconSvg } from "../AirCompanySearch/svg";
import { airCompanies } from "../AirCompanySearch/AirCompanySearch";
import SubscribeDiscount from "../AirCompanySearch/SubscribeDiscount/SubscribeDiscount";
import PaginationComponent from "./PaginationComponent/PaginationComponent";

// import { i18n } from "../../i18n";

export default function DirectionSearch({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`directions:${key}`);
  };

  const [inputValue, setInputValue] = useState("");
  const [directions, setDirections] = useState(airCompanies);
  const router = useRouter();
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  useEffect(() => {
    const val = getLanguageSpecificContent("inputPlaceholder");
    setInputPlaceholder(val);
  }, []);
  const filterLocations = (evt) => {
    setInputValue(evt.target.value);
    let input, filter;
    input = evt.target;
    filter = evt.target.value.toLowerCase();

    let filtered_directions = [];
    let temp = airCompanies;
    temp.map((direction, index) => {
      if (direction.toLowerCase().indexOf(filter) > -1) {
        // display it
        filtered_directions.push(direction);
      }
    });

    setDirections(filtered_directions);
  };
  const toAboutCityPage = () => {
    router.push("/about-city");
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.directionSearchHeader}>
        {getLanguageSpecificContent("title")}
      </h1>

      <section className={styles.container}>
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
            <button onClick={toAboutCityPage}>
              <span>{getLanguageSpecificContent("btnText")}</span>
              <span>{searchIconSvg}</span>
            </button>
          </div>

          <ul>
            {directions.map((item, idx) => {
              return (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </main>
        <div className={styles.subscribeDiscount}>
          <SubscribeDiscount t={t} airC={true} />
        </div>
      </section>
      <PaginationComponent min={1} max={5} />
    </div>
  );
}
