import React, { useState, useEffect } from "react";
import styles from "./PassengerDropdown.module.scss";
import Dropdown from "./Dropdown/Dropdown";

export default function PassengerDropdown({
  renderCalendar,
  renderedDropdown,
  unmountDropdown,
  renderDropdown,
  passNrPassengers,
  searchFlights,
}) {
  const [nrAdults, setNrAdults] = useState(1);
  const [dropdownDisplay, setDropdownDisplay] = useState("none");
  const [dropdownRendered, setDropdwonRendered] = useState(renderedDropdown);

  useEffect(() => {
    setDropdwonRendered(renderedDropdown);
  }, [renderedDropdown]);

  const handleClick = () => {
    const d = document.querySelector(`#dropdownCid`);
    if (!d) {
      renderDropdown();
    } else {
      d.style.display = "block";
      console.log("is it called ?");
    }

    return;
  };
  const hideDropdown = () => {
    // setDropdwonRendered(false);
    unmountDropdown();
  };

  const [defaultNrAdults, setDefaultNrAdults] = useState(1);
  const [defaultNrChilds, setDefaultNrChilds] = useState(0);
  const [defaultNrBabies, setDefaultNrBabies] = useState(0);
  const [defaultNrPassengers, setDefaultNrPassengers] = useState(1);

  const receiveCounterValues = (nrAdults, nrChilds, nrBabies, nrPassengers) => {
    setDefaultNrAdults(nrAdults);
    setDefaultNrChilds(nrChilds);
    setDefaultNrBabies(nrBabies);
    setDefaultNrPassengers(nrPassengers);
    passNrPassengers(nrPassengers);
  };

  return (
    <div onClick={handleClick} className={`${styles.passengerC} ${styles.pC}`}>
      <div>
        <span className={styles.nrP}>{defaultNrPassengers}</span>

        <span>Пассажир</span>
      </div>
      {dropdownRendered ? (
        <Dropdown
          passCounterValues={receiveCounterValues}
          defaultNrAdults={defaultNrAdults}
          defaultNrChilds={defaultNrChilds}
          defaultNrBabies={defaultNrBabies}
          defaultNrPassengers={defaultNrPassengers}
          hideDropdown={hideDropdown}
          renderCalendar={renderCalendar}
          searchFlights={searchFlights}
        />
      ) : null}
    </div>
  );
}
