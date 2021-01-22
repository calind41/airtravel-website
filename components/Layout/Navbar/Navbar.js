import React from "react";
import styles from "./Navbar.module.scss";
import { iFlyLogo } from "./svg";
import { useRouter } from "next/router";

export default function Navbar({ mode }) {
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
        {/* <span className={styles.logoText}>Ifly.md</span> */}
      </div>
      <div
        className={
          isLightMode
            ? `${styles.navbarItemsWrapper} ${styles.navbarItemsLightMode}`
            : `${styles.navbarItemsWrapper}`
        }
      >
        <div onClick={toMainPage}>Acasă</div>
        {/* <div onClick={toMainPage}>Главная</div> */}
        {/* <div onClick={toAboutUs}>O нас</div> */}
        <div onClick={toAboutUs}>Despre Noi</div>
        {/* <div onClick={toMyPersonalRoom}>Бронирование</div> */}
        <div onClick={toMyPersonalRoom}>Rezervare</div>
        {/* <div onClick={toAirCompanies}>Aвиалинии</div> */}
        <div onClick={toAirCompanies}>Companii Aeriene</div>
        {/* <div>Контакты</div> */}
        <div>Contacte</div>
      </div>
      <div
        className={
          isLightMode
            ? `${styles.rightSide} ${styles.buttonLightMode}`
            : `${styles.rightSide}`
        }
      >
        <button className={styles.phoneNr}>(022) 22 22 22</button>
        <button className={styles.langSwitch}>RU</button>
      </div>
    </div>
  );
}
