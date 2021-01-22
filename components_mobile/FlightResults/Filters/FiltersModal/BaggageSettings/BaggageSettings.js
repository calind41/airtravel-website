import React, { useState, useEffect, useContext } from "react";
import styles from "./BaggageSettings.module.scss";
import { goBackIcon } from "../FiltersModal";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { dom } from "../../../../../helpers/reuse";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";

export default function BaggageSettings({ unmountModal }) {
  const { dispatch } = useContext(FiltersDispatchContext);
  const { state } = useContext(FiltersStateContext);
  const { filtersModalInitialState } = state;
  const { baggageSettingsInitialState } = filtersModalInitialState;
  const initialState = baggageSettingsInitialState;

  const [checkedWithBaggage, setCheckedWithBaggage] = useState(
    initialState.checkedWithBaggage
  );
  const [checkedWithoutBaggage, setCheckedWithoutBaggage] = useState(
    initialState.checkedWithoutBaggage
  );

  useEffect(() => {
    if (checkedWithBaggage || checkedWithoutBaggage) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "baggageSettingCount",
        payload: 1,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "baggageSettingCount",
        payload: 0,
      });
    }
    dispatch({
      type: "updateFilterSettingsState",
      fieldName: "baggageSettingsInitialState",
      payload: {
        checkedWithoutBaggage,
        checkedWithBaggage,
      },
    });
    if (checkedWithBaggage && !checkedWithoutBaggage) {
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "withBaggageSelected",
        payload: true,
      });
    } else {
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "withBaggageSelected",
        payload: false,
      });
    }
  }, [checkedWithBaggage, checkedWithoutBaggage]);

  const goBack = () => {
    unmountModalHelper();
    setTimeout(() => {
      unmountModal();
    }, [250]);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal("applyFilters");
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Багаж</div>
        <div
          onClick={() => {
            setCheckedWithBaggage(false);
            setCheckedWithoutBaggage(false);
          }}
          className={`${styles.dropSettings}`}
        >
          Сбросить
        </div>
      </div>
      <CheckboxComponent
        id='withB'
        name='С багажом'
        type='withBaggage'
        checked={checkedWithBaggage}
        setChecked={setCheckedWithBaggage}
      />
      <CheckboxComponent
        id='withoutB'
        name='Без багажа'
        type='withoutBaggage'
        checked={checkedWithoutBaggage}
        setChecked={setCheckedWithoutBaggage}
      />
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
