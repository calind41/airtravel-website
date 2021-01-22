import React, { useEffect, useReducer, createContext } from "react";
import styles from "./Filters.module.scss";
import AirCompanyListDropdown from "../../Filters/AirCompanyListDropdown/AirCompanyListDropdown";
import FilterSettings from "./FilterSettings/FilterSettings";
import Loading from "../../Filters/Loading/Loading";
import stylesFRmultyWay from "../Test.module.scss";
import { dom } from "../../../../helpers/reuse";
import { FiltersReducer } from "../../filtersReducer";

const initialState = {
  renderAirCompanyList: false,
  animateClass: "animateSlideDown",
  selectedAircompanyCount: 0,
  selectedAircompaniesIndexArray: [0],
  renderFilterSettings: false,
  numOfFilters: 0,
  renderLoader: true,
};

export const FiltersMultiwayStateContext = createContext();
export const FiltersMultiwayDispatchContext = createContext();

export default function Filters({ mainWrapperAnimationClass }) {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);

  const {
    renderAirCompanyList,
    renderFilterSettings,
    animateClass,
    selectedAircompanyCount,
    selectedAircompaniesIndexArray,
    numOfFilters,
    renderLoader,
  } = state;

  useEffect(() => {
    const handleScroll = () => {
      const container = dom(`.${styles.container}`);
      const rightSideTickets = dom(`#mainWrapperId2`);

      if (window.scrollY >= 388) {
        // fixed
        if (container) {
          container.classList.add(styles.positionFixed);
          container.style.zIndex = "1000000001";
          if (
            rightSideTickets.classList.contains(
              stylesFRmultyWay.mainWrapperInactive2
            )
          )
            rightSideTickets.classList.remove(
              stylesFRmultyWay.mainWrapper2PositionRelative
            );
        }
      } else {
        // default
        if (container) {
          container.style.zIndex = "1";

          container.classList.remove(styles.positionFixed);
          rightSideTickets.classList.add(
            stylesFRmultyWay.mainWrapper2PositionRelative
          );
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onAirCompaniesClickHandler = () => {
    const arrow = dom(`.${styles.arrowIconAircompany}`);
    const arrowFilterSettings = dom(`.${styles.arrowIconFilters}`);

    if (!renderAirCompanyList) {
      const doesNotHaveClassPositionFixed = !dom(
        `.${styles.container}`
      ).classList.contains(styles.positionFixed);
      if (doesNotHaveClassPositionFixed) {
        window.scrollTo({
          top: 388,
          left: 0,
          behavior: "smooth",
        });
      }
      setTimeout(() => {
        dispatch({ type: "openAircompanyDropdown" });
        arrow.classList.add(styles.rotate180);
      }, 300);
      dom("#flightSearchResult").classList.add(
        styles.flightSearchResultsContainerOverflowHidden
      );

      if (renderFilterSettings) {
        arrowFilterSettings.classList.remove(styles.rotate180);
        dispatch({
          type: "field",
          fieldName: "animateClass",
          payload: "animateSlideUp",
        });

        setTimeout(() => {
          dispatch({
            type: "field",
            fieldName: "renderFilterSettings",
            payload: false,
          });
        }, 300);
      }
    } else {
      arrow.classList.remove(styles.rotate180);
      dispatch({
        type: "field",
        fieldName: "animateClass",
        payload: "animateSlideUp",
      });
      setTimeout(() => {
        dispatch({
          type: "field",
          fieldName: "renderAirCompanyList",
          payload: false,
        });
        dom("#flightSearchResult").classList.remove(
          styles.flightSearchResultsContainerOverflowHidden
        );
      }, 300);
    }
  };

  const onFilterSettingsClickHandler = () => {
    const arrow = dom(`.${styles.arrowIconFilters}`);
    const arrowAircompany = dom(`.${styles.arrowIconAircompany}`);

    if (!renderFilterSettings) {
      const doesNotHaveClassPositionFixed = !dom(
        `.${styles.container}`
      ).classList.contains(styles.positionFixed);
      if (doesNotHaveClassPositionFixed) {
        window.scrollTo({
          top: 733,
          left: 0,
          behavior: "smooth",
        });
      }
      setTimeout(() => {
        dispatch({ type: "openFilterSettingsDropdown" });
        arrow.classList.add(styles.rotate180);
      }, 300);
      dom("#flightSearchResult").classList.add(
        styles.flightSearchResultsContainerOverflowHidden
      );

      // close aircompany modal if open
      if (renderAirCompanyList) {
        arrowAircompany.classList.remove(styles.rotate180);
        dispatch({
          type: "field",
          fieldName: "animateClass",
          payload: "animateSlideUp",
        });
        setTimeout(() => {
          dispatch({
            type: "field",
            fieldName: "renderAirCompanyList",
            payload: false,
          });
        }, 300);
      }
    } else {
      arrow.classList.remove(styles.rotate180);
      dispatch({
        type: "field",
        fieldName: "animateClass",
        payload: "animateSlideUp",
      });
      setTimeout(() => {
        dispatch({
          type: "field",
          fieldName: "renderFilterSettings",
          payload: false,
        });
        dom("#flightSearchResult").classList.remove(
          styles.flightSearchResultsContainerOverflowHidden
        );
      }, 300);
    }
  };

  const unmountLoader = () => {
    dispatch({
      type: "field",
      fieldName: "renderLoader",
      payload: false,
    });
    dom("#mainWrapperId").classList.remove(mainWrapperAnimationClass);
  };
  if (renderLoader) {
    return <Loading unmountLoader={unmountLoader} />;
  }

  return (
    <FiltersMultiwayDispatchContext.Provider value={{ dispatch }}>
      <FiltersMultiwayStateContext.Provider value={{ state }}>
        <div className={`${styles.container}`}>
          <div className={styles.filtersContainer}>
            <button
              id='leftMostFilterId'
              className={`${styles.withBaggage} ${styles.disabledBtn}`}
            >
              <span className={styles.wrapper}>
                Все с багажом от <span>230$</span>
              </span>
            </button>
            <button
              className={`${styles.noDirectFlights} ${styles.disabledBtn}`}
            >
              <span className={styles.wrapper}>
                <span>Нет прямых</span>
              </span>
            </button>
            <button
              onClick={onAirCompaniesClickHandler}
              className={styles.airCompanies}
            >
              <span className={styles.wrapper}>
                <span>Авиакомпании</span>
                <span className={styles.arrowIconAircompany}>{arrowIcon}</span>
                <span
                  style={
                    selectedAircompanyCount === 0
                      ? { visibility: "hidden" }
                      : {}
                  }
                  className={styles.selectedAircompanyCount}
                >
                  {selectedAircompanyCount}
                </span>
              </span>
            </button>
            <button
              onClick={onFilterSettingsClickHandler}
              className={styles.filters}
            >
              <span className={styles.wrapper}>
                <span className={styles.filtersIcon}>{filtersIcon}</span>
                <span>Фильтры</span>
                <span className={styles.arrowIconFilters}>{arrowIcon}</span>
                <span
                  style={numOfFilters === 0 ? { visibility: "hidden" } : {}}
                  className={styles.filtersCount}
                >
                  {numOfFilters}
                </span>
              </span>
            </button>
          </div>
        </div>
        {renderAirCompanyList ? (
          <AirCompanyListDropdown zIndex='10000000000000' multiway={true} />
        ) : null}
        {renderFilterSettings ? (
          <FilterSettings
            multiway={true}
            from='Кишинёв'
            to='Лондон'
            date='25 декабря, пятница'
          />
        ) : null}
      </FiltersMultiwayStateContext.Provider>
    </FiltersMultiwayDispatchContext.Provider>
  );
}

export const arrowIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M7.707 10.293a1 1 0 00-1.414 1.414l4.294 4.294a1.995 1.995 0 002.826 0l4.294-4.294a1 1 0 00-1.414-1.414L12 14.586l-4.293-4.293z'
      fill='currentColor'
    ></path>
  </svg>
);
const filtersIcon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='9' y='8' width='10' height='2' rx='1' fill='#333'></rect>
    <rect x='4' y='14' width='10' height='2' rx='1' fill='#333'></rect>
    <path
      d='M9 9a2 2 0 11-4 0 2 2 0 014 0zM18 15a2 2 0 11-4 0 2 2 0 014 0z'
      stroke='#333'
      strokeWidth='2'
    ></path>
  </svg>
);
