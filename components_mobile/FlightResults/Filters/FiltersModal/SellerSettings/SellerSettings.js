import React, { useState, useEffect, useContext } from "react";
import styles from "./SellerSettings.module.scss";
import { goBackIcon } from "../FiltersModal";
import { dom } from "../../../../../helpers/reuse";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { FiltersStateContext, FiltersDispatchContext } from "../../Filters";

export default function SellerSettings({ unmountModal }) {
  const { state } = useContext(FiltersStateContext);
  const { dispatch } = useContext(FiltersDispatchContext);
  const { filtersModalInitialState } = state;
  const { sellerSettingsInitialState } = filtersModalInitialState;

  const s = sellerSettingsInitialState;
  const [sellers, setSellers] = useState(s.sellers);

  useEffect(() => {
    const isAtLeastOneChecked = sellers.some((item) => item.checked === true);

    if (isAtLeastOneChecked) {
      dom(`.${styles.dropSettings}`).classList.add(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "sellerSettingsCount",
        payload: 1,
      });
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      dispatch({
        type: "updateFilterSettingsState",
        fieldName: "sellerSettingsCount",
        payload: 0,
      });
    }
    dispatch({
      type: "updateSellerSettings",
      fieldName: "sellers",
      payload: sellers,
    });
  }, [sellers]);

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
    const temp = sellers.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setSellers(temp);
  };

  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Продавец</div>
        <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
          Сбросить
        </div>
      </div>
      <div className={styles.scrollableContainer}>
        <div className={styles.sellersContainer}>
          {sellers.map((item, idx) => {
            return (
              <CheckboxComponent
                key={idx}
                id={`seller${idx}`}
                checked={true}
                index={idx}
                checked={item.checked}
                setOnlyOneCheckboxByIndex={setSellers}
              >
                <div className={styles.description}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.subtitle}>{item.description}</div>
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
