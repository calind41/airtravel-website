import React, { useState, useEffect } from "react";
import styles from "./CardSlider.module.scss";
import {
  giftIconSvg,
  mobileBlockSvg,
  coinsBlackSvg,
  b2bSvg,
  arrowRightSvg,
  arrowLeftSvg,
} from "./svg";

import Card from "./Card/Card";

export default function CardSlider() {
  const [goRightCount, setGoRightCount] = useState(0);
  const [goLeftCount, setGoLeftCount] = useState(2);

  const [countRight, setCountRight] = useState(0);
  const [countLeft, setCountLeft] = useState(4);

  const alignLeftWithSearchForm = () => {
    const container = document.querySelector(`.${styles.container}`);
    // const sformEl = document.querySelector("#wrapperId");
    const searchFormEl = document.querySelector("#searchFormId");
    // if (sformEl) {
    //   let left = sformEl.getBoundingClientRect().left;
    //   if (window.innerWidth <= 1140) {
    //     left += 50;
    //   }
    //   container.style.left = left + "px";
    // }
    if (searchFormEl) {
      const left = searchFormEl.getBoundingClientRect().left;
      container.style.left = left + "px";
    }

    if (container) {
      container.style.transform = "translate(0px, 0)";
      const arrowLeft = document.querySelector(`.${styles.arrowLeft}`);
      const arrowRight = document.querySelector(`.${styles.arrowRight}`);
      arrowLeft.style.opacity = "0";
      arrowRight.style.opacity = "1";
      setGoRightCount(0);
      setGoLeftCount(2);
      setCountRight(0);
      setCountLeft(4);
    }
  };
  useEffect(() => {
    // Used to align Slider with search form
    alignLeftWithSearchForm();
    window.addEventListener("resize", alignLeftWithSearchForm);
  }, []);

  const goRight = () => {
    const container = document.querySelector(`.${styles.container}`);
    const arrowLeft = document.querySelector(`.${styles.arrowLeft}`);
    const arrowRight = document.querySelector(`.${styles.arrowRight}`);

    const innerWidth = window.innerWidth;

    if (innerWidth <= 1140) {
      if (countRight === 0) {
        setCountRight(1);
        container.style.transform = "translate(-361px, 0)";
        setCountLeft(3);
        arrowLeft.style.opacity = "1";
      }
      if (countRight === 1) {
        setCountRight(2);
        container.style.transform = "translate(-722px, 0)";
        setCountLeft(2);
      }
      if (countRight === 2) {
        setCountRight(3);
        container.style.transform = "translate(-1083px, 0)";
        setCountLeft(1);
      }
      if (countRight === 3) {
        setCountRight(4);
        container.style.transform = "translate(-1444px, 0)";
        setCountLeft(0);
        arrowRight.style.opacity = "0";
      }
    } else {
      if (goRightCount === 0) {
        // document.querySelector(`.${styles.wrapper}`).style.overflow = "visible";

        container.style.transform = "translate(-542px, 0)";
        setGoRightCount(1);
        setGoLeftCount(1);
        arrowLeft.style.opacity = "1";
      }
      if (goRightCount === 1) {
        container.style.transform = "translate(-813px,0)";
        setGoRightCount(2);
        arrowRight.style.opacity = "0";
        setGoLeftCount(0);
      }
    }
  };
  const goLeft = () => {
    const container = document.querySelector(`.${styles.container}`);
    const arrowLeft = document.querySelector(`.${styles.arrowLeft}`);
    const arrowRight = document.querySelector(`.${styles.arrowRight}`);

    const innerWidth = window.innerWidth;

    if (innerWidth <= 1140) {
      if (countLeft === 0) {
        setCountLeft(1);
        container.style.transform = "translate(-1083px, 0)";
        setCountRight(3);
        arrowRight.style.opacity = "1";
      }
      if (countLeft === 1) {
        setCountLeft(2);
        container.style.transform = "translate(-722px, 0)";
        setCountRight(2);
      }
      if (countLeft === 2) {
        setCountLeft(3);
        container.style.transform = "translate(-361px, 0)";
        setCountRight(1);
      }
      if (countLeft === 3) {
        setCountRight(4);
        container.style.transform = "translate(0px, 0)";
        setCountRight(0);
        arrowLeft.style.opacity = "0";
      }
    } else {
      if (goLeftCount === 0) {
        container.style.transform = "translate(-542px, 0)";
        setGoLeftCount(1);
        setGoRightCount(1);
        arrowRight.style.opacity = "1";
      }
      if (goLeftCount === 1) {
        container.style.transform = "translate(0, 0)";
        setGoLeftCount(2);
        arrowLeft.style.opacity = "0";

        setGoRightCount(0);
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <div onClick={goLeft} className={styles.arrowLeft}>
        {arrowLeftSvg}
      </div>
      <div onClick={goRight} className={styles.arrowRight}>
        {arrowRightSvg}
      </div>
      <section className={styles.container}>
        <Card
          hText='Страны, открытые для туристов из России'
          ctaText='Читать статью'
          cardContainerStyles={{
            width: "525px",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(/images/OTT_Stories_Open_Countries.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
          hStyles={{ width: "375px", fontSize: "22px" }}
          btnStyles={{ width: "493px" }}
        />
        <Card
          icon={giftIconSvg}
          hText='Дарите эмоции, а не вещи'
          pText='Сертификаты на путешествие от 1000 ₽'
          ctaText='Купить'
          bgColor='#01abfb'
          cardContainerStyles={{
            position: "relative",
            right: "16px",
          }}
        />
        <Card
          hText='Тревел-ребусы'
          pText='Отгадайте все города и страны'
          ctaText='Отгадать'
          cardContainerStyles={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(/images/OTT_Stories_Rebuses.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
            position: "relative",
            right: "32px",
          }}
          hStyles={{ width: "375px", fontSize: "22px" }}
          btnStyles={{ width: "493px" }}
        />
        <Card
          icon={mobileBlockSvg}
          hText='В приложении дешевле'
          pText='Скачайте приложение по ссылке, и мы начислим вам дополнительные 50 трипкоинов.'
          ctaText='Скачать'
          bgColor='#ffd41e'
          pStyles={{ width: "235px", color: "#000" }}
          hStyles={{ color: "#000" }}
          btnStyles={{
            backgroundColor: "rgba(0, 0, 0, 0.11)",
            color: "#000",
          }}
          cardContainerStyles={{ position: "relative", right: "48px" }}
        />
        <Card
          icon={coinsBlackSvg}
          hText='Трипкоины на бесплатные путешествия'
          pText='Возвращайте до 10% с каждого бронирования на бонусный счёт'
          ctaText='Узнать больше'
          bgColor='#01abfb'
          pStyles={{ width: "220px" }}
          cardContainerStyles={{ position: "relative", right: "64px" }}
        />
        <Card
          icon={b2bSvg}
          hText='Путешествуете по бизнесу?'
          pText='OneTwoTrip for Business — онлайн-сервис организации командировок'
          ctaText='Подключиться'
          bgColor='#fff'
          pStyles={{ color: "#000" }}
          hStyles={{ color: "#000" }}
          btnStyles={{ backgroundColor: "rgba(0, 0, 0, 0.09)", color: "#000" }}
          cardContainerStyles={{ position: "relative", right: "80px" }}
        />
      </section>
    </div>
  );
}
