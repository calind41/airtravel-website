import React from "react";
import styles from "./HelpAndAdvice.module.scss";
import InfoCard from "./InfoCard/InfoCard";

// import { i18n } from "../../i18n";

export default function HelpAndAdvice({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`popularDestinationsHelpAndAdvice:${key}`);
  };
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.iconWrapper}>
          <img src='/images/help_advice_icon.svg' />
        </div>
        <div className={styles.title}>
          {getLanguageSpecificContent("HelpAndAdvice-title")}
        </div>
      </header>
      <InfoCard
        id='ic1'
        topic={getLanguageSpecificContent("InfoCard-topic1")}
        dropdownText={getLanguageSpecificContent("InfoCard-content1")}
      />
      <InfoCard
        id='ic2'
        topic={getLanguageSpecificContent("InfoCard-topic2")}
        dropdownText={getLanguageSpecificContent("InfoCard-content2")}
      />
      <InfoCard
        id='ic3'
        topic={getLanguageSpecificContent("InfoCard-topic3")}
        dropdownText={getLanguageSpecificContent("InfoCard-content3")}
      />
      <InfoCard
        id='ic4'
        topic={getLanguageSpecificContent("InfoCard-topic4")}
        dropdownText={getLanguageSpecificContent("InfoCard-content4")}
      />
      <InfoCard
        id='ic5'
        topic={getLanguageSpecificContent("InfoCard-topic5")}
        dropdownText={getLanguageSpecificContent("InfoCard-content5")}
      />
      <InfoCard
        id='ic6'
        topic={getLanguageSpecificContent("InfoCard-topic6")}
        dropdownText={getLanguageSpecificContent("InfoCard-content6")}
      />
      <div className={styles.showAllButton}>
        {getLanguageSpecificContent("HelpAndAdvice-showAllButton")}
      </div>
    </div>
  );
}
