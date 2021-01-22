import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";
import calendarStyles from "..//CalendarInputSmallScreen/CalendarInputSmallScreen.module.scss";
import { switchLocationsIcon, calendarIcon, planeIcon } from "../icons";
import Departure from "../Departure/Departure";
import Arrival from "../Arrival/Arrival";
import CalendarInputSmallScreen from "../CalendarInputSmallScreen/CalendarInputSmallScreen";
import { months } from "../CalendarInputSmallScreen/MonthComponent/Month";
import PassengersComponent from "../PassengersComponent/PassengersComponent";
import { i18n } from "../../../../i18n";

export default function Form() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`searchFlightFormMobile:${key}`);
  };

  const [departureValue, setDepartureValue] = useState("");
  const [departureAcronym, setDepartureAcronym] = useState("");
  const [renderedDepartureLocations, setRenderedDepartureLocations] = useState(
    false
  );
  const [renderedArrivalLocations, setRenderedArrivalLocations] = useState(
    false
  );
  const [arrivalValue, setArrivalValue] = useState("");
  const [arrivalAcronym, setArrivalAcronym] = useState("");
  const [isRenderedCalendarSmall, setIsRenderedCalendarSmall] = useState(false);
  const [
    isRenderedPassengersComponent,
    setIsRenderedPassengersComponent,
  ] = useState(false);

  useEffect(() => {
    const buttons = document.querySelectorAll(`.${styles.formType} > button`);
    const onTickeTypeButtonClickHandler = () => {
      buttons.forEach((btn) => btn.classList.toggle(styles.selectedButton));
    };

    buttons.forEach((btn) =>
      btn.addEventListener("click", onTickeTypeButtonClickHandler)
    );

    return () => {
      buttons.forEach((btn) =>
        btn.removeEventListener("click", onTickeTypeButtonClickHandler)
      );
    };
  }, []);

  const renderDepartureLocations = () => {
    setRenderedDepartureLocations(true);
  };
  const unmountDepartureLocations = () => {
    setRenderedDepartureLocations(false);
  };

  const receiveDepartureInputValue = (v, acronym) => {
    setDepartureValue(v);
    setDepartureAcronym(acronym);
  };

  const receiveArrivalInputValue = (v, acronym) => {
    setArrivalValue(v);
    setArrivalAcronym(acronym);
  };

  const renderArrivalLocations = () => {
    setRenderedArrivalLocations(true);
  };
  const unmountArrivalLocations = () => {
    setRenderedArrivalLocations(false);
  };

  const [renderedCalendar, setRenderedCalendar] = useState(false);
  const renderCalendar = () => {
    setRenderedCalendar(true);
  };

  const swapLocations = () => {
    const tempValue = departureValue;
    const tempAcronym = departureAcronym;

    setDepartureValue(arrivalValue);
    setDepartureAcronym(arrivalAcronym);

    setArrivalValue(tempValue);
    setArrivalAcronym(tempAcronym);
  };
  // ------------
  const [departingValue, setDepartingValue] = useState(
    `${getLanguageSpecificContent("departingValue")}`
  );

  // useEffect(() => {
  //   setIsRenderedCalendarSmall(renderedCalendar);
  // }, [renderedCalendar]);
  const handleClick = () => {
    let calendarSmall = document.querySelector("#calendarInputSmallScreenId");
    // Already rendered
    if (calendarSmall) {
      calendarSmall.style.display = "block";
    } else {
      // Render it first
      setIsRenderedCalendarSmall(true);
    }
  };

  const receiveDepartingValues = (values, selectedMonths) => {
    if (values === "") {
      setDepartingValue(getLanguageSpecificContent("when"));
      return;
    }
    let txt = "";
    values.map(
      (v, i) => (txt += `${v} ${months[selectedMonths[i] - 1].slice(0, 3)}-`)
    );
    let finalStr = txt.slice(-txt.length, txt.length - 1);

    setDepartingValue(finalStr);
  };

  const [firstValueSelected, setFirstValueSelected] = useState("");
  const [secondValueSelected, setSecondValueSelected] = useState("");
  const [selectedDatesValue, setSelectedDatesValue] = useState(
    getLanguageSpecificContent("departingValue")
  );

  const getMonthAbbreviation = (monthNr) => {
    return months[monthNr - 1].substr(0, 3).toLowerCase();
  };

  const receiveFirstValueSelected = (data) => {
    const day = data.day;
    const month = getMonthAbbreviation(data.month);
    setSelectedDatesValue(`${day} ${month}`);
    setFirstValueSelected(`${day} ${month}`);
  };
  const receiveSecondValueSelected = (data, firstItem) => {
    if (data === "") {
      setSecondValueSelected("");
      return;
    }
    let temp;
    if (firstItem) {
      const d = firstItem.day;
      const m = getMonthAbbreviation(firstItem.month);
      temp = `${d} ${m}`;
    } else {
      temp = selectedDatesValue;
    }
    const day = data.day;
    const month = getMonthAbbreviation(data.month);
    setSelectedDatesValue(temp + " - " + `${day} ${month}`);

    if (temp) {
      setFirstValueSelected(temp);
      setSecondValueSelected(`${day} ${month}`);
    } else {
      setSecondValueSelected(`${day} ${month}`);
    }
    // setFromValue("second");
  };

  // -----------
  const [fromValue, setFromValue] = useState("");

  const openFirstCalendar = () => {
    setIsRenderedCalendarSmall(true);

    if (isRenderedCalendarSmall) {
      document.querySelector("#calendarInputSmallScreenId").style.display =
        "block";
      document
        .querySelector("#calendarInputSmallScreenId")
        .classList.remove(calendarStyles.slideLeft);
    }
    setFromValue("first");
  };
  const openSecondCalendar = () => {
    setIsRenderedCalendarSmall(true);
    if (isRenderedCalendarSmall) {
      document.querySelector("#calendarInputSmallScreenId").style.display =
        "block";
      document
        .querySelector("#calendarInputSmallScreenId")
        .classList.remove(calendarStyles.slideLeft);
    }
    setFromValue("second");
  };

  const [dateSelected, setDateSelected] = useState(false);
  const receiveDateSelected = () => {
    setDateSelected(true);
  };

  const openPassengersComponent = () => {
    setIsRenderedPassengersComponent(true);
  };

  const [passengers, setPassengers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);
  const [babies, setBabies] = useState(0);
  const [flightType, setFlightType] = useState(
    getLanguageSpecificContent("flightTypeDefault")
  );
  const receivePassengerComponentData = (
    nrPassengers,
    nrAdults,
    nrChilds,
    nrBabies,
    chosenFlightType
  ) => {
    setPassengers(nrPassengers);
    setAdults(nrAdults);
    setChilds(nrChilds);
    setBabies(nrBabies);
    setFlightType(chosenFlightType);
  };
  const unmountPassengersComponent = () => {
    setIsRenderedPassengersComponent(false);
  };
  return (
    <>
      <main className={styles.form}>
        <div className={styles.departure}>
          <Departure
            inputValue={departureValue}
            airportAcronym={departureAcronym}
            renderedDepartureLocations={renderedDepartureLocations}
            passInputValue={receiveDepartureInputValue}
            renderArrivalLocations={renderArrivalLocations}
            unmountArrivalLocations={unmountArrivalLocations}
          />
          <div onClick={swapLocations} className={styles.switchLocIcon}>
            <span className={styles.top}>{switchLocationsIcon}</span>
            <span className={styles.down}>{switchLocationsIcon}</span>
          </div>
        </div>
        <div className={styles.arrival}>
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
        </div>
        <div className={styles.dateContainer}>
          <div onClick={openFirstCalendar} className={styles.departureDate}>
            <span style={firstValueSelected !== "" ? { color: "black" } : {}}>
              {firstValueSelected === ""
                ? `${getLanguageSpecificContent("forward")}`
                : firstValueSelected}
            </span>
            <span>{calendarIcon}</span>
          </div>

          <div onClick={openSecondCalendar} className={styles.returnBackDate}>
            <span style={secondValueSelected !== "" ? { color: "black" } : {}}>
              {secondValueSelected === ""
                ? `${getLanguageSpecificContent("back")}`
                : secondValueSelected}
            </span>
          </div>
          {isRenderedCalendarSmall ? (
            <CalendarInputSmallScreen
              passFirstValueSelected={receiveFirstValueSelected}
              passSecondValueSelected={receiveSecondValueSelected}
              renderArrivalLocations={renderArrivalLocations}
              daysOfWeekSmallSearchFormClass='daysOfWeekSmallSearchForm'
              monthNameClass='centerH4'
              passDateSelected={receiveDateSelected}
              from={fromValue}
            />
          ) : null}
        </div>
        <div
          onClick={openPassengersComponent}
          className={styles.passengerDropdown}
        >
          <div className={styles.details}>
            <div className={styles.nrPassengers}>
              1 {getLanguageSpecificContent("defaultPassenger")}
            </div>
            <div className={styles.ticketType}>
              {getLanguageSpecificContent("defaultFlightType")}
            </div>
          </div>
          <div className={styles.arrow}></div>
        </div>
        {isRenderedPassengersComponent ? (
          <PassengersComponent
            passPassengerComponentData={receivePassengerComponentData}
            unmountPassengersComponent={unmountPassengersComponent}
            defaultNrPassengers={passengers}
            defaultNrAdults={adults}
            defaultNrChilds={childs}
            defaultNrBabies={babies}
            defaultFlightType={flightType}
          />
        ) : null}
      </main>
      <footer className={styles.footer}>
        <button
          onClick={() => console.log("clicked")}
          className={styles.submitSearchBtn}
        >
          <span className={styles.text}>
            {getLanguageSpecificContent("findTickets")}
          </span>
          <span className={styles.icon}>{planeIcon}</span>
        </button>
      </footer>
    </>
  );
}
