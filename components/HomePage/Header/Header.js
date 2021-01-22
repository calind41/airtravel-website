import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Header.module.css";
import menuItemStyles from "./MenuItems/MenuItems.module.css";
import MenuItems from "./MenuItems/MenuItems";
import MobileHeader from "./MobileHeader/MobileHeader";
import { i18n } from "../../../i18n";

export default function Header({ t, position, mode }) {
  const [isOpenServiceDropdown, setIsOpenServiceDropdown] = useState(false);
  const [
    isOpenCustomerSupportDropdown,
    setIsOpenCustomerSupportDropdown,
  ] = useState(false);
  const [isOpenLanguageDropdown, setIsOpenLanguageDropdown] = useState(false);
  const [isRenderedMobileHeader, setIsRenderedMobileHeader] = useState(false);

  useEffect(() => {
    const outsideClickHandler = (evt) => {
      if (window.innerWidth <= 991) return;
      if (!evt.target.classList.contains("exclude")) {
        setIsOpenServiceDropdown(false);
        setIsOpenCustomerSupportDropdown(false);
        document
          .querySelector("#arrowSvgId1")
          .classList.remove(styles.rotate180deg);
        document
          .querySelector("#arrowSvgId2")
          .classList.remove(styles.rotate180deg);

        setIsOpenLanguageDropdown(false);
      }
    };
    const onResizeWindow = () => {
      if (window.innerWidth <= 991) {
        setIsRenderedMobileHeader(true);
      } else {
        setIsRenderedMobileHeader(false);
      }
    };
    window.addEventListener("resize", onResizeWindow);
    window.addEventListener("click", outsideClickHandler);

    onResizeWindow();
    return () => {
      window.removeEventListener("click", outsideClickHandler);
      window.removeEventListener("resize", onResizeWindow);
    };
  }, []);

  const toggleMenuItems = () => {
    const menuItemsElement = document.querySelector("#menuItemsId");

    if (menuItemsElement.classList.contains(menuItemStyles.opacityZero)) {
      menuItemsElement.classList.remove(menuItemStyles.opacityZero);
      menuItemsElement.classList.add(menuItemStyles.opacityOne);
    } else {
      menuItemsElement.classList.remove(menuItemStyles.opacityOne);
      menuItemsElement.classList.add(menuItemStyles.opacityZero);
    }
  };

  const onArrowClickHandler = (id) => {
    if (id === "arrowSvgId1") {
      setIsOpenServiceDropdown((prevValue) => !prevValue);
      checkOtherDropdownsIfOpen("services");
      document.querySelector(`#${id}`).classList.toggle(styles.rotate180deg);
    } else if (id === "arrowSvgId2") {
      setIsOpenCustomerSupportDropdown((prevValue) => !prevValue);
      checkOtherDropdownsIfOpen("customerSupport");

      document.querySelector(`#${id}`).classList.toggle(styles.rotate180deg);
    } else {
      setIsOpenLanguageDropdown((prevValue) => !prevValue);
      checkOtherDropdownsIfOpen("all");
    }
  };
  const checkOtherDropdownsIfOpen = (dropdownType) => {
    if (dropdownType === "all") {
      checkCustomerSupport();
      checkServices();
    } else if (dropdownType === "services") {
      checkCustomerSupport();
      checkLanguage();
    } else {
      checkServices();
      checkLanguage();
    }
  };
  const checkServices = () => {
    if (isOpenServiceDropdown) {
      setIsOpenServiceDropdown(false);
      document
        .querySelector("#arrowSvgId1")
        .classList.toggle(styles.rotate180deg);
    }
  };
  const checkCustomerSupport = () => {
    if (isOpenCustomerSupportDropdown) {
      setIsOpenCustomerSupportDropdown(false);
      document
        .querySelector("#arrowSvgId2")
        .classList.toggle(styles.rotate180deg);
    }
  };
  const checkLanguage = () => {
    if (isOpenLanguageDropdown) {
      setIsOpenLanguageDropdown(false);
    }
  };

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang, (err, t) => {
      if (err) return console.log("something went wrong loading", err);

      // t("key");
    });
  };
  if (isRenderedMobileHeader) {
    return <MobileHeader mode='light' />;
  }
  return (
    <header
      className={
        mode === "light"
          ? `${styles.headerC} ${styles.headerCLight}`
          : `${styles.headerC}`
      }
      style={position ? { position } : {}}
    >
      {/* menu items overlay when hamburger menu is active (has class `is-active`) */}
      <div className={styles.logo}>{logo}</div>
      <ul>
        <li className={styles.appleLogo}>{appleLogo}</li>
        <li className={styles.playStoreLogo}>{playStoreLogo}</li>
        <li className={styles.bonusPts}>
          {/* <a href='#'>{language === "ru" ? "Бонусы" : "Bonus Points"}</a> */}
          <a href='#'>{t("common:Header-bonusPts")}</a>
        </li>
        <li className={styles.services}>
          <span
            className='exclude'
            onClick={onArrowClickHandler.bind(null, "arrowSvgId1")}
          >
            <span className='exclude'>{t("common:Header-services")}</span>
            {renderArrowSvg("arrowSvgId1")}
          </span>

          {isOpenServiceDropdown ? (
            <div className={styles.serviceDropdown}>
              <div>{t("common:serviceDropdown-giftCard")}</div>
              <div>{t("common:serviceDropdown-insurance")}</div>
              <div>{t("common:serviceDropdown-seaTravel")}</div>
            </div>
          ) : null}
        </li>
        <li className={styles.customerSupport}>
          <span
            className='exclude'
            onClick={onArrowClickHandler.bind(null, "arrowSvgId2")}
          >
            <span className='exclude'>
              {t("common:Header-customerSupport")}
            </span>
            {renderArrowSvg("arrowSvgId2")}
          </span>
          {isOpenCustomerSupportDropdown ? (
            <div className={styles.customerSupportDropdown}>
              <div>FAQ</div>
              <div>{t("common:customerSupportDropdown-contactSupport")}</div>
              <div>+44(330)445-0075</div>
              <div>{t("common:customerSupportDropdown-onlineCall")}</div>
              <div>Skype</div>
            </div>
          ) : null}
        </li>
        <li className={styles.myBooking}>
          <span> {t("common:Header-myBooking")}</span>
        </li>
        <li className={styles.hBtn}>
          <button>{t("common:Header-customerProfile")}</button>
        </li>
        <li className={styles.language}>
          <span
            onClick={onArrowClickHandler.bind(null, "")}
            className='exclude'
          >
            {languageIcon}
          </span>
          {isOpenLanguageDropdown ? (
            <div className={styles.languageDropdown}>
              <div onClick={setLanguage.bind(this, "ro")}>Romana</div>
              <div onClick={setLanguage.bind(this, "ru")}>Русский</div>
            </div>
          ) : null}
        </li>
      </ul>
    </header>
  );
}

