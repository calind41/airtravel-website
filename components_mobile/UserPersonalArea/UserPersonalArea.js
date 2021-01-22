import React, { useState, useEffect } from "react";
import styles from "./UserPersonalArea.module.scss";
import UserDataPopup from "./UserDataFormPopup/UserDataFormPopup";
import UserTickets from "./UserTickets/UserTickets";
import UserPersonalData from "./UserPersonalData/UserPersonalData";
import UserSettings from "./UserSettings/UserSettings";

import { i18n } from "../../i18n";

export default function UserPersonalArea_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`personalRoom:${key}`);
  };

  const [hiddenTabs, setHiddenTabs] = useState(false);
  useEffect(() => {
    document.querySelectorAll(`.${styles.tabs} > div`).forEach((elem) => {
      elem.addEventListener("click", (evt) => chooseTab(evt));
    });
  }, [hiddenTabs]);

  const [showMyTickets, setShowMyTickets] = useState(true);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const chooseTab = (evt) => {
    let tabs = document.querySelectorAll(`.${styles.tabs} > div`);
    tabs.forEach((elem) => elem.classList.remove(styles.selectedTab));
    evt.target.classList.add(styles.selectedTab);

    switch (evt.target.id) {
      case "t1":
        setShowMyTickets(true);
        setShowPersonalData(false);
        setShowSettings(false);
        break;
      case "t2":
        setShowMyTickets(false);
        setShowPersonalData(true);
        setShowSettings(false);
        break;
      case "t3":
        setShowMyTickets(false);
        setShowPersonalData(false);
        setShowSettings(true);
        break;
    }
  };

  const toggleTabs = () => {
    setHiddenTabs(!hiddenTabs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{getLanguageSpecificContent("title")}</div>
      <UserDataPopup />
      {hiddenTabs ? null : (
        <div className={styles.tabs}>
          <div id='t1' className={`${styles.myTickets} ${styles.selectedTab}`}>
            {getLanguageSpecificContent("myTickets")}
          </div>
          <div id='t2' className={styles.personalData}>
            {getLanguageSpecificContent("personalInfo")}
          </div>
          <div id='t3' className={styles.settings}>
            {getLanguageSpecificContent("settings")}
          </div>
        </div>
      )}
      {showMyTickets && <UserTickets toggleTabs={toggleTabs} />}
      {showPersonalData && <UserPersonalData />}
      {showSettings && <UserSettings />}
    </div>
  );
}
