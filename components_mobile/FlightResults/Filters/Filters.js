import React, { useReducer, createContext } from "react";
import styles from "./Filters.module.scss";
import Loading from "./Loading/Loading";
import SortByModal from "./SortByModal/SortByModal";
import FiltersModal from "./FiltersModal/FiltersModal";
import { FiltersReducer, initialState } from "./filtersReducer";

export const FiltersStateContext = createContext();
export const FiltersDispatchContext = createContext();

export default function Filters({
  positionRelativeClass,
  mainWrapperAnimationClass,
}) {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);
  const {
    renderLoader,
    renderSortByModal,
    initialSortByCriteria,
    initialAscendingSort,
    renderFiltersModal,
    filterSettingsCount,
  } = state;

  const sortByCriterias = [
    "По цене",
    "По вылету",
    "По прилету",
    "Время в пути",
  ];

  const unmountSortByModal = (criteria, ascendingSort) => {
    dispatch({
      type: "unmountSortByModal",
      payload: {
        initialSortByCriteria: criteria,
        initialAscendingSort: ascendingSort,
      },
    });
  };

  const unmountFiltersModal = (state) => {
    const { settingsAppliedCount } = state;
    dispatch({
      type: "unmountFiltersModal",
      payload: {
        filterSettingsCount: settingsAppliedCount,
      },
    });
  };

  const unmountLoader = () => {
    dispatch({
      type: "field",
      fieldName: "renderLoader",
      payload: false,
    });
    document
      .querySelector("#mainWrapperId")
      .classList.remove(mainWrapperAnimationClass);
  };
  if (renderLoader) {
    return <Loading unmountLoader={unmountLoader} />;
  }

  return (
    <FiltersDispatchContext.Provider value={{ dispatch }}>
      <FiltersStateContext.Provider value={{ state }}>
        <>
          <div
            className={
              positionRelativeClass !== ""
                ? `${styles.container} ${styles[positionRelativeClass]}`
                : `${styles.container}`
            }
          >
            <div
              onClick={() =>
                dispatch({
                  type: "field",
                  fieldName: "renderSortByModal",
                  payload: true,
                })
              }
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
              onClick={() =>
                dispatch({
                  type: "field",
                  fieldName: "renderFiltersModal",
                  payload: true,
                })
              }
              className={styles.filtersContainer}
            >
              <div className={styles.name}>Фильтры</div>
              {filterSettingsCount !== 0 ? (
                <div className={styles.settingsCount}>
                  {filterSettingsCount}
                </div>
              ) : (
                <div className={styles.icon}>{filtersIcon}</div>
              )}
            </div>
          </div>
          {renderSortByModal ? (
            <SortByModal unmountModal={unmountSortByModal} />
          ) : null}
          {renderFiltersModal ? (
            <FiltersModal unmountModal={unmountFiltersModal} />
          ) : null}
        </>
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