export const logo = (
  <svg
    width='40'
    height='40'
    viewBox='0 0 48 48'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs></defs>
    <g fill='none'>
      <path
        fill='#000'
        d='M24 .5a11 11 0 0110.9 10H44a4 4 0 014 4V44a4 4 0 01-4 4H4a4 4 0 01-4-4V14.5a4 4 0 014-4h9.1A11 11 0 0124 .5zm5 10a5 5 0 00-10 0h10z'
      ></path>
      <path
        fill='#FFF'
        d='M44.9 41.6c.6.4 1 1 1 1.7a1.8 1.8 0 01-2 1.8 1.8 1.8 0 01-1.8-1.8 1.9 1.9 0 012.8-1.7zM18.3 26.2c3.5 0 4.8 1.7 4.8 5.5 0 2.4-.4 4-2.1 5l2.8 8.3h-3.1l-2.5-7.7h-1.7V45h-3V26.2h4.8zm17.4 0c3.4 0 4.8 1.8 4.8 5.7 0 3.8-1.3 5.8-4.8 5.8h-1.8V45h-3V26.2h4.8zm-23.8 0v2.7H8.8V45h-3V29H2.7v-2.7h9.2zm16.6 0V45h-3V26.2h3zm16.9 0v13.5h-2.8V26.2h2.8zM35.7 29H34V35h1.8c1.6 0 1.8-1.4 1.8-3 0-1.7-.2-3.1-1.8-3.1zm-17.3 0h-1.9v5.7h1.9c1.5 0 1.8-1.3 1.8-2.8 0-1.6-.3-3-1.8-3zM7 14c.7.8.7 2.2.7 4v.3c0 1.9 0 3.3-.7 4.2a2.4 2.4 0 01-2 .8 2.4 2.4 0 01-1.9-.8c-.6-.8-.7-2-.7-3.6v-1.3c0-1.6 0-2.8.7-3.6a2.4 2.4 0 012-.8A2.4 2.4 0 017 14zm36-.8c.7 0 1.4.3 1.9.8.7.8.7 2.2.7 4v.3c0 1.9 0 3.3-.7 4.2a2.6 2.6 0 01-3.9 0c-.7-.8-.7-2.2-.7-4v-.2c0-2 0-3.4.7-4.3a2.6 2.6 0 012-.8zm-32.4.1l2.3 5.9v-5.9h1.6v9.9H13l-2.3-5.9v5.9H9.2v-9.9h1.4zm9.7 0v1.4h-2.6v2.8h2.2V19h-2.2v2.9h2.6v1.4H16v-9.9h4.2zm8.5 0v1.4h-1.6v8.5h-1.6v-8.5H24v-1.4h4.8zm2.6 0l1 7.5 1.4-7.5h1.7l1.4 7.5 1-7.5h1.6l-1.8 9.9H36l-1.4-7.5-1.4 7.5h-1.6l-1.9-9.9h1.7zM4.4 15c-.4.4-.4 1.3-.4 3v.3c0 1.8 0 2.7.3 3.2a.8.8 0 00.8.4c.3 0 .5-.1.7-.4.3-.5.3-1.4.3-3.3 0-1.8 0-2.7-.3-3.2a.8.8 0 00-.7-.4.8.8 0 00-.8.4zm38.6-.4a.8.8 0 00-.8.4c-.3.5-.3 1.4-.3 3.3 0 1.8 0 2.7.3 3.2.2.3.5.4.8.4.3 0 .5-.1.7-.4.3-.5.3-1.4.3-3.3 0-1.8 0-2.7-.3-3.2a.8.8 0 00-.7-.4zM32.2 8.4l1-.2-1 3.2L30 9l1-.2A7.3 7.3 0 0016.8 10a.7.7 0 01-1.3-.2 8.7 8.7 0 0116.7-1.4z'
      ></path>
    </g>
  </svg>
);

