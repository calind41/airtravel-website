import React, { useState, useEffect } from "react";
import styles from "./SForm.module.css";
import stylesHomePage from "../../HomePage.module.css";
import stylesHeader from "../../Header/Header.module.css";
import FInput from "./FInput/FInput";
import TInput from "./TInput/TInput";
import CInput from "./CInput/CInput";
import PassengerDropdown from "../../SearchForm/PassengerDropdown/PassengerDropdown";
import SearchButotn from "../../SearchForm/SearchButton/SearchButton";
import LocationsSmallScreen from "../../SearchForm/Locations/LocationsSmallScreen/LocationsSmallScreen";

const xSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 16 16'
    class='_25S80 t-oKs'
  >
    <path
      fill-rule='evenodd'
      d='M8 7.3l3.6-3.7a.5.5 0 0 1 .8.8L8.7 8l3.7 3.6a.5.5 0 1 1-.8.8L8 8.7l-3.6 3.7a.5.5 0 1 1-.8-.8L7.3 8 3.6 4.4a.5.5 0 0 1 .8-.8L8 7.3z'
    ></path>
  </svg>
);

export default function SForm({ renderSearchFormComponent }) {
  let k = -1;

  useEffect(() => {
    document.querySelector("body").addEventListener("click", (evt) => {
      console.log(evt.target);
      if (
        evt.target.classList.contains(stylesHomePage.homePageC) ||
        evt.target.id === "sFormContainer" ||
        evt.target.classList.contains(stylesHeader.headerC)
      ) {
        for (let i = 0; i < 4; i++) {
          const lFrom = document.querySelector(`#locationsFromId${i}`);
          const lTo = document.querySelector(`#locationsToId${i}`);
          const dropD = document.querySelectorAll(`#dropdownCid`);
          dropD.forEach((el) => (el.style.display = "none"));
          const passengerSvgId = document.querySelector(`#passengerSvgId${i}`);
          const calendar = document.querySelector(`#wrapperId${i}`);
          const departSvg = document.querySelector(`#departingSvgId${i}`);

          if (lFrom) lFrom.style.display = "none";
          if (lTo) lTo.style.display = "none";
          if (passengerSvgId) passengerSvgId.style.transform = "rotate(0deg)";
          if (calendar) calendar.style.display = "none";
          if (departSvg) departSvg.style.transform = "rotate(0deg)";
        }
      }
    });
    localStorage.setItem("nrFlights", 2);
  }, []);

  const newJsx = (nr) => {
    return (
      <div id={`container${nr}`} key={nr} className={styles.container}>
        <FInput nr={nr} />
        <TInput nr={nr} />
        <CInput nr={nr} />
        {nr !== 1 ? (
          <div
            id='svgContainer'
            onClick={(evt) => {
              console.log("removing card nr ", nr);
              removeFlight(evt, nr);
            }}
            className={styles.removeFlightC}
          >
            {xSvg}
          </div>
        ) : null}
      </div>
    );
  };
  const [renderedSForm, setRenderedSForm] = useState(true);
  const [nrOfFlights, setNrOfFlights] = useState(2);
  const [flightArr, setFlightArr] = useState([newJsx(1), newJsx(2)]);
  const [addFlightClicked, setAddFlightClicked] = useState(false);
  const [positionClass, setPositionClass] = useState("");

  const addFlight = () => {
    setAddFlightClicked(true);

    localStorage.setItem(
      "nrFlights",
      parseInt(localStorage.getItem("nrFlights")) + 1
    );

    if (window.innerWidth < 780) {
      document.querySelector("#homePageId").style.height =
        750 + 58 * parseInt(localStorage.getItem("nrFlights")) + "px";
    } else {
      document.querySelector("#homePageId").style.height =
        600 + 58 * parseInt(localStorage.getItem("nrFlights")) + "px";
    }

    if (parseInt(localStorage.getItem("nrFlights")) === 4) {
      // Remove Add Button
      document.querySelector("#wrapperId").childNodes[0].style.display = "none";
      setAddFlightClicked(true);

      setNrOfFlights(4);
      setPositionClass("positionLeft");
    } else {
      setAddFlightClicked(false);
      setPositionClass("notvalidname");
    }
    if (nrOfFlights < 4) {
      setNrOfFlights(nrOfFlights + 1);
      setFlightArr([
        ...flightArr,
        newJsx(parseInt(localStorage.getItem("nrFlights"))),
      ]);
    }
  };
  const removeFlight = (evt, idx) => {
    setPositionClass("notvalidname");

    localStorage.setItem(
      "nrFlights",
      parseInt(localStorage.getItem("nrFlights")) - 1
    );
    document.querySelector("#wrapperId").childNodes[0].style.display = "block";
    evt.preventDefault();

    if (parseInt(localStorage.getItem("nrFlights")) === 1) {
      switchToOneWayRoundTripComponent();
      return;
    }
    if (parseInt(localStorage.getItem("nrFlights")) === 3) {
      document.querySelector("#wrapperId").childNodes[0].style.display =
        "block";
    }
    document.querySelector(`#container${idx}`).remove();
    document.querySelector("#homePageId").style.height =
      parseInt(document.querySelector("#homePageId").style.height) - 58 + "px";
    // 716 - 58 * (nrOfFlights - 3) + "px";
    setNrOfFlights(nrOfFlights - 1);
  };

  const switchToOneWayRoundTripComponent = () => {
    setRenderedSForm(false);
    renderSearchFormComponent();
  };

  if (renderedSForm) {
    return (
      <div id='sFormContainer'>
        {flightArr}

        <div id='wrapperId' className={styles.wrapper}>
          <div className={styles.addFlightBtnC}>
            <button
              className={addFlightClicked ? `${styles.leftPosClass}` : ""}
              id='addBtn'
              onClick={addFlight}
            >
              <span>+</span>
              <span>Add flight</span>
            </button>
          </div>
          <PassengerDropdown
            positionClass={positionClass}
            passengerCMultiCityClass='passengerCMultiCity'
            nr={1}
          />
          <SearchButotn
            positionClass={positionClass}
            btnMultiCityClass='btnMultiCity'
          />
        </div>

        <div
          onClick={switchToOneWayRoundTripComponent}
          className={styles.oneWayRoundTripLinkClass}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            class='_8gyjT _3LjkP'
          >
            <g fill='none' fill-rule='evenodd' stroke='#FFF'>
              <path d='M2.8 5A6 6 0 0 0 8 14a6 6 0 0 0 3-.8m2.2-2.3A6 6 0 0 0 5 2.8'></path>
              <rect width='3' height='3' x='2.5' y='2.5' rx='1.5'></rect>
              <rect width='3' height='3' x='10.5' y='10.5' rx='1.5'></rect>
            </g>
          </svg>
          <span>One way / Round trip</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
