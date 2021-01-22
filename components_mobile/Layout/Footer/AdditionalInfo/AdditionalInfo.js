import React from "react";
import styles from "./AdditionalInfo.module.scss";

// import { i18n } from "../../../../i18n";

export default function AdditionalInfo({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`footer:${key}`);
  };
  return (
    <div className={styles.container}>
      <div>{getLanguageSpecificContent("aboutCompany")}</div>
      <div>{getLanguageSpecificContent("partnersProgram")}</div>
      <div>{getLanguageSpecificContent("ads")}</div>
      <div>{getLanguageSpecificContent("pressCenter")}</div>
      <div>{getLanguageSpecificContent("vacancies")}</div>
      <div>{getLanguageSpecificContent("help")}</div>
      <div>{getLanguageSpecificContent("rules")}</div>
      <div className={styles.copyright}>
        {getLanguageSpecificContent("copyRight")}
      </div>
    </div>
  );
}
