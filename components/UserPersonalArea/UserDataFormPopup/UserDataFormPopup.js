import React from "react";
import stylesPopup from "./UserDataFormPopup.module.scss";
import styles from "../../PassengerInformationPage/PassengerInformationForm/PassengerInformationForm.module.scss";
import Form from "../Form/Form";

import { i18n } from "../../../i18n";

export default function UserDataFormPopup({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`personalRoom:${key}`);
  };

  return (
    <section className={stylesPopup.container}>
      <div className={stylesPopup.title}>
        {getLanguageSpecificContent("UserDataFormPopup-title")}
      </div>
      <Form t={t} />
    </section>
  );
}
