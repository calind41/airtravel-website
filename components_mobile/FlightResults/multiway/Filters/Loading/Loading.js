import React, { useState, useEffect } from "react";
import styles from "./Loading.module.scss";

const phrases = [
  "Ищем лучшие предложения...",
  "Проверяем наличие мест...",
  "Ищем билеты со скидкой...",
  "Ищем лоукостеры и чартеры...",
  "Ищем билеты на Aviasales...",
];

export default function Loading({ unmountLoader }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let index = 0;
    const textEl = document.querySelector(`.${styles.text}`);
    let intervalId, timeoutId, timeoutId2;
    intervalId = setInterval(() => {
      //   setTimeout(() => {
      textEl.classList.add(styles.opacityClass);
      //   }, 0);
      timeoutId = setTimeout(() => {
        textEl.classList.remove(styles.opacityClass);
        setIndex((prevValue) => {
          if (prevValue === 4) {
            return 0;
          } else return prevValue + 1;
        });
      }, 300);
    }, 3000);

    // setTimeout(() => {
    //   clearInterval(intervalId);
    //   unmountLoader();
    // }, 16000);
    timeoutId2 = setTimeout(() => {
      clearInterval(intervalId);
      unmountLoader();
    }, 300);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.spinner}>{circleIcon}</div>
        <div className={styles.text}>{phrases[index]}</div>
      </div>
    </div>
  );
}

const circleIcon = (
  <svg viewBox='0 0 100 100' className='Loader__svg_2cJh8'>
    <circle
      fill='none'
      className='Loader__circle_bWZ-N'
      stroke='currentColor'
      strokeWidth='10'
      cx='50'
      cy='50'
      r='44'
    ></circle>
  </svg>
);
