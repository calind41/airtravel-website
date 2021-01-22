import React, { useState } from "react";
import styles from "./UserPersonalData.module.scss";
import Form from "../Form/Form";

// import { i18n } from "../../../i18n";

export default function UserPersonalData({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`personalRoom:${key}`);
  };

  const [forms, setForms] = useState([
    <div key='0' className={styles.passengerF}>
      <div>1. {getLanguageSpecificContent("UserPersonalData-t1")}</div>
      <Form
        fName='Calin'
        lName='Calin'
        birthday='22/02/2020'
        nationalityD='Moldova, Republic Of'
        genderD='male'
        serialNrD='123456789'
        serialNrReleaseDateD='20/02/2020'
        serialNrExpireDateD='22/02/2020'
        update={true}
      />
    </div>,
  ]);

  const addPassenger = () => {
    setForms([
      ...forms,
      <div key={forms.length} className={styles.passengerF}>
        <div>
          {forms.length + 1}.{" "}
          {getLanguageSpecificContent("UserPersonalData-t1")}
        </div>
        <Form update={true} additionalPassenger={true} />
      </div>,
    ]);
  };
  return (
    <section className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          {getLanguageSpecificContent("UserPersonalData-title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("UserPersonalData-subtitle")}
        </div>
        <div onClick={addPassenger} className={styles.addPassengerButton}>
          {getLanguageSpecificContent("UserPersonalData-button")}
        </div>
      </div>
      <div className={styles.right}>{forms}</div>
    </section>
  );
}
