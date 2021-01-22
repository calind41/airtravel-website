import React, { useState, useEffect } from "react";
import styles from "./MobileHeader.module.scss";
import { logo } from "../Header";
import Sidebar from "react-sidebar";
import {
  hamburgerMenu,
  aboutIcon,
  insuranceIcon,
  blogIcon,
  frequentQuestionsIcon,
  contactIcon,
  termsAndConditionsIcon,
  confidentialityIcon,
  rightArrowIcon,
} from "./icons";

import { i18n } from "../../../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`mobileHeader:${key}`);
};

export default function MobileHeader({ mode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const menuContent = document.querySelector(`.${styles.menuContent}`);

    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const [open, setOpen] = useState(true);
  const onSetSidebarOpen = (open) => {
    setIsMenuOpen(open);
  };

  useEffect(() => {
    if (isMenuOpen === false) {
      setTimeout(() => {
        setOpen(false);
      }, 300);
    } else {
      setOpen(true);
    }
  }, [isMenuOpen]);

  return (
    <Sidebar
      pullRight
      sidebar={<MenuContent toggleMenu={toggleMenu} />}
      open={isMenuOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "white",
          width: "77vw",
          zIndex: 9099900000,
        },
        root: {
          zIndex: 11000,
          position: open ? "fixed" : "absolute",
          height: open ? "100vh" : "60px",
        },
      }}
    >
      <div
        className={
          mode === "light"
            ? `${styles.containerLightMode} ${styles.container}`
            : `${styles.container}`
        }
      >
        <div className={styles.logo}>{logo}</div>
        <div onClick={toggleMenu} className={styles.hamburgerMenuContainer}>
          {hamburgerMenu}
        </div>
      </div>
    </Sidebar>
  );
}

function MenuContent({ toggleMenu }) {
  return (
    <div className={`${styles.menuContent} `}>
      <div className={styles.heading}>
        <div onClick={toggleMenu}>
          <span>{getLanguageSpecificContent("close")}</span>
          <span className={styles.icon}>{rightArrowIcon}</span>
        </div>
      </div>
      <section className={styles.company}>
        <div className={styles.header}>
          {getLanguageSpecificContent("company")}
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{aboutIcon}</span>
          <span>{getLanguageSpecificContent("about")} iFly.md</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{insuranceIcon}</span>
          <span>{getLanguageSpecificContent("insurance")} iFly.md</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{blogIcon}</span>
          <span>{getLanguageSpecificContent("blog")}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{frequentQuestionsIcon}</span>
          <span>{getLanguageSpecificContent("frequentQ")}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{contactIcon}</span>
          <span>{getLanguageSpecificContent("contacts")}</span>
        </div>
      </section>
      <section className={styles.termsAndConditions}>
        <div className={styles.header}>
          {getLanguageSpecificContent("termsAndConditions")}
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{termsAndConditionsIcon}</span>
          <span>{getLanguageSpecificContent("termsAndConditions")}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{confidentialityIcon}</span>
          <span>{getLanguageSpecificContent("confidentiality")}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.icon}>{confidentialityIcon}</span>
          <span>{getLanguageSpecificContent("security")}</span>
        </div>
      </section>
    </div>
  );
}
