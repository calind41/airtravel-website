import React, { useState, useEffect } from "react";
import styles from "./BaggageSettings.module.scss";
import { goBackIcon } from "../FiltersModal";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { dom } from "../../../../../../helpers/reuse";

export default function BaggageSettings({
  setBaggageSettingCount,
  unmountModal,
  initialState,
}) {
  const [checkedWithBaggage, setCheckedWithBaggage] = useState(
    initialState.checkedWithBaggage
  );
  const [checkedWithoutBaggage, setCheckedWithoutBaggage] = useState(
    initialState.checkedWithoutBaggage
  );

  useEffect(() => {
    if (checkedWithBaggage) {
      setCheckedWithoutBaggage(false);
    }
  }, [checkedWithBaggage]);

  useEffect(() => {
    if (checkedWithoutBaggage) {
      setCheckedWithBaggage(false);
    }
  }, [checkedWithoutBaggage]);

  useEffect(() => {
    if (checkedWithBaggage || checkedWithoutBaggage) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      setBaggageSettingCount(1);
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      setBaggageSettingCount(0);
    }
  }, [checkedWithBaggage, checkedWithoutBaggage]);

  const goBack = () => {
    dom(`.${styles.goBackIcon}`).style.transform = "scale(.8)";
    setTimeout(() => {
      unmountModalHelper();
    }, 150);
    setTimeout(() => {
      unmountModal({
        baggageSettingsInitialState: {
          checkedWithBaggage,
          checkedWithoutBaggage,
        },
      });
    }, [500]);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal(
      {
        baggageSettingsInitialState: {
          checkedWithBaggage,
          checkedWithoutBaggage,
        },
      },
      "applyFilters"
    );
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
