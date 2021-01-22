import React, { useState, useEffect, useReducer, createContext } from "react";
import styles from "./Filters.module.scss";
import AirCompanyListDropdown from "./AirCompanyListDropdown/AirCompanyListDropdown";
import FilterSettings from "./FilterSettings/FilterSettings";
import Loading from "./Loading/Loading";
import { dom } from "../../../helpers/reuse";
import { FiltersReducer } from "../filtersReducer";

const initialState = {
  renderAirCompanyList: false,
  animateClass: "animateSlideDown",
  selectedAircompanyCount: 0,
  selectedAircompaniesIndexArray: [0],
  renderFilterSettings: false,
  numOfFilters: 0,
  renderLoader: true,
};

export const FiltersDispatchContext = createContext({
  dispatch: null,
});
export const FiltersStateContext = createContext({ state: initialState });

export default function Filters({
  positionRelativeClass,
  mainWrapperAnimationClass,
}) {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);
  const {
    renderAirCompanyList,
    selectedAircompanyCount,
    renderFilterSettings,
    numOfFilters,
    renderLoader,
  } = state;

  useEffect(() => {
    const handleScroll = () => {
      const wrapperTop = dom(`.${styles.wrapperTop}`);
      const container = dom(`.${styles.container}`);
      const mainHeader = dom("#mainHeaderId");
      const scrollYgte433 = window.scrollY >= 433;
      if (scrollYgte433) {
        if (mainHeader) mainHeader.style.marginTop = "50px";
        if (container) container.style.zIndex = "1000000000";

        // fixed
        if (container) {
          container.classList.add(styles.positionFixed);
        }
      } else {
        if (mainHeader) mainHeader.style.marginTop = "0px";
        if (container) container.style.zIndex = "100";

        // default
        if (container) {
          container.classList.remove(styles.positionFixed);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isOpenSettings = renderAirCompanyList || renderFilterSettings;
    if (isOpenSettings) {
      localStorage.setItem("isOpenSettings", "true");
    } else {
      localStorage.setItem("isOpenSettings", "false");
    }
  }, [renderAirCompanyList, renderFilterSettings]);

  const onAirCompaniesClickHandler = () => {
    const arrow = dom(`.${styles.arrowIconAircompany}`);
    const arrowFilterSettings = dom(`.${styles.arrowIconFilters}`);

    if (!renderAirCompanyList) {
      const containerWithPRelative = !dom(
        `.${styles.container}`
      ).classList.contains(styles.positionFixed);

      if (containerWithPRelative) {
        window.scrollTo({
          top: 438,
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
      const containerWithPRelative = !dom(
        `.${styles.container}`
      ).classList.contains(styles.positionFixed);

      if (containerWithPRelative) {
        window.scrollTo({
          top: 438,
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
    dispatch({ type: "unmountLoader" });
    dom("#mainWrapperId").classList.remove(mainWrapperAnimationClass);
  };
  if (renderLoader) {
    return <Loading unmountLoader={unmountLoader} />;
  }

  return (
    <FiltersDispatchContext.Provider value={{ dispatch }}>
      <FiltersStateContext.Provider value={{ state }}>
        <div className={`${styles.container}`}>
          <div className={styles.filtersContainer}>
            <button className={`${styles.withBaggage} ${styles.disabledBtn}`}>
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
          <AirCompanyListDropdown multiway={false} />
        ) : null}

        {renderFilterSettings ? (
          <FilterSettings
            from='Кишинёв'
            to='Лондон'
            date='25 декабря, пятница'
          />
        ) : null}
      </FiltersStateContext.Provider>
    </FiltersDispatchContext.Provider>
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
