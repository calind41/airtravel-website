import React, { useState } from "react";
import styles from "./AirCompanyListDropdown.module.scss";

export default function AirCompanyListDropdown({
  animateClass,
  setSelectedAircompanyCount,
  selectedAircompanyCount,
  setSelectedAircompaniesIndexArray,
  indexArray,
}) {
  const [count, setCount] = useState(selectedAircompanyCount);
  const nrOptions = 95;
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

  const selectAllAircompaniesHandler = (evt) => {
    evt.target.classList.add(styles.selected);
    const aircompanycards = document.querySelectorAll(`.${styles.airC}`);
    aircompanycards.forEach((item) => item.classList.remove(styles.selected));

    setCount(0);
    setSelectedAircompanyCount(0);
    setSelectedAircompaniesIndexArray("add", 0);
  };

  const increaseCount = () => {
    setCount((prevValue) => {
      setSelectedAircompanyCount(prevValue + 1);
      return prevValue + 1;
    });
  };
  const decreaseCount = () => {
    setCount((prevValue) => {
      setSelectedAircompanyCount(prevValue - 1);
      return prevValue - 1;
    });
  };

  return (
    <div className={styles.container}>
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
                    indexArray={indexArray}
                    index={index + 1}
                    setSelectedAircompaniesIndexArray={
                      setSelectedAircompaniesIndexArray
                    }
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
  logo,
  name,
  ticketPrice,
  decreaseCount,
  increaseCount,
  index,
  setSelectedAircompaniesIndexArray,
  indexArray,
}) {
  const selectAirCompanyHandler = (evt) => {
    document
      .querySelector(`.${styles.allCompanies}`)
      .classList.remove(styles.selected);
    if (evt.target.classList.contains(styles.selected)) {
      setSelectedAircompaniesIndexArray("subtract", index);
      decreaseCount();
    } else {
      setSelectedAircompaniesIndexArray("add", index);
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
