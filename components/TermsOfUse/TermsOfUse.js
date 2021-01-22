import React, { useEffect } from "react";
import styles from "./TermsOfUse.module.scss";
import { hamburgerSvg } from "./svg";

// import { i18n } from "../../i18n";

export default function TermsOfUse({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`termsOfUse:${key}`);
  };

  useEffect(() => {
    let rules = document.querySelectorAll(
      "#hamburgerMenu > div:not(:first-child)"
    );
    rules.forEach((r) => r.addEventListener("click", selectRule));

    return () => {
      rules.forEach((r) => r.removeEventListener("click", selectRule));
    };
  }, []);
  const selectRule = (evt) => {
    let rules = document.querySelectorAll(
      "#hamburgerMenu > div:not(:first-child)"
    );
    rules.forEach((r) => r.classList.remove(styles.selected));
    evt.target.classList.add(styles.selected);
  };
  return (
    <section className={styles.container}>
      <main>
        <div className={styles.title}>
          {getLanguageSpecificContent("title")}
        </div>
        <h1>H1 Заголовок</h1>
        <h2>H2 Заголовок</h2>
        <h3>H3 Заголовок</h3>
        <div className={styles.rules}>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </main>
      <aside id='hamburgerMenu' className={styles.navigationContainer}>
        <div className={styles.heading}>
          <div> {hamburgerSvg}</div>
          <span>{getLanguageSpecificContent("menu-heading")}</span>
        </div>
        <div className={styles.selected}>1. Правила пользования</div>
        <div>2. Правила пункт 2</div>
        <div>3. Правила пункт 3</div>
      </aside>
    </section>
  );
}
