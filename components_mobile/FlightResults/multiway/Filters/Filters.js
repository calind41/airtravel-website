import React, { useState, useEffect } from "react";
import styles from "./Filters.module.scss";
// import AirCompanyListDropdown from "./AirCompanyListDropdown/AirCompanyListDropdown";
// import FilterSettings from "./FilterSettings/FilterSettings";
import Loading from "./Loading/Loading";
import SortByModal from "./SortByModal/SortByModal";
import FiltersModal from "./FiltersModal/FiltersModal";

export default function Filters({
  positionRelativeClass,
  mainWrapperAnimationClass,
}) {
  const [renderLoader, setRenderLoader] = useState(true);
  const [filtersModalInitialState, setFiltersModalInitialState] = useState({
    withBaggageSelected: false,
    directFlightSelected: false,
    renderBaggageSettingsModal: false,
    renderTransferSettingsModal: false,
    renderDepartureArrivalSettingsModal: false,
    renderAircompanySettingsModal: false,
    renderAirportSettingsModal: false,
    renderSellerSettingsModal: false,
    baggageSettingCount: 0,
    baggageSettingsInitialState: {
      checkedWithBaggage: false,
      checkedWithoutBaggage: false,
    },

    transferSettingsCount: 0,
    nrTransfersInitialState: {
      noTransfer: false,
      oneTransfer: false,
      twoPlusTransfer: false,
    },
    transferCitiesInitialState: transfCities,

    transferSettingsCount2: 0,
    nrTransfersInitialState2: {
      noTransfer2: false,
      oneTransfer2: false,
      twoPlusTransfer2: false,
    },
    transferCitiesInitialState2: transfCities,

    depArrSettingsCount: 0,
    deppArrSettingsInitialState: {
      depSliderValues: [0, 720],
      depStartTime: "00:00",
      depEndTime: "24:00",
      arrSliderValues: [0, 1440],
      arrStartTime: "00:00, 13 мар",
      arrEndTime: "24:00, 14 мар",
      arrivalStartDate: "13 мар",
      arrivalEndDate: "14 мар",
      flightDurationSliderValue: [2160],
      flightDuration: "72ч 00м",
    },
    depArrSettingsCount2: 0,
    deppArrSettingsInitialState2: {
      depSliderValues2: [0, 720],
      depStartTime2: "00:00",
      depEndTime2: "24:00",
      arrSliderValues2: [0, 1440],
      arrStartTime2: "00:00, 13 мар",
      arrEndTime2: "24:00, 14 мар",
      arrivalStartDate2: "13 мар",
      arrivalEndDate2: "14 мар",
      flightDurationSliderValue2: [2160],
      flightDuration2: "72ч 00м",
    },

    airCompSettingsCount: 0,
    airCompSettingsInitialState: {
      oneWorldAlliance: false,
      skyTeamAlliance: false,
      starAlliance: false,
      checkedChooseAll: false,
      aircompanyList: aircList,
    },

    airportSettingsCount: 0,
    airportSettingsInitialState: {
      arrivalAirports: arrAirports,
      depAirport: {
        name: "Кишинёв",
        code: "KIV",
      },
    },
    airportSettingsCount2: 0,
    airportSettingsInitialState2: {
      arrivalAirports2: arrAirports,
      depAirport2: {
        name: "Кишинёв",
        code: "KIV",
      },
    },

    sellerSettingsCount: 0,
    sellerSettingsInitialState: {
      sellers: sellerList,
    },
  });

  const [renderSortByModal, setRenderSortByModal] = useState(false);
  const [initialSortByCriteria, setInitialSortByCriteria] = useState(1);
  const [initialAscendingSort, setInitialAscendingSort] = useState(true);
  const sortByCriterias = [
    "По цене",
    "По вылету",
    "По прилету",
    "Время в пути",
  ];

  const unmountSortByModal = (criteria, ascendingSort) => {
    setRenderSortByModal(false);
    setInitialSortByCriteria(criteria);
    setInitialAscendingSort(ascendingSort);
  };

  const [renderFiltersModal, setRenderFiltersModal] = useState(false);
  const [filterSettingsCount, setFilterSettingsCount] = useState(0);

  const unmountFiltersModal = (state) => {
    setRenderFiltersModal(false);
    setFiltersModalInitialState(state);
    const { settingsAppliedCount } = state;
    setFilterSettingsCount(settingsAppliedCount);
  };

  const unmountLoader = () => {
    setRenderLoader(false);
    document
      .querySelector("#mainWrapperId")
      .classList.remove(mainWrapperAnimationClass);
  };
  if (renderLoader) {
    return <Loading unmountLoader={unmountLoader} />;
  }

  return (
    <>
      <div
        className={
          positionRelativeClass !== ""
            ? `${styles.container} ${styles[positionRelativeClass]}`
            : `${styles.container}`
        }
      >
        <div
          onClick={() => setRenderSortByModal(true)}
          className={styles.sortByContainer}
        >
          <div className={styles.name}>
            {sortByCriterias[initialSortByCriteria - 1]}
          </div>
          <div
            style={!initialAscendingSort ? { transform: "scaleY(-1)" } : {}}
            className={styles.icon}
          >
            {sortIcon}
          </div>
        </div>
        <div
          onClick={() => setRenderFiltersModal(true)}
          className={styles.filtersContainer}
        >
          <div className={styles.name}>Фильтры</div>
          {filterSettingsCount !== 0 ? (
            <div className={styles.settingsCount}>{filterSettingsCount}</div>
          ) : (
            <div className={styles.icon}>{filtersIcon}</div>
          )}
        </div>
      </div>
      {renderSortByModal ? (
        <SortByModal
          unmountModal={unmountSortByModal}
          initialCriteria={initialSortByCriteria}
          setInitialSortByCriteria={setInitialSortByCriteria}
          initialAscendingSort={initialAscendingSort}
          setInitialAscendingSort={setInitialSortByCriteria}
        />
      ) : null}
      {renderFiltersModal ? (
        <FiltersModal
          initialState={filtersModalInitialState}
          unmountModal={unmountFiltersModal}
        />
      ) : null}
    </>
  );
}

