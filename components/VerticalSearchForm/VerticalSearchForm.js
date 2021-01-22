import React, { useState, useEffect } from "react";
import styles from "./VerticalSearchForm.module.scss";
import Departure from "./Departure/Departure";
import Arrival from "./Arrival/Arrival";
import FlightDate from "./FlightDate/FlightDate";
import PassengerDropdown from "./PassengerDropdown/PassengerDropdown";
import SearchButton from "./SearchButton/SearchButton";
import Navbar from "../Layout/Navbar/Navbar";
import PhoneNrInput from "./PhoneNrInput/PhoneNrInput";

export default function VerticalSearchForm({
  passLocationsState,
  passCalendarState,
  renderSForm,
  inAboutUs,
  positionLocationClass,
}) {
  const [isRenderedSearchForm, setIsRenderedSearchForm] = useState(true);

  useEffect(() => {
    const handleOnClickBody = (evt) => {
      if (evt.target.classList.contains(styles.container)) {
        const locationsFrom = document.querySelector("#locationsFromId");
        const locationsTo = document.querySelector("#locationsToId");
        const dropdown = document.querySelector("#dropdownCid");
        const passengerSvg = document.querySelector("#passengerSvgId");
        const departingSvg = document.querySelector("#departingSvgId");
        const wrapper = document.querySelector("#wrapperId");

        if (locationsFrom) locationsFrom.style.display = "none";
        if (locationsTo) locationsTo.style.display = "none";
        if (dropdown) dropdown.style.display = "none";
        if (passengerSvg) passengerSvg.style.transform = "rotate(0deg)";
        if (wrapper) wrapper.style.display = "none";
        if (departingSvg) departingSvg.style.transform = "rotate(0deg)";
      }
    };
    document.querySelector("body").addEventListener("click", handleOnClickBody);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", handleOnClickBody);
    };
  }, []);

  if (isRenderedSearchForm && !inAboutUs) {
    return (
      <div className={styles.container}>
        <Navbar mode='light' />
        <div className={styles.searchFormAndHeaderWrapper}>
          <header>
            <h1>
              Всего 5 минут чтобы организовать <span>свое путешествие!</span>
            </h1>
          </header>
          <SearchForm />
        </div>
      </div>
    );
  }
}

export const SearchForm = ({ inFlightSearchResults }) => {
  let inResults = false;
  let containerClassNames = "";

  useEffect(() => {
    const handleOnClickBody = (evt) => {
      if (
        evt.target.classList.contains("flightSearchResult") ||
        evt.target.id === "sf_filter_id"
      ) {
        const locationsFrom = document.querySelector("#locationsFromId");
        const locationsTo = document.querySelector("#locationsToId");
        const dropdown = document.querySelector("#dropdownCid");
        const passengerSvg = document.querySelector("#passengerSvgId");
        const departingSvg = document.querySelector("#departingSvgId");
        const wrapper = document.querySelector("#wrapperId");

        if (locationsFrom) locationsFrom.style.display = "none";
        if (locationsTo) locationsTo.style.display = "none";
        if (dropdown) dropdown.style.display = "none";
        if (passengerSvg) passengerSvg.style.transform = "rotate(0deg)";
        if (wrapper) wrapper.style.display = "none";
        if (departingSvg) departingSvg.style.transform = "rotate(0deg)";
      }
    };
    document.querySelector("body").addEventListener("click", handleOnClickBody);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", handleOnClickBody);
    };
  }, []);

  if (inFlightSearchResults) {
    inResults = true;
    containerClassNames = `${styles.searchFormC} ${styles.searchFormCinRes}`;
  } else {
    containerClassNames = `${styles.searchFormC}`;
  }
  const swapLocations = () => {
    let from_input = document.querySelector("#fromInputId");
    let from_span = document.querySelector("#fromInputAcronymId ");

    let to_input = document.querySelector("#toInputId");
    let to_span = document.querySelector("#toInputAcronymId");

    if (from_input.value.length === 0 || to_input.value.length === 0) return;

    let temp_txt = from_input.value;
    let temp_acronym = from_span.textContent;

    from_input.value = to_input.value;
    from_span.textContent = to_span.textContent;
    to_input.value = temp_txt;
    to_span.textContent = temp_acronym;
  };
  return (
    <div
      className={
        inResults
          ? `${styles.searchFormC} ${styles.searchFormCinRes}`
          : `${styles.searchFormC}`
      }
    >
      <div className={styles.inputsWrapper}>
        <Departure />
        <Arrival positionLocationClass={"positionLocationClass"} />
        <FlightDate widthClass={inResults ? "widthClass" : ""} />
        <PassengerDropdown widthClass={inResults ? "widthClass" : ""} />
        <PhoneNrInput />
        <SearchButton
          positionClass={inResults ? "positionClass" : ""}
          inFlightSearchResults={inFlightSearchResults}
        />
      </div>
    </div>
  );
};

const swapSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18.001'
    viewBox='0 0 18 18.001'
  >
    <g id='Group_607' data-name='Group 607' transform='translate(-4 -5)'>
      <path
        id='Path_671'
        data-name='Path 671'
        d='M23.667,7.167v0h0a.829.829,0,0,1-.244.587l-3.333,3.333a.833.833,0,1,1-1.178-1.178L20.822,8H12.833a.833.833,0,1,1,0-1.667h7.988L18.911,4.422a.833.833,0,1,1,1.178-1.178l3.333,3.333a.829.829,0,0,1,.244.587h0Z'
        transform='translate(-1.667 2)'
        fill='#696a6b'
      />
      <path
        id='Path_672'
        data-name='Path 672'
        d='M4,7.833A.833.833,0,1,0,4.833,7,.834.834,0,0,0,4,7.833Zm3.333,0A.833.833,0,1,0,8.167,7,.834.834,0,0,0,7.333,7.833Z'
        transform='translate(0 1.333)'
        fill='#696a6b'
      />
      <path
        id='Path_673'
        data-name='Path 673'
        d='M15.667,21.167a.833.833,0,0,1-.833.833H6.845l1.911,1.911a.833.833,0,1,1-1.178,1.178L4.244,21.756a.832.832,0,0,1-.182-.272A.823.823,0,0,1,4,21.169H4v-.005H4a.823.823,0,0,1,.063-.315.832.832,0,0,1,.182-.272l3.333-3.333a.833.833,0,0,1,1.178,1.178L6.845,20.333h7.988A.833.833,0,0,1,15.667,21.167Z'
        transform='translate(0 -2.333)'
        fill='#696a6b'
      />
      <path
        id='Path_674'
        data-name='Path 674'
        d='M23.333,21.833A.833.833,0,1,0,24.167,21,.834.834,0,0,0,23.333,21.833Zm-3.333,0A.833.833,0,1,0,20.833,21,.834.834,0,0,0,20,21.833Z'
        transform='translate(-3 -3)'
        fill='#696a6b'
      />
    </g>
  </svg>
);
