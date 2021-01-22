import React, { useState, useEffect } from "react";
import styles from "./SearchFlightForm.module.scss";
import Departure from "./Departure/Departure";
import Arrival from "./Arrival/Arrival";
import FlightDate from "./FlightDate/FlightDate";
import PassengerDropdown from "./PassengerDropdown/PassengerDropdown";
import SearchButton from "./SearchButton/SearchButton";
import Navbar from "../Layout/Navbar/Navbar";
import { closeIconSvg } from "./svg";
import { useRouter } from "next/router";

export default function SearchFlightForm_M({
  passLocationsState,
  passCalendarState,
  renderSForm,
  inAboutUs,
  inLandingPage,
}) {
  const [isRenderedSearchForm, setIsRenderedSearchForm] = useState(false);

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

  const switchToSForm = () => {
    renderSForm();
    setIsRenderedSearchForm(false);
  };

  const openSearchForm = () => {
    setIsRenderedSearchForm(true);
    const sf = document.querySelector(`.${styles.searchFormC}`);
    if (sf) {
      sf.classList.remove(styles.slideDown);
      sf.classList.add(styles.slideUp);
    }
  };
  if (!inAboutUs) {
    return (
      <div className={styles.container}>
        <Navbar inLandingPage={inLandingPage} mode='light' />
        <header>
          <h1>
            Быстрый способ организовать <span>свою поездку!</span>
          </h1>
        </header>
        <button onClick={openSearchForm} className={styles.formPortal}>
          Куда летим?
        </button>
        {isRenderedSearchForm ? <SearchForm_M /> : null}
      </div>
    );
  } else {
    console.log("enter in about us ");
    return (
      <div className={`${styles.container} ${styles.containerAboutUs}`}>
        <button
          onClick={openSearchForm}
          className={`${styles.formPortal} ${styles.formPortalInAboutUs}`}
        >
          Куда летим?
        </button>
        {isRenderedSearchForm ? <SearchForm_M /> : null}
      </div>
    );
  }
}

export const SearchForm_M = ({ id, unmountSearchForm }) => {
  let inResults = false;
  let containerClassNames = "";
  const router = useRouter();
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

  containerClassNames = `${styles.searchFormC}`;

  const [renderedArrivalLocations, setRenderedArrivalLocations] = useState(
    false
  );
  const renderArrivalLocations = () => {
    setRenderedArrivalLocations(true);
  };
  const unmountArrivalLocations = () => {
    setRenderedArrivalLocations(false);
  };

  const [renderedDepartureLocations, setRenderedDepartureLocations] = useState(
    false
  );
  const renderDepartureLocations = () => {
    setRenderedDepartureLocations(true);
  };
  const unmountDepartureLocations = () => {
    setRenderedDepartureLocations(false);
  };

  const [renderedCalendar, setRenderedCalendar] = useState(false);
  const renderCalendar = () => {
    setRenderedCalendar(true);
  };

  const [renderedDropdown, setRenderedDropdown] = useState(false);
  const renderDropdown = () => {
    setRenderedDropdown(true);
  };
  const unmountDropdown = () => {
    setRenderedDropdown(false);
  };

  const [departureValue, setDepartureValue] = useState("");
  const [departureAcronym, setDepartureAcronym] = useState("");

  const receiveDepartureInputValue = (v, acronym) => {
    setDepartureValue(v);
    setDepartureAcronym(acronym);
  };

  const [arrivalValue, setArrivalValue] = useState("");
  const [arrivalAcronym, setArrivalAcronym] = useState("");
  const receiveArrivalInputValue = (v, acronym) => {
    setArrivalValue(v);
    setArrivalAcronym(acronym);
  };

  const [nrPassengers, setNrPassengers] = useState(0);
  const receiveNrPassengers = (nrP) => {
    setNrPassengers(nrP);
  };

  const [dateSelected, setDateSelected] = useState(false);
  const receiveDateSelected = () => {
    setDateSelected(true);
  };

  // const [isValid, setIsValid] = useState(false);
  let isValid = false;
  if (
    dateSelected &&
    parseInt(nrPassengers) !== 0 &&
    arrivalValue !== "" &&
    departureValue !== ""
  ) {
    console.log("valid");
    isValid = true;
    document
      .querySelectorAll("#searchB")
      .forEach((item) => (item.style.backgroundColor = "#0080ff"));
  }

  const closeSearchForm = () => {
    document
      .querySelector(`.${styles.searchFormC}`)
      .classList.add(styles.slideDown);
    document
      .querySelector(`.${styles.searchFormC}`)
      .classList.remove(styles.slideUp);
  };

  const searchFlights = () => {
    if (dateSelected && arrivalValue !== "" && departureValue !== "") {
      router.push("/flight-search-result");
    }
  };

  return (
    <div id={id} className={`${styles.searchFormC} ${styles.slideUp}`}>
      <span onClick={closeSearchForm} className={styles.closeIcon}>
        {closeIconSvg}
      </span>
      <div className={styles.wrapper}>
        <Departure
          inputValue={departureValue}
          airportAcronym={departureAcronym}
          renderedDepartureLocations={renderedDepartureLocations}
          passInputValue={receiveDepartureInputValue}
          renderArrivalLocations={renderArrivalLocations}
          unmountArrivalLocations={unmountArrivalLocations}
        />
        <Arrival
          inputValue={arrivalValue}
          airportAcronym={arrivalAcronym}
          passInputValue={receiveArrivalInputValue}
          renderedArrivalLocations={renderedArrivalLocations}
          unmountArrivalLocations={unmountArrivalLocations}
          renderDepartureLocations={renderDepartureLocations}
          renderCalendar={renderCalendar}
          renderArrivalLocations={renderArrivalLocations}
        />
        <FlightDate
          renderedCalendar={renderedCalendar}
          renderArrivalLocations={renderArrivalLocations}
          renderDropdown={renderDropdown}
          passDateSelected={receiveDateSelected}
        />
        <PassengerDropdown
          renderedDropdown={renderedDropdown}
          renderCalendar={renderCalendar}
          renderDropdown={renderDropdown}
          unmountDropdown={unmountDropdown}
          passNrPassengers={receiveNrPassengers}
          searchFlights={searchFlights}
        />
        <SearchButton />
      </div>
    </div>
  );
};
