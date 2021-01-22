import React, { useState, useEffect, useContext } from "react";
import styles from "./TransferSettings.module.scss";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { goBackIcon } from "../FiltersModal";
import { dom } from "../../../../../helpers/reuse";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";

export default function TransferSettings({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { filtersModalInitialState } = state;
  const { dispatch } = useContext(FiltersDispatchContext);
  const {
    nrTransfersInitialState,
    transferCitiesInitialState,
  } = filtersModalInitialState;

  const [noTransfer, setNoTransfer] = useState(
    nrTransfersInitialState.noTransfer
  );
  const [oneTransfer, setOneTransfer] = useState(
    nrTransfersInitialState.oneTransfer
  );
  const [twoPlusTransfer, setTwoPlusTransfer] = useState(
    nrTransfersInitialState.twoPlusTransfer
  );
  const [transferCities, setTransferCities] = useState(
    transferCitiesInitialState
  );

  useEffect(() => {
    const isAtLeastOneChecked = transferCities.some(
      (item) => item.checked === true
    );
    const tcCheckedCount = transferCities.filter(
      (item) => item.checked === true
    ).length;
    let typeTransferCount = 0;
    if (noTransfer) {
      typeTransferCount = 1;
    }
    if (oneTransfer) {
      typeTransferCount += 1;
    }
    if (twoPlusTransfer) {
      typeTransferCount += 1;
    }
    if (noTransfer || oneTransfer || twoPlusTransfer || isAtLeastOneChecked) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "transferSettingsCount",
        payload: tcCheckedCount + typeTransferCount,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "transferSettingsCount",
        payload: 0,
      });
    }

    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "nrTransfersInitialState",
      payload: {
        noTransfer,
        oneTransfer,
        twoPlusTransfer,
      },
    });
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "transferCitiesInitialState",
      payload: transferCities,
    });
  }, [noTransfer, oneTransfer, twoPlusTransfer, transferCities]);

  const goBack = () => {
    unmountModalHelper();
    setTimeout(() => {
      unmountModal();
    }, [250]);
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal("applyFilters");
  };
  const dropAllSettings = () => {
    setNoTransfer(false);
    setOneTransfer(false);
    setTwoPlusTransfer(false);
    const temp = transferCities.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setTransferCities(temp);

    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "transferSettingsCount",
      payload: 0,
    });
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "transferCitiesInitialState",
      payload: temp,
    });
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "nrTransfersInitialState",
      payload: {
        noTransfer: false,
        oneTransfer: false,
        twoPlusTransfer: false,
      },
    });
  };
  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Пересадки</div>
        <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
          Сбросить
        </div>
      </div>
      <div className={styles.scrollableContainer}>
        <div className={styles.transferCount}>
          <div className={styles.header}>Кишинёв – Лондон</div>
          <CheckboxComponent
            id='noTransf'
            checked={noTransfer}
            setChecked={setNoTransfer}
          >
            <div className={styles.description}>
              <div className={styles.title}>Без пересадок</div>
              <div className={styles.subtitle}>от 320$</div>
            </div>
          </CheckboxComponent>
          <CheckboxComponent
            id='oneTransf'
            checked={oneTransfer}
            setChecked={setOneTransfer}
          >
            <div className={styles.description}>
              <div className={styles.title}>1 пересадка</div>
              <div className={styles.subtitle}>от 410$</div>
            </div>
          </CheckboxComponent>
          <CheckboxComponent
            id='twoPlusTransf'
            checked={twoPlusTransfer}
            setChecked={setTwoPlusTransfer}
          >
            <div className={styles.description}>
              <div className={styles.title}>2+ пересадки</div>
              <div className={styles.subtitle}>от 590$</div>
            </div>
          </CheckboxComponent>
        </div>
        <div className={styles.transferCities}>
          <div className={styles.header}>Города пересадки</div>
          {transferCities.map((item, index) => {
            return (
              <CheckboxComponent
                key={index}
                id={`transferCity${index}`}
                index={index}
                checked={item.checked}
                setCheckboxByIndex={setTransferCities}
              >
                <div className={styles.description}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.subtitle}>{item.code}</div>
                </div>
              </CheckboxComponent>
            );
          })}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.priceWrapper}>
          <div className={styles.title}>от 320$</div>
          <div className={styles.subtitle}>1 из 400 вариантов</div>
        </div>
        <div onClick={applyFilters} className={styles.showButton}>
          Показать
        </div>
      </div>
    </div>
  );
}
