import React, { useState, useEffect } from "react";
import styles from "./TransferSettings.module.scss";
import CheckboxComponent from "../CheckboxComponent/CheckboxComponent";
import { goBackIcon } from "../FiltersModal";
import { dom } from "../../../../../../helpers/reuse";
import SectionTabs from "../../../SectionTabs/SectionTabs";

export default function TransferSettings({
  nrTransfersInitialState,
  transferCitiesInitialState,
  setTransferSettingsCount,
  nrTransfersInitialState2,
  transferCitiesInitialState2,
  setTransferSettingsCount2,
  unmountModal,
}) {
  const [selectedTab, setSelectedTab] = useState("tur");
  const [isActiveSection1, setIsActiveSection1] = useState(true);

  const receiveSelectedSection = (section) => {
    const mainWrapper = dom(`.${styles.mainWrapper}`);
    const mainWrapper2 = dom(`.${styles.mainWrapper2}`);
    if (section === "tur") {
      setSelectedTab("tur");
      if (mainWrapper2) {
        mainWrapper2.classList.add(styles.slideLeftReverse);
        setTimeout(() => {
          setIsActiveSection1(true);
        }, 100);
      } else {
        setIsActiveSection1(true);
      }
    } else {
      setSelectedTab("retur");

      if (mainWrapper) {
        mainWrapper.classList.add(styles.slideRightReverse);
        setTimeout(() => {
          setIsActiveSection1(false);
        }, 100);
      } else {
        setIsActiveSection1(false);
      }
    }
  };

  // section1
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

  const [nrSelSettings1, setNrSelSettings1] = useState(0);
  const [nrSelSettings2, setNrSelSettings2] = useState(0);

  useEffect(() => {
    if (!isActiveSection1) return;
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
      setTransferSettingsCount(tcCheckedCount + typeTransferCount);
      setNrSelSettings1(tcCheckedCount + typeTransferCount);
    } else {
      dom(`.${styles.dropSettings}`).classList.remove(styles.isVisible);
      setTransferSettingsCount(0);
      setNrSelSettings1(0);
    }
  }, [
    noTransfer,
    oneTransfer,
    twoPlusTransfer,
    transferCities,
    isActiveSection1,
  ]);

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
  };

  // -- end section1

  // section2
  const [noTransfer2, setNoTransfer2] = useState(
    nrTransfersInitialState2.noTransfer2
  );
  const [oneTransfer2, setOneTransfer2] = useState(
    nrTransfersInitialState2.oneTransfer2
  );
  const [twoPlusTransfer2, setTwoPlusTransfer2] = useState(
    nrTransfersInitialState2.twoPlusTransfer2
  );
  const [transferCities2, setTransferCities2] = useState(
    transferCitiesInitialState2
  );

  useEffect(() => {
    if (isActiveSection1) return;
    const isAtLeastOneChecked = transferCities2.some(
      (item) => item.checked === true
    );
    const tcCheckedCount = transferCities2.filter(
      (item) => item.checked === true
    ).length;
    let typeTransferCount = 0;
    if (noTransfer2) {
      typeTransferCount = 1;
    }
    if (oneTransfer2) {
      typeTransferCount += 1;
    }
    if (twoPlusTransfer2) {
      typeTransferCount += 1;
    }
    if (
      noTransfer2 ||
      oneTransfer2 ||
      twoPlusTransfer2 ||
      isAtLeastOneChecked
    ) {
      dom(`.${styles.dropSettings2}`).classList.add(styles.isVisible);
      setTransferSettingsCount2(tcCheckedCount + typeTransferCount);
      setNrSelSettings2(tcCheckedCount + typeTransferCount);
    } else {
      dom(`.${styles.dropSettings2}`).classList.remove(styles.isVisible);
      setTransferSettingsCount2(0);
      setNrSelSettings2(0);
    }
  }, [
    noTransfer2,
    oneTransfer2,
    twoPlusTransfer2,
    transferCities2,
    isActiveSection1,
  ]);

  const dropAllSettings2 = () => {
    setNoTransfer2(false);
    setOneTransfer2(false);
    setTwoPlusTransfer2(false);
    const temp = transferCities2.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    setTransferCities2(temp);
  };

  // -- end section2

  const goBack = () => {
    dom(`.${styles.goBackIcon}`).style.transform = "scale(.8)";
    setTimeout(() => {
      unmountModalHelper();
    }, 150);
    setTimeout(() => {
      unmountModal({
        nrTransfersInitialState: {
          noTransfer,
          oneTransfer,
          twoPlusTransfer,
        },
        transferCitiesInitialState: transferCities,

        nrTransfersInitialState2: {
          noTransfer2,
          oneTransfer2,
          twoPlusTransfer2,
        },
        transferCitiesInitialState2: transferCities2,
      });
    }, [500]);
  };
  const unmountModalHelper = () => {
    dom(`.${styles.container}`).classList.remove(styles.slideLeft);
    dom(`.${styles.container}`).classList.add(styles.slideRight);
  };
  const applyFilters = () => {
    unmountModalHelper();
    unmountModal(
      {
        nrTransfersInitialState: {
          noTransfer,
          oneTransfer,
          twoPlusTransfer,
        },
        transferCitiesInitialState: transferCities,

        nrTransfersInitialState2: {
          noTransfer2,
          oneTransfer2,
          twoPlusTransfer2,
        },
        transferCitiesInitialState2: transferCities2,
      },
      "applyFilters"
    );
  };

  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div onClick={goBack} className={styles.goBackIcon}>
          {goBackIcon}
        </div>
        <div className={styles.title}>Пересадки</div>
        {isActiveSection1 ? (
          <div onClick={dropAllSettings} className={`${styles.dropSettings}`}>
            Сбросить
          </div>
        ) : (
          <div onClick={dropAllSettings2} className={`${styles.dropSettings2}`}>
            Сбросить
          </div>
        )}
      </div>
      <SectionTabs
        iconTur='plane'
        iconRetur='plane'
        selectedTab={selectedTab}
        passSelectedOption={receiveSelectedSection}
        fromFiltersModal={true}
        nrSelSettings1={nrSelSettings1}
        nrSelSettings2={nrSelSettings2}
      />
      <div className={styles.sidesWrapper}>
        {isActiveSection1 ? (
          <div
            className={`${styles.scrollableContainer} ${styles.slideRight2}`}
          >
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
        ) : (
          <div
            className={`${styles.scrollableContainer2} ${styles.slideLeft2}`}
          >
            <div className={styles.transferCount}>
              <div className={styles.header}>Лондон – Кишинёв</div>
              <CheckboxComponent
                id='noTransf2'
                checked={noTransfer2}
                setChecked={setNoTransfer2}
              >
                <div className={styles.description}>
                  <div className={styles.title}>Без пересадок</div>
                  <div className={styles.subtitle}>от 320$</div>
                </div>
              </CheckboxComponent>
              <CheckboxComponent
                id='oneTransf2'
                checked={oneTransfer2}
                setChecked={setOneTransfer2}
              >
                <div className={styles.description}>
                  <div className={styles.title}>1 пересадка</div>
                  <div className={styles.subtitle}>от 410$</div>
                </div>
              </CheckboxComponent>
              <CheckboxComponent
                id='twoPlusTransf2'
                checked={twoPlusTransfer2}
                setChecked={setTwoPlusTransfer2}
              >
                <div className={styles.description}>
                  <div className={styles.title}>2+ пересадки</div>
                  <div className={styles.subtitle}>от 590$</div>
                </div>
              </CheckboxComponent>
            </div>
            <div className={styles.transferCities}>
              <div className={styles.header}>Города пересадки</div>
              {transferCities2.map((item, index) => {
                return (
                  <CheckboxComponent
                    key={index}
                    id={`transferCity2_${index}`}
                    index={index}
                    checked={item.checked}
                    setCheckboxByIndex={setTransferCities2}
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
        )}
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
