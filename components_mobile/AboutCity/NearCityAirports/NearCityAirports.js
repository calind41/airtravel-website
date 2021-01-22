import React from "react";
import styles from "./NearCityAirports.module.scss";
import { i18n } from "../../../i18n";

export default function NearCityAirports() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`aboutCity:${key}`);
  };

  return (
    <section className={styles.nearCityAirports}>
      <header>
        <div className={styles.title}>
          {getLanguageSpecificContent("NearCityAirports-title")} Venetia
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("NearCityAirports-subtitle-1")} Venetia{" "}
          {getLanguageSpecificContent("NearCityAirports-subtitle-2")}
        </div>
      </header>
      <main>
        <AirportCard
          title='Aeroportul Veneţia Treviso'
          subtitle='26 km față de centrul orașului'
        />
        <AirportCard
          title='Aeroportul Veneţia Marco Polo'
          subtitle='6 km față de centrul orașului'
        />
      </main>
      <footer>
        <div className={styles.question}>
          {getLanguageSpecificContent("NearCityAirports-question")}
        </div>
        <div className={styles.answer}>
          Poți ajunge în centrul orașului în diferite forme, în funcție de
          timpul sau bugetul pe care le ai la dispoziție. Forma cea mai
          economică este să folosești ATVO Express bus sau ACTV City bus. Dacă
          vrei să te bucuri de o experiență autentică ai la dispoziție
          transportul public pe apă Alilaguna sau un taxi privat pe apă. De
          asemenea, poți folosi și un taxi obișnuit.
        </div>
      </footer>
    </section>
  );
}

function AirportCard({ title, subtitle }) {
  return (
    <div className={styles.airportCardContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
}
