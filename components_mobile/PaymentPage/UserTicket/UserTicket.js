import React, { useState } from "react";
import styles from "./UserTicket.module.scss";
import {
  airplaneSvg,
  threeLinesSvg,
  personalBaggageSvg,
  carryOnBaggageSvg,
  registeredBaggageSvg,
  arrowSvg,
} from "./svg";
import { i18n } from "../../../i18n";

export default function UserTicket() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`payment:${key}`);
  };

  const [renderedUserInfo, setRenderedUserInfo] = useState(false);

  const renderUserInfo = () => {
    setRenderedUserInfo(!renderedUserInfo);
    const arrow = document.querySelector("#arrowUserInfo");
    arrow.classList.toggle(styles.rotateArrow);
  };
  return (
    <section className={styles.container}>
      <header>
        <div className={styles.destination}>
          <div className={styles.from}>
            <div>KIV</div>
            <div>Кишинев</div>
          </div>
          <div className={styles.lines}>
            <span>{threeLinesSvg}</span>
            <span>{airplaneSvg}</span>
            <span>{threeLinesSvg}</span>
          </div>
          <div className={styles.to}>
            <div>IST</div>
            <div>Стамбул</div>
          </div>
        </div>
      </header>
      <button onClick={renderUserInfo} className={styles.flightDetailsBtn}>
        {getLanguageSpecificContent("UserTicket-moreAboutFlight")}
      </button>

      <main className={styles.userInfo}>
        <div className={styles.name}>
          <div>Ivan Ivanov</div>
          <div id='arrowUserInfo' onClick={renderUserInfo}>
            {arrowSvg}
          </div>
        </div>
        {renderedUserInfo ? (
          <div className={styles.wrapper}>
            <div className={styles.nationality}>
              <div>{getLanguageSpecificContent("UserTicket-nationality")}</div>
              <div>Молдова</div>
            </div>
            <div className={styles.passportNr}>
              <div>{getLanguageSpecificContent("UserTicket-passportNr")}</div>
              <div>11123456789</div>
            </div>
            <div className={styles.validity}>
              <div>{getLanguageSpecificContent("UserTicket-validity")}</div>
              <div>14.12.2023</div>
            </div>
          </div>
        ) : null}
      </main>
      <footer className={styles.baggageInfo}>
        <div className={styles.baggageTypes}>
          <div>
            <span>{personalBaggageSvg}</span>
            <span>
              1x {getLanguageSpecificContent("UserTicket-personalThing")}
            </span>
          </div>
          <div>
            <span>{carryOnBaggageSvg}</span>
            <span>
              1x {getLanguageSpecificContent("UserTicket-carryOnBaggage")}
            </span>
          </div>
          <div>
            <span>{registeredBaggageSvg}</span>
            <span>
              0x {getLanguageSpecificContent("UserTicket-registeredBaggage")}
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
