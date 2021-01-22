import React from "react";
import DestinationCard from "./DestinationCard/DestinationCard";
import styles from "./PopularDestinations.module.scss";
import HelpAndAdvice_M from "../HelpAndAdvice_M/HelpAndAdvice_M";

import { i18n } from "../../i18n";

export default function PopularDestinations_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`popularDestinationsHelpAndAdvice:${key}`);
  };
  return (
    // <div className={styles.wrapper}>
    //   <h1 className={styles.title}>Популярные направления</h1>
    //   <section className={`${styles.container}`}>
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //     <DestinationCard />
    //   </section>
    // </div>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <div className={styles.planeIcon}>
            <img src='/images/plane_icon.svg' />
          </div>
          <h1>{getLanguageSpecificContent("PopularDestinations-header")}</h1>
        </div>
        <section className={styles.cards}>
          <DestinationCard id='id1' />
          <DestinationCard id='id2' />
          <DestinationCard id='id3' />
          <DestinationCard id='id4' />
          <DestinationCard id='id5' />
          <DestinationCard id='id6' />
          <DestinationCard id='id7' />
          <DestinationCard id='id8' />
          <DestinationCard id='id9' />
          <DestinationCard id='id10' />
          <DestinationCard id='id11' />
          <DestinationCard id='id12' />
        </section>
      </div>
      <HelpAndAdvice_M />
    </div>
  );
}
