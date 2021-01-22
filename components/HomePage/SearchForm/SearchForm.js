import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import stylesHomePage from "../HomePage.module.css";
import FromInput from "./FromInput/FromInput";
import ToInput from "./ToInput/ToInput";
import CalendarInput from "./CalendarInput/CalendarInput";
import PassengerDropdown from "./PassengerDropdown/PassengerDropdown";
import SearchButton from "./SearchButton/SearchButton";

export default function SearchForm({
  passLocationsState,
  passCalendarState,
  renderSForm,
}) {
  const [isRenderedSearchForm, setIsRenderedSearchForm] = useState(true);
  useEffect(() => {
    const handleOnClickBody = (evt) => {
      if (evt.target.classList.contains(stylesHomePage.homePageC)) {
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
  const swapLocations = () => {
    let from_input = document.querySelector("#fromInputId");
    let from_span = document.querySelector("#fromInputAcronymId ");

    let to_input = document.querySelector("#toInputId");
    let to_span = document.querySelector("#toInputAcronymId");

    let temp_txt = from_input.value;
    let temp_acronym = from_span.textContent;

    from_input.value = to_input.value;
    from_span.textContent = to_span.textContent;

    to_input.value = temp_txt;
    to_span.textContent = temp_acronym;
  };

  const switchToSForm = () => {
    renderSForm();
    setIsRenderedSearchForm(false);
  };

  if (isRenderedSearchForm) {
    return (
      <div id='searchFormId' className={styles.searchFormC}>
        <div>FLIGHTS</div>
        <FromInput passLocationsState={passLocationsState} />
        <div onClick={swapLocations} className={styles.swap}>
          <svg
            className='_2sB1Q _5YKYt'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fillRule='evenodd'
              d='M7.8 8.8l1.7 1.7a.8.8 0 0 1-1 1l-3-3a.8.8 0 0 1 0-1l3-3a.8.8 0 0 1 1 1L7.8 7.3H16c1.7 0 2.8 1 2.8 2.7a.8.8 0 1 1-1.5 0c0-1-.4-1.3-1.3-1.3H7.8zm8.4 6.4l-1.7-1.7a.8.8 0 0 1 1-1l3 3a.8.8 0 0 1 0 1l-3 3a.8.8 0 0 1-1-1l1.7-1.8H8c-1.7 0-2.8-1-2.8-2.7a.8.8 0 1 1 1.5 0c0 1 .4 1.3 1.3 1.3h8.2z'
            ></path>
          </svg>
        </div>
        <ToInput passLocationsState={passLocationsState} />
        <CalendarInput passCalendarState={passCalendarState} />
        <PassengerDropdown />
        <SearchButton />
        <div onClick={switchToSForm} className={styles.multiCityContainer}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            className='_3JLhE _3LjkP'
          >
            <g fill='none' fillRule='evenodd' stroke='#FFF'>
              <rect width='3' height='3' x='2.5' y='2.5' rx='1.5'></rect>
              <rect width='3' height='3' x='6.5' y='6.5' rx='1.5'></rect>
              <rect width='3' height='3' x='10.5' y='10.5' rx='1.5'></rect>
              <path d='M5.5 3.5h5a2 2 0 1 1 0 4h-1m1 5H5a2.5 2.5 0 1 1 0-5h1.5'></path>
            </g>
          </svg>
          <span>Multi-city</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
