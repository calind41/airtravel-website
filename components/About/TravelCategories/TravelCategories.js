import React from "react";
import styles from "./TravelCategories.module.scss";
import {
  artSvg,
  entertainmentSvg,
  foodsAndDrinkSvg,
  natureSvg,
  sportActivitySvg,
} from "./svg";
// import { i18n } from "../../../i18n";

const data = [
  { icon: artSvg, text: "Искусство и культура" },
  { icon: entertainmentSvg, text: "Развлекательная программа" },
  { icon: foodsAndDrinkSvg, text: "Еда и напитки" },
  { icon: natureSvg, text: "Природа" },
  { icon: sportActivitySvg, text: "Спортивные мероприятия" },
];

export default function TravelCategories({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`travelCategories:${key}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.title}>
          {getLanguageSpecificContent("title")}
        </span>
        <span className={styles.subtitle}>
          {getLanguageSpecificContent("subtitle")}
        </span>
      </div>
      <div className={styles.categories}>
        {data.map((d, i) => {
          return (
            <Category
              key={i}
              icon={d.icon}
              text={getLanguageSpecificContent(`cat${i + 1}`)}
            />
          );
        })}
      </div>
    </section>
  );
}

const Category = ({ icon, text }) => {
  return (
    <div className={styles.category}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