export const transfCities = [
  {
    name: "Бухарест",
    code: "BUH",
    checked: false,
  },
  {
    name: "Франкфурт-на-Майне",
    code: "FRA",
    checked: false,
  },
  {
    name: "Санкт-Петербург",
    code: "LED",
    checked: false,
  },
  {
    name: "София",
    code: "SOF",
    checked: false,
  },
  {
    name: "Москва",
    code: "MOW",
    checked: false,
  },
  {
    name: "Аликанте",
    code: "ALC",
    checked: false,
  },
  {
    name: "Тель-Авив",
    code: "TLV",
    checked: false,
  },
  {
    name: "Женева",
    code: "GVA",
    checked: false,
  },
  {
    name: "Милан",
    code: "MIL",
    checked: false,
  },
  {
    name: "Вена",
    code: "VIE",
    checked: false,
  },
];

export const aircList = [
  {
    name: "Wizz Air",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "British Airways",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Ryanair",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "EasyJet",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "TAROM S.A.",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Blue Air",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Air Moldova",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Air Leasure",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Fly One",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "UTair",
    startPrice: "от 320$",
    checked: false,
  },
];

export const arrAirports = [
  {
    name: "Стенстед",
    code: "STN",
    checked: false,
  },
  {
    name: "Гатвик",
    code: "LGW",
    checked: false,
  },
  {
    name: "Хитроу",
    code: "LHR",
    checked: false,
  },
  {
    name: "Лондон-Сити",
    code: "LCY",
    checked: false,
  },
  {
    name: "Лутон",
    code: "LTN",
    checked: false,
  },
  {
    name: "Соутенд Муниципал",
    code: "SEN",
    checked: false,
  },
];

export const sellerList = [
  {
    name: "Тинькофф",
    description: "Кэшбэк и бонусы, рассрочка, сервис",
    checked: false,
  },
  {
    name: "Партнеры",
    description: "Кэшбэк и бонусы начисляются",
    checked: false,
  },
];

export const arrowIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M7.707 10.293a1 1 0 00-1.414 1.414l4.294 4.294a1.995 1.995 0 002.826 0l4.294-4.294a1 1 0 00-1.414-1.414L12 14.586l-4.293-4.293z'
      fill='currentColor'
    ></path>
  </svg>
);
export const sortIcon = (
  <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 11a1 1 0 100 2h10a1 1 0 100-2H3zm0-4a1 1 0 100 2h6.668a1 1 0 100-2H3zM2 4a1 1 0 011-1h3.333a1 1 0 110 2H2.999a1 1 0 01-1-1z'
      fill='currentColor'
    ></path>
  </svg>
);
const filtersIcon = (
  <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5 5a1 1 0 11-2 0 1 1 0 012 0zm1.834.986A3.001 3.001 0 011 5a3 3 0 015.834-.986C6.888 4.004 6.944 4 7 4h7a1 1 0 110 2H7c-.057 0-.112-.005-.166-.014zM13 11a1 1 0 11-2 0 1 1 0 012 0zm-1 3a3 3 0 10-2.834-3.986A1.008 1.008 0 009 10H2a1 1 0 100 2h7c.057 0 .112-.005.166-.014A3.001 3.001 0 0012 14z'
      fill='currentColor'
    ></path>
  </svg>
);
