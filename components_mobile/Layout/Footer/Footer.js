import React, { useState } from "react";
import styles from "./Footer.module.scss";
import AppDownloadLinks from "./AppDownloadLinks/AppDownloadLinks";
import ContactMediums from "./ContactMediums/ContactMediums";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import QuickQuestions from "./QuickQuestions/QuickQuestions";

// import { i18n } from "../../../i18n";

export default function Footer({ t }) {
  // const [renderedAboutUs, setRenderedAboutUs] = useState(false);
  // const [renderedCommunity, setRenderedCommunity] = useState(false);
  // const [renderedHelp, setRenderedHelp] = useState(false);
  // const toggleAboutUs = (evt) => {
  //   evt.target.classList.toggle(styles.rotate45deg);
  //   setRenderedAboutUs(!renderedAboutUs);
  //   document
  //     .querySelector(`.${styles.wrapper} > ul:nth-child(1)`)
  //     .classList.toggle(styles.openList);
  // };
  // const toggleCommunity = (evt) => {
  //   evt.target.classList.toggle(styles.rotate45deg);
  //   setRenderedCommunity(!renderedCommunity);
  //   document
  //     .querySelector(`.${styles.wrapper} > ul:nth-child(2)`)
  //     .classList.toggle(styles.openList2);
  // };
  // const toggleHelp = (evt) => {
  //   evt.target.classList.toggle(styles.rotate45deg);
  //   setRenderedHelp(!renderedHelp);
  //   document
  //     .querySelector(`.${styles.wrapper} > ul:nth-child(3)`)
  //     .classList.toggle(styles.openList3);
  // };
  // return (
  //   <section className={styles.container}>
  //     <div className={styles.wrapper}>
  //       <ul className={styles.about}>
  //         <li className={styles.heading}>
  //           О Нас <span onClick={toggleAboutUs}>+</span>
  //         </li>
  //         {renderedAboutUs ? (
  //           <>
  //             <li>Доверие и безопасность</li>
  //             <li>Доступность</li>
  //             <li>Условия и положения</li>
  //             <li>Контакты</li>
  //           </>
  //         ) : null}
  //       </ul>
  //       <ul className={styles.community}>
  //         <li className={styles.heading}>
  //           Сообщество<span onClick={toggleCommunity}>+</span>
  //         </li>
  //         {renderedCommunity ? (
  //           <>
  //             <li>Пригласить друзей</li>
  //             <li>Подарочные карты</li>
  //             <li>Акции</li>
  //           </>
  //         ) : null}
  //       </ul>
  //       <ul className={styles.help}>
  //         <li className={styles.heading}>
  //           Помощь<span onClick={toggleHelp}>+</span>
  //         </li>
  //         {renderedHelp ? <li>Центр поддержки</li> : null}
  //       </ul>
  //     </div>
  //   </section>
  // );

  const getLanguageSpecificContent = (key) => {
    return t(`footer:${key}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Column
          id='country'
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
          id='city'
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
          id='aircompany'
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
          id='airport'
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
          id='service'
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
          id='direction'
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

function Column({ id, title, items, ctaText }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const onClickArrowIconHanlder = () => {
    setIsOpenDropdown((prevValue) => !prevValue);
    document.querySelector(`#${id}`).classList.toggle(styles.rotate180deg);
    document
      .querySelector(`#container_${id}`)
      .classList.toggle(styles.openContainer);
  };
  return (
    <div id={`container_${id}`} className={styles.column}>
      <div className={styles.wrapperColumn}>
        <div className={styles.title}>{title}</div>
        <div
          id={id}
          onClick={onClickArrowIconHanlder}
          className={styles.arrowIcon}
        ></div>
      </div>
      {isOpenDropdown ? (
        <div className={styles.listDropdown}>
          {items.map((val, idx) => (
            <div className={styles.item} key={idx}>
              {val}
            </div>
          ))}
          {ctaText !== "" ? (
            <div className={styles.cta}>{ctaText}</div>
          ) : (
            <div className={styles.emptyLi}></div>
          )}
        </div>
      ) : null}
    </div>
  );
}