const appleLogo = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
  >
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M15.9 11.4c0 2.2 2 2.9 2 2.9l-1 2c-.7.8-1.3 1.7-2.3 1.7-1 0-1.3-.6-2.4-.6-1.1 0-1.5
            .6-2.4.6-1 0-1.7-1-2.3-1.8-1.2-1.7-2.2-4.9-.9-7 .6-1 1.8-1.8 3-1.8 1 0 1.8.6 2.4.6.6 0
             1.7-.7 2.8-.6.5 0 1.8.2 2.7 1.4-.1 0-1.6.9-1.6 2.6zM14 6.2c-.6.6-1.4 1-2.2 1a3 3 0 0 
             1 .8-2.1c.5-.6 1.4-1 2.1-1.1a3 3 0 0 1-.7 2.2z'
    ></path>
  </svg>
);

const playStoreLogo = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
  >
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M6 5.7l6.2 6.2v.2L6 18.3a1 1 0 0 1-.3-.7V6.4c0-.3
             0-.5.2-.7zm7.2 6.2l2.1-2 2.5 1.4c.7.4.7 1 0 1.4l-2.4 1.4-2.2-2v-.2zm-6.8 6.9l6.3-6.3 2.1 
             2.1-7.3 4.2c-.5.3-.8.2-1 0zm0-13.6A.6.6 0 0 1 7 5c.2 0 .4 0 .6.2l7.3 4.2-2 2-6.4-6.2z'
    ></path>
  </svg>
);

