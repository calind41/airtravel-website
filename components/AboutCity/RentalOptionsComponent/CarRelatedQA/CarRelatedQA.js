import React from "react";
import styles from "./CarRelatedQA.module.scss";

// import { i18n } from "../../../../i18n";

export default function CarRelatedQA({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`rentalOptions:${key}`);
  };

  return (
    <section className={styles.carRelatedQA}>
      <header>
        <div>{getLanguageSpecificContent("CarRelatedQA-q1")} Venetia</div>
        <div>
          În luna august, până la momentul actual, 38 de utilizatori momondo au
          căutat mașini de închiriat ieftin în Venetia.
        </div>
      </header>
      <main>
        <div className={styles.qaContainer}>
          <div>
            {getLanguageSpecificContent("CarRelatedQA-q2-1")} Venetia{" "}
            {getLanguageSpecificContent("CarRelatedQA-q2-2")}
          </div>
          <div>
            Curățenia mașinilor a fost întotdeauna o prioritate. În plus,
            agențiile de închirieri auto din Venetia au introdus standarde
            îmbunătățite, garantând dezinfectarea în profunzime a vehiculelor și
            siguranța ta. Unele dintre companiile care oferă servicii de
            curățenie în profunzime sunt Alamo, National și Avis. Află mai multe
            despre opțiunile disponibile pentru tine. Pe măsură ce lucrurile se
            schimbă, același lucru se întâmplă și cu regulile. Facem tot ce ne
            stă în putință pentru a-ți oferi cele mai actualizate informații,
            dar asigură-te că verifici și pe site-ul furnizorului.
          </div>
        </div>
        <div className={styles.qaContainer}>
          <div>
            {getLanguageSpecificContent("CarRelatedQA-q3-1")} Venetia{" "}
            {getLanguageSpecificContent("CarRelatedQA-q3-2")}
          </div>
          <div>
            155 lei este costul mediu pentru închirierea unei mașini în timpul
            unui weekend în Venetia în luna septembrie. Cele mai ieftine oferte
            pot ajunge la 155 lei. Ofertele sunt puțin diferite pentru
            închirierea unei mașini timp de o săptămână - începând de la 89 lei,
            cu un preț mediu de 119 lei.
          </div>
        </div>
        <div className={styles.qaContainer}>
          <div>
            {getLanguageSpecificContent("CarRelatedQA-q4-1")} Venetia{" "}
            {getLanguageSpecificContent("CarRelatedQA-q4-2")}
          </div>
          <div>
            Așteaptă-te ca cele mai bune prețuri din Venetia să le găsești la
            SICILY BY CAR . Cu tarife medii de 76 lei/zi, disponibile la locația
            lor de închiriere, SICILY BY CAR este o companie foarte bună de
            rezervări auto.
          </div>
        </div>
        <div className={styles.qaContainer}>
          <div>{getLanguageSpecificContent("CarRelatedQA-q5")} Venetia?</div>
          <div>
            Cele mai multe agenții de închirieri auto din Venetia oferă
            posibilitatea de anulare gratuită. momondo îți va spune întotdeauna
            dacă centrele acestor agenții, precum Alamo, National și Avis, cer
            taxe de anulare călătorilor nevoiți să facă modificări pe ultima
            sută de metri.
          </div>
        </div>
        <div className={styles.qaContainer}>
          <div>{getLanguageSpecificContent("CarRelatedQA-q6")} Venetia?</div>
          <div>
            În Venetia, există 1 locație disponibilă. În aceste spații ce
            aparțin companiei OptimoRent, utilizatorii momondo pot închiria
            mașini cu un preț mediu de 96 lei/zi.
          </div>
        </div>
        <div className={styles.qaContainer}>
          <div>{getLanguageSpecificContent("CarRelatedQA-q7")} Venetia?</div>
          <div>
            Atunci când închiriezi o mașină în Venetia, trebuie să te conformezi
            limitei de viteză de 50 km/h. Limitele maxime pe drumurile de
            suburbie și autostrăzile din Venetia sunt de 90 km/h, respectiv 130
            km/h. Fii atent la semnele de circulație, întrucât aceste limite de
            viteză pot varia în funcție de zona în care te afli.
          </div>
        </div>
      </main>
    </section>
  );
}
