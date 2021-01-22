import React, { useState, useEffect, useContext } from "react";
import styles from "./AircompanySettings.module.scss";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import checkBstyles from "../CheckboxComponent/CheckboxComponent.module.scss";
import { goBackIcon } from "../FiltersModal";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../../../../FlightTickets/FlightTicket/logos";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";
import { dom } from "../../../../../helpers/reuse";

export default function AircompanySettings({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { dispatch } = useContext(FiltersDispatchContext);
  const { filtersModalInitialState } = state;
  const { airCompSettingsInitialState } = filtersModalInitialState;

  const s = airCompSettingsInitialState;
  const [oneWorldAlliance, setOneWorldAlliance] = useState(s.oneWorldAlliance);
  const [skyTeamAlliance, setSkyTeamAlliance] = useState(s.skyTeamAlliance);
  const [starAlliance, setStarAlliance] = useState(s.starAlliance);
  const [checkedChooseAll, setCheckedChooseAll] = useState(s.checkedChooseAll);
  const [aircompanyList, setAircompanyList] = useState(s.aircompanyList);

  useEffect(() => {
    toggleSelectAllCheckboxHelper();
  }, [oneWorldAlliance, skyTeamAlliance, starAlliance]);

  useEffect(() => {
    const isAtLeasOneChecked = aircompanyList.some(
      (item) => item.checked === true
    );
    const cond =
      isAtLeasOneChecked || oneWorldAlliance || skyTeamAlliance || starAlliance;

    const aircompanyCheckedCount = aircompanyList.filter(
      (item) => item.checked === true
    ).length;

    let count = 0;
    [oneWorldAlliance, skyTeamAlliance, starAlliance].map((item) => {
      if (item) count += 1;
    });

    if (cond) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "airCompSettingsCount",
        payload: aircompanyCheckedCount + count,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "airCompSettingsCount",
        payload: 0,
      });
    }
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "airCompSettingsInitialState",
      payload: {
        oneWorldAlliance,
        skyTeamAlliance,
        starAlliance,
        checkedChooseAll,
        aircompanyList: aircompanyList,
      },
    });
  }, [
    oneWorldAlliance,
    skyTeamAlliance,
    starAlliance,
    checkedChooseAll,
    aircompanyList,
  ]);

  useEffect(() => {
    toggleSelectAllCheckboxHelper();
  }, [aircompanyList]);

  const toggleSelectAllCheckboxHelper = () => {
    const areAllChecked = aircompanyList.every((item) => item.checked === true);
    const cAll = dom("#chooseAll");
    if (areAllChecked && oneWorldAlliance && skyTeamAlliance && starAlliance) {
      cAll.classList.add(checkBstyles.checkBoxContainerChecked);
    } else {
      cAll.classList.remove(checkBstyles.checkBoxContainerChecked);
    }
  };

  const onClickSelectAllCheckboxHandler = (isChecked) => {
    const temp = aircompanyList.map((item) => {
      return {
        ...item,
        checked: !isChecked,
      };
    });
    setAircompanyList(temp);
    setOneWorldAlliance(!isChecked);
    setSkyTeamAlliance(!isChecked);
    setStarAlliance(!isChecked);
  };

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
    setOneWorldAlliance(false);
    setSkyTeamAlliance(false);
    setStarAlliance(false);
    setCheckedChooseAll(false);
    const temp = aircompanyList.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setAircompanyList(temp);
  };
  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Авиакомпании</div>
        <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
          Сбросить
        </div>
      </div>
      <div className={styles.scrollableContainer}>
        <div className={styles.alliances}>
          <div className={styles.header}>Альянсы</div>
          <CheckboxComponent
            id='OneWorld'
            checked={oneWorldAlliance}
            setChecked={setOneWorldAlliance}
          >
            <div className={styles.description}>
              <div className={styles.title}>Oneworld</div>
              <div className={styles.subtitle}>от 320$</div>
            </div>
          </CheckboxComponent>
          <CheckboxComponent
            id='SkyTeam'
            checked={skyTeamAlliance}
            setChecked={setSkyTeamAlliance}
          >
            <div className={styles.description}>
              <div className={styles.title}>SkyTeam</div>
              <div className={styles.subtitle}>от 320$</div>
            </div>
          </CheckboxComponent>
          <CheckboxComponent
            id='StarAlliance'
            checked={starAlliance}
            setChecked={setStarAlliance}
          >
            <div className={styles.description}>
              <div className={styles.title}>Star Alliance</div>
              <div className={styles.subtitle}>от 320$</div>
            </div>
          </CheckboxComponent>
        </div>
        <div className={styles.aircompanyList}>
          <div className={styles.header}>Авиакомпании</div>
          <CheckboxComponent
            id='chooseAll'
            name='Выбрать все'
            checked={checkedChooseAll}
            onClickHandler={onClickSelectAllCheckboxHandler}
          />
          {aircompanyList.map((item, index) => {
            return (
              <CheckboxComponent
                key={index}
                id={`airCompany${index}`}
                index={index}
                checked={item.checked}
                setCheckboxByIndex={setAircompanyList}
              >
                <div className={styles.description}>
                  <div className={styles.left}>
                    {index % 2 === 0 ? wizzAirLogo : airMoldovaLogo}
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.subtitle}>{item.startPrice}</div>
                  </div>
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
