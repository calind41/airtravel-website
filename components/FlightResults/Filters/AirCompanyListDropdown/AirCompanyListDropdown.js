import React, { useState, useEffect, useContext } from "react";
import { FiltersDispatchContext, FiltersStateContext } from "../Filters";
import {
  FiltersMultiwayDispatchContext,
  FiltersMultiwayStateContext,
} from "../../multiway/Filters/Filters";

import styles from "./AirCompanyListDropdown.module.scss";
import { domAll, dom } from "../../../../helpers/reuse";
const airCompanyData = [
  {
    logo: "fly-one.png",
    name: "Fly One",
    ticketPrice: Math.floor(Math.random() * 300) + "$",
  },
  {
    logo: "blue-air.png",
    name: "Blue Air",
    ticketPrice: Math.floor(Math.random() * 300) + "$",
  },
  {
    logo: "air-moldova.png",
    name: "Air Moldova",
    ticketPrice: Math.floor(Math.random() * 300) + "$",
  },
  {
    logo: "wizz-air.png",
    name: "Wizz Air",
    ticketPrice: Math.floor(Math.random() * 300) + "$",
  },
  {
    logo: "turkish-airlines.png",
    name: "Turkish",
    ticketPrice: Math.floor(Math.random() * 300) + "$",
  },
];

export default function AirCompanyListDropdown({ zIndex, multiway }) {
  const { dispatch } = useContext(
    multiway ? FiltersMultiwayDispatchContext : FiltersDispatchContext
  );
  const { state } = useContext(
    multiway ? FiltersMultiwayStateContext : FiltersStateContext
  );
  const {
    selectedAircompanyCount,
    animateClass,
    selectedAircompaniesIndexArray,
  } = state;
  const indexArray = selectedAircompaniesIndexArray;
  const nrOptions = 95;

  const [count, setCount] = useState(selectedAircompanyCount);

  useEffect(() => {
    const handleScroll = () => {
      let condition;
      if (multiway) {
        condition = window.scrollY >= 388;
      } else {
        condition = window.scrollY >= 433;
      }
      if (condition) {
        dom(`.${styles.container}`).style.position = "fixed";
        dom(`.${styles.container}`).style.top = "69px";
      } else {
        dom(`.${styles.container}`).style.position = "relative";
        dom(`.${styles.container}`).style.top = "0px";
      }
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const selectAllAircompaniesHandler = (evt) => {
    evt.target.classList.add(styles.selected);
    const aircompanycards = domAll(`.${styles.airC}`);
    aircompanycards.forEach((item) => item.classList.remove(styles.selected));

    setCount(0);
    dispatch({ type: "selectAllAircompanies" });
  };

  const increaseCount = () => {
    setCount((prevValue) => prevValue + 1);
    dispatch({
      type: "field",
      fieldName: "selectedAircompanyCount",
      payload: count + 1,
    });
  };
  const decreaseCount = () => {
    setCount((prevValue) => prevValue - 1);
    dispatch({
      type: "field",
      fieldName: "selectedAircompanyCount",
      payload: count - 1,
    });
  };

  return (
    <div style={zIndex ? { zIndex: zIndex } : {}} className={styles.container}>
      <div className={`${styles.outerWrapper} ${styles[animateClass]}`}>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={`${styles.allAlliances} ${styles.selected}`}>
              Все альянсы
            </div>
            <div className={styles.showOptions}>
              Показать {nrOptions} вариант
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.title}>АВИАКОМПАНИИ</div>
            <div className={styles.airCompanyList}>
              <div
                onClick={selectAllAircompaniesHandler}
                className={
                  indexArray.includes(0) && indexArray.length > 1
                    ? styles.allCompanies
                    : `${styles.allCompanies} ${styles.selected}`
                }
              >
                Все авиакомпании
              </div>
              {airCompanyData.map((item, index) => {
                return (
                  <AirCompanyCard
                    dispatch={dispatch}
                    indexArray={indexArray}
                    index={index + 1}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    key={index}
                    logo={item.logo}
                    name={item.name}
                    ticketPrice={item.ticketPrice}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AirCompanyCard({
  dispatch,
  logo,
  name,
  ticketPrice,
  decreaseCount,
  increaseCount,
  index,
  indexArray,
}) {
  const selectAirCompanyHandler = (evt) => {
    dom(`.${styles.allCompanies}`).classList.remove(styles.selected);
    const hasClassSelected = evt.target.classList.contains(styles.selected);
    if (hasClassSelected) {
      dispatch({ type: "subtractIndex", payload: index });

      decreaseCount();
    } else {
      dispatch({ type: "addIndex", payload: index });
      increaseCount();
    }
    evt.target.classList.toggle(styles.selected);
  };
  const selectedClassName =
    indexArray && indexArray.includes(index) ? styles.selected : "";
  return (
    <div
      onClick={(evt) => selectAirCompanyHandler(evt)}
      className={`${styles.airC} ${selectedClassName}`}
    >
      <div className={styles.logo}>
        <img src={`/images/aircompanylogos/${logo}`} alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.ticketPrice}>{ticketPrice}</div>
    </div>
  );
}
