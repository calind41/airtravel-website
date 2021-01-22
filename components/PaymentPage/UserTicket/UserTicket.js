import React from "react";
import styles from "./UserTicket.module.scss";
import {
  airplaneSvg,
  threeLinesSvg,
  personalBaggageSvg,
  carryOnBaggageSvg,
  registeredBaggageSvg,
} from "./svg";

// import { i18n } from "../../../i18n";

export default function UserTicket({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`payment:${key}`);
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
        <button>
          {getLanguageSpecificContent("UserTicket-moreAboutFlight")}
        </button>
      </header>
      <main className={styles.userInfo}>
        <div className={styles.name}>
          <div>{getLanguageSpecificContent("UserTicket-name")}</div>
          <div>Ivan Ivanov</div>
        </div>
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
      </main>
      <footer className={styles.baggageInfo}>
        <div className={styles.title}>
          {getLanguageSpecificContent("UserTicket-baggage")}
        </div>
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
