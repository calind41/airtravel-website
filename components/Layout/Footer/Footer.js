import React from "react";
import AppDownloadLinks from "./AppDownloadLinks/AppDownloadLinks";
import ContactMediums from "./ContactMediums/ContactMediums";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import styles from "./Footer.module.scss";
import QuickQuestions from "./QuickQuestions/QuickQuestions";

export default function Footer({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`footer:${key}`);
  };
  return (
    <div className={`${styles.container}`}>
      <div className={styles.wrapper}>
        <Column
          title={getLanguageSpecificContent("country")}
          items={[
            "Россия",
            "Таиланд",
            "Черногория",
            "Кипр",
            "Болгария",
            "Грузия",
          ]}
          ctaText={getLanguageSpecificContent("allCountries")}
        />
        <Column
          title={getLanguageSpecificContent("city")}
          items={[
            "Москва",
            "Санкт-Петербург",
            "Симферополь",
            "Адлер",
            "Екатеринбург",
            "Лондон",
          ]}
          ctaText={getLanguageSpecificContent("allCities")}
        />
        <Column
          title={getLanguageSpecificContent("aircompany")}
          items={[
            "Аэрофлот",
            "Air France",
            "Alitalia",
            "Air Baltic",
            "Emirates",
            "KLM",
          ]}
          ctaText={getLanguageSpecificContent("allAircompanies")}
        />
        <Column
          title={getLanguageSpecificContent("airports")}
          items={[
            "Шереметьево",
            "Курумоч",
            "Домодедово",
            "Толмачево",
            "Владивосток",
            "Гамбург",
          ]}
          ctaText={getLanguageSpecificContent("allAirports")}
        />
        <Column
          title={getLanguageSpecificContent("service")}
          items={[
            getLanguageSpecificContent("serviceItem1"),
            getLanguageSpecificContent("serviceItem2"),
            getLanguageSpecificContent("serviceItem3"),
            getLanguageSpecificContent("serviceItem4"),
            getLanguageSpecificContent("serviceItem5"),
            getLanguageSpecificContent("serviceItem6"),
          ]}
          ctaText=''
        />
        <Column
          title={getLanguageSpecificContent("directions")}
          items={[
            "Москва – Симферополь",
            "Москва – Сочи",
            "Москва – Тиват",
            "Москва – Минеральные Воды",
            "Санкт-Петербург – Москва",
            "Москва – Бангкок",
          ]}
          ctaText=''
        />
      </div>
      <ContactMediums t={t} />
      <AppDownloadLinks />
      <AdditionalInfo t={t} />
      <QuickQuestions t={t} />
    </div>
  );
}

function Column({ title, items, ctaText }) {
  return (
    <div className={styles.column}>
      <ul>
        <li className={styles.title}>{title}</li>
        {items.map((val, idx) => (
          <li className={styles.item} key={idx}>
            {val}
          </li>
        ))}
        {ctaText !== "" ? (
          <li className={styles.cta}>{ctaText}</li>
        ) : (
          <li className={styles.emptyLi}></li>
        )}
      </ul>
    </div>
  );
}
