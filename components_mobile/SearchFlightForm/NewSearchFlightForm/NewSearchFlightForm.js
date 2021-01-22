import React from "react";
import styles from "./NewSearchFlightForm.module.scss";
import MobileHeader from "../../../components/HomePage/Header/MobileHeader/MobileHeader";
import Form from "./Form/Form";

import { i18n } from "../../../i18n";

export default function NewSearchFlightForm() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`searchFlightFormMobile:${key}`);
  };

  return (
    <>
      <MobileHeader />
      <div className={styles.container}>
        <header>{getLanguageSpecificContent("header")}</header>
        <div className={styles.formType}>
          <button className={styles.selectedButton}>
            {getLanguageSpecificContent("selectableButton")}
          </button>
          <button>{getLanguageSpecificContent("selectableButton2")}</button>
        </div>
        <Form />
      </div>
    </>
  );
}
