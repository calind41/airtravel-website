import React from "react";
import styles from "./Navbar.module.scss";
import { iFlyLogo } from "./svg";
import { useRouter } from "next/router";

export default function Navbar({ mode, navClass, inLandingPage }) {
  let navClasses;
  if (navClass) navClasses = navClass.split(" ");
  const isLightMode = mode === "light";
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };
  const toMyPersonalRoom = () => {
    router.push("/auth");
  };
  const toAboutUs = () => {
    router.push("/about-us");
  };
  const toMainPage = () => {
    router.push("/");
  };
  const toAirCompanies = () => {
    router.push("/air-companies");
  };

  const toggleMenu = () => {
    const menuWrapper = document.querySelector(`.${styles.menuWrapper}`);
    const hamburgerMenu = document.querySelector(`.${styles.hamburgerMenu}`);
    const menuContent = document.querySelector(`.${styles.menuContent}`);
    const logo = document.querySelector(`.${styles.logo}`);
    const container = document.querySelector(`.${styles.container}`);

    hamburgerMenu.classList.toggle(styles.animate);
    menuContent.classList.toggle(styles.menuContentShow);

    logo.classList.toggle(styles.iflyLogoLightMode);
    logo.classList.toggle(styles.iflyLogoMenuOpen);
    hamburgerMenu.classList.toggle(styles.hamburgerMenuOpen);
    menuWrapper.classList.toggle(styles.menuWrapperOpen);

    if (menuWrapper.classList.contains(styles.menuWrapperOpen)) {
      const containerStyles = window.getComputedStyle(container);
      const containerWidth = containerStyles.getPropertyValue("width");
      const leftAndRightValue =
        (document.body.clientWidth - parseInt(containerWidth)) / 2;

      menuWrapper.style.position = "fixed";
      menuWrapper.style.top = "32px";
      menuWrapper.style.right = leftAndRightValue + "px";
      logo.style.position = "fixed";
      logo.style.top = "36.4px";
      logo.style.left = leftAndRightValue + "px";
    } else {
      menuWrapper.style.position = "relative";
      menuWrapper.style.top = "0";
      menuWrapper.style.right = "0";

      logo.style.position = "relative";
      logo.style.top = "2.5px";
      logo.style.left = "0";
    }
  };
  return (
    <div className={styles.container}>
      <div
        onClick={handleLogoClick}
        className={
          isLightMode
            ? `${styles.logo} ${styles.iflyLogoLightMode}`
            : `${styles.logo}`
        }
      >
        {iFlyLogo}
      </div>
      <div
        onClick={() => {
          toggleMenu();
        }}
        className={`${styles.menuWrapper} ${
          navClass ? styles[navClasses[1]] : ""
        }`}
      >
        <div
          className={`${styles.hamburgerMenu} ${
            navClass ? styles[navClasses[0]] : ""
          } ${inLandingPage ? styles.hamburgerMenuLight : ""}`}
        ></div>
      </div>
      <div className={styles.menuContent}>
        <div
          className={
            isLightMode
              ? `${styles.navbarItemsWrapper} ${styles.navbarItemsLightMode}`
              : `${styles.navbarItemsWrapper}`
          }
        >
          <div onClick={toMainPage}>Главная</div>
          <div onClick={toAboutUs}>O нас</div>
          <div onClick={toMyPersonalRoom}>Бронирование</div>
          <div onClick={toAirCompanies}>Aвиалинии</div>
          <div>Контакты</div>
        </div>
        <div
          className={
            isLightMode
              ? `${styles.rightSide} ${styles.buttonLightMode}`
              : `${styles.rightSide}`
          }
        >
          <button className={styles.langSwitch}>RO</button>
        </div>
      </div>
    </div>
  );
}
