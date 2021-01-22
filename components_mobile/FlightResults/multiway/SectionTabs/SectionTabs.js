import React, { useEffect, useState } from "react";
import styles from "./SectionTabs.module.scss";
import { dom } from "../../../../helpers/reuse";

export default function SectionTabs({
  iconTur,
  iconRetur,
  selectedTab,
  passSelectedOption,
  fromFiltersModal,
  nrSelSettings1,
  nrSelSettings2,
}) {
  useEffect(() => {
    selectOption(selectedTab);
  }, [selectedTab]);
  useEffect(() => {
    if (fromFiltersModal) return;
    const scrollHandler = () => {
      if (window.scrollY >= 456) {
        dom(`.${styles.container}`).style.position = "fixed";
      } else {
        dom(`.${styles.container}`).style.position = "relative";
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const selectOption = (opt) => {
    if (opt === "tur") {
      dom(`.${styles.tur}`).classList.add(styles.selected);
      dom(`.${styles.retur}`).classList.remove(styles.selected);
    } else {
      dom(`.${styles.tur}`).classList.remove(styles.selected);
      dom(`.${styles.retur}`).classList.add(styles.selected);
    }
    passSelectedOption(opt);
  };
  return (
    <div
      style={fromFiltersModal ? { boxShadow: "none" } : {}}
      className={styles.container}
    >
      <div
        onClick={() => selectOption("tur")}
        className={
          selectedTab === "tur"
            ? `${styles.tur} ${styles.selected}`
            : `${styles.tur}`
        }
      >
        <div className={styles.planeIcon}>
          {iconTur === "plane" ? planeIcon : chosenTicketIcon}
        </div>
        <div className={styles.date}>10 апр, сб</div>
        {nrSelSettings1 && nrSelSettings1 !== 0 ? (
          <div className={styles.yellowDot}></div>
        ) : null}
      </div>
      <div
        onClick={() => selectOption("retur")}
        className={
          selectedTab === "retur"
            ? `${styles.retur} ${styles.selected}`
            : `${styles.retur}`
        }
      >
        <div
          style={iconRetur === "plane" ? { transform: "scale(-1)" } : {}}
          className={styles.planeIcon}
        >
          {iconRetur === "plane" ? planeIcon : chosenTicketIcon}
        </div>
        <div className={styles.date}>17 апр, сб</div>
        {nrSelSettings2 && nrSelSettings2 !== 0 ? (
          <div className={styles.yellowDot}></div>
        ) : null}
      </div>
    </div>
  );
}

export const planeIcon = (
  <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M4.8 15.5h1.6l4-6.316h4.4c.664 0 1.2-.529 1.2-1.184a1.19 1.19 0 00-1.2-1.184h-4.4L6.4.5H4.8l2 6.316H2.4l-1.2-1.58H0L.8 8 0 10.763h1.2l1.2-1.579h4.4l-2 6.316z'
      fill='#333'
    ></path>
  </svg>
);

const chosenTicketIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
    <path
      d='M16 8A8 8 0 110 8a8 8 0 0116 0zM5.707 7.293a1 1 0 00-1.414 1.414l2 2A1 1 0 007.6 10.8l4-4a1 1 0 00-1.2-1.6L7.094 8.68 5.707 7.293z'
      fill='currentColor'
    ></path>
  </svg>
);