function renderArrowSvg(id) {
  return (
    <svg
      id={id}
      className={`_7TN9i _1rcak exclude ${styles.arrowSvgClass}`}
      width='10'
      height='6'
      viewBox='0 0 24 14.8'
      fill='#222'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='#fff'>
        <path
          className='exclude'
          d='M2.8,0L12,9.2L21.2,0L24,2.8l-12,12L0,2.8L2.8,0z'
        ></path>
      </g>
    </svg>
  );
}

const languageIcon = (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width='20px'
    height='20px'
    viewBox='0 0 512 512'
    className='_3y4XN exclude'
  >
    <circle
      className='exclude'
      fill='#F0F0F0'
      cx='256'
      cy='256'
      r='256'
    ></circle>
    <g>
      <path
        className='exclude'
        fill='#0052B4'
        d='M52.92,100.142c-20.109,26.163-35.272,56.318-44.101,89.077h133.178L52.92,100.142z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M503.181,189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075,89.076H503.181z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M8.819,322.784c8.83,32.758,23.993,62.913,44.101,89.075l89.074-89.075L8.819,322.784L8.819,322.784z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M411.858,52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177L411.858,52.921z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M100.142,459.079c26.163,20.109,56.318,35.272,89.076,44.102V370.005L100.142,459.079z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M322.783,503.181c32.758-8.83,62.913-23.993,89.075-44.101l-89.075-89.075V503.181z'
      ></path>
      <path
        className='exclude'
        fill='#0052B4'
        d='M370.005,322.784l89.075,89.076c20.108-26.162,35.272-56.318,44.101-89.076H370.005z'
      ></path>
    </g>
    <g>
      <path
        className='exclude'
        fill='#D80027'
        d='M509.833,222.609h-220.44h-0.001V2.167C278.461,0.744,267.317,0,256,0c-11.319,0-22.461,0.744-33.391,2.167v220.44v0.001H2.167C0.744,233.539,0,244.683,0,256c0,11.319,0.744,22.461,2.167,33.391h220.44h0.001v220.442C233.539,511.256,244.681,512,256,512c11.317,0,22.461-0.743,33.391-2.167v-220.44v-0.001h220.442C511.256,278.461,512,267.319,512,256C512,244.683,511.256,233.539,509.833,222.609z'
      ></path>
      <path
        className='exclude'
        fill='#D80027'
        d='M322.783,322.784L322.783,322.784L437.019,437.02c5.254-5.252,10.266-10.743,15.048-16.435l-97.802-97.802h-31.482V322.784z'
      ></path>
      <path
        className='exclude'
        fill='#D80027'
        d='M189.217,322.784h-0.002L74.98,437.019c5.252,5.254,10.743,10.266,16.435,15.048l97.802-97.804V322.784z'
      ></path>
      <path
        className='exclude'
        fill='#D80027'
        d='M189.217,189.219v-0.002L74.981,74.98c-5.254,5.252-10.266,10.743-15.048,16.435l97.803,97.803H189.217z'
      ></path>
      <path
        className='exclude'
        fill='#D80027'
        d='M322.783,189.219L322.783,189.219L437.02,74.981c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802,97.803V189.219z'
      ></path>
    </g>
  </svg>
);

const authIcon = (
  <svg
    className={`${styles.authIcon} _1ofl7`}
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='#fff'
  >
    <path
      fillRule='evenodd'
      d='M7.09 12.59L8.5 14l5-5-5-5-1.41 1.41L9.67 8H0v2h9.67l-2.58 2.59zM16 0H2C.89 0 0 .9 0 2v4h2V2h14v14H2v-4H0v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z'
    ></path>
  </svg>
);
