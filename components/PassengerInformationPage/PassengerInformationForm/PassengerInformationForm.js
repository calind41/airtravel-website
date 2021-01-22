import React, { useState, useEffect } from "react";
import styles from "./PassengerInformationForm.module.scss";
import stylesPopup from "../../UserPersonalArea/UserDataFormPopup/UserDataFormPopup.module.scss";
import stylesUPD from "../../UserPersonalArea/UserPersonalData/UserPersonalData.module.scss";
import { warningSvg, helpIconSvg } from "./svg";
import Dropdown from "react-dropdown";

import { i18n } from "../../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`booking:${key}`);
};

export default function PassengerInformationForm({ t }) {
  const [forms, setForms] = useState([<Form key={0} />]);

  const addPassengerForm = () => {
    const style = {
      marginLeft: "23px",
      marginTop: "3px",
      fontSize: "13px",
      borderTop: "1px solid #DFE3EB",
      paddingTop: "35px",
      width: "763px",
    };
    const newForm = (
      <div key={forms.length}>
        <div className={styles.aditionalPassengerAdded}>
          <span>
            {forms.length + 1}.{" "}
            <span>
              {getLanguageSpecificContent(
                "PassengerInformationForm-passengerText"
              )}
            </span>
          </span>
        </div>
        <Form key={forms.length} />
      </div>
    );
    setForms([...forms, newForm]);
  };
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {getLanguageSpecificContent("PassengerInformationForm-heading")}
      </div>
      <div className={styles.warning}>
        <span>{warningSvg}</span>
        <span>
          {getLanguageSpecificContent("PassengerInformationForm-warningText")}
        </span>
      </div>

      {forms}
      <div onClick={addPassengerForm} className={styles.addPassengerBtn}>
        {getLanguageSpecificContent("PassengerInformationForm-addPassenger")}
      </div>
    </section>
  );
}

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [serialNr, setSerialNr] = useState("");
  const [serialNrReleaseDate, setSerialNrReleaseDate] = useState("");
  const [serialNrExpireDate, setSerialNrExpireDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [dateFormat, setDateFormat] = useState("");

  useEffect(() => {
    const val = getLanguageSpecificContent("dateFormat");
    setDateFormat(val);
  }, []);

  const showValues = () => {};

  const receiveFirstName = (value) => {
    setFirstName(value);
  };
  const receiveLastName = (value) => {
    setLastName(value);
  };
  const receiveDateOfBirth = (value) => {
    setDateOfBirth(value);
  };
  const receiveSerialNr = (value) => {
    setSerialNr(value);
  };
  const receiveSerialNrReleaseDate = (value) => {
    setSerialNrReleaseDate(value);
  };
  const receiveSerialNrExpireDate = (value) => {
    setSerialNrExpireDate(value);
  };
  const receiveNationality = (value) => {
    setNationality(value);
  };
  const receiveGender = (value) => {
    setGender(value);
  };
  return (
    <form onClick={showValues} className={`${styles.form} `}>
      <div className={`${styles.inputs} `}>
        <div className={`${styles.firstNameC} `}>
          <InputText
            placeholderClassName='firstNamePlaceholder'
            placeholder={getLanguageSpecificContent("Form-input1-placeholder")}
            passValue={receiveFirstName}
            inputType='name'
            id='firstName'
          />
        </div>
        <div className={`${styles.lastNameC} `}>
          <InputText
            placeholderClassName='lastNamePlaceholder'
            placeholder={getLanguageSpecificContent("Form-input2-placeholder")}
            passValue={receiveLastName}
            inputType='name'
            id='lastName'
          />
        </div>
        <div className={`${styles.dateOfBirthC} `}>
          <InputText
            placeholderClassName='dateOfBirthPlaceholder'
            placeholder={getLanguageSpecificContent("Form-input3-placeholder")}
            passValue={receiveDateOfBirth}
            inputType='birthday'
            id='birthday'
            inputPlaceholder={dateFormat}
          />
        </div>
        <div className={`${styles.selectWrapper} `}>
          <div className={`${styles.nationalityC} `}>
            <CustomSelect
              placeholder={getLanguageSpecificContent(
                "Form-customSelect-placeholder"
              )}
              values={null}
              type='nationality'
              passValue={receiveNationality}
              id='nationality'
            />
          </div>
          <div className={`${styles.genderC} `}>
            <CustomSelect
              placeholder={getLanguageSpecificContent(
                "Form-customSelect-placeholder2"
              )}
              values={null}
              type='gender'
              passValue={receiveGender}
              id='gender'
            />
          </div>
        </div>

        <div className={`${styles.serialNrInputC} `}>
          <InputText
            placeholderClassName='serialNumberPlaceholder'
            placeholder={getLanguageSpecificContent("Form-input4-placeholder")}
            passValue={receiveSerialNr}
            inputType='serialNr'
            id='serialNr'
          />
        </div>
        <div className={`${styles.serialNrReleaseDateC} `}>
          <InputText
            placeholderClassName='serialNrReleaseDatePlaceholder'
            placeholder={getLanguageSpecificContent("Form-input5-placeholder")}
            passValue={receiveSerialNrReleaseDate}
            inputType='serialNrReleaseDate'
            id='serialNrReleaseDate'
            inputPlaceholder={dateFormat}
          />
        </div>
        <div className={`${styles.serialNrExpireDateC} `}>
          <InputText
            placeholderClassName='serialNrExpireDatePlaceholder'
            placeholder={getLanguageSpecificContent("Form-input6-placeholder")}
            passValue={receiveSerialNrExpireDate}
            inputType='serialNrExpireDate'
            id='serialNrExpireDate'
            inputPlaceholder={dateFormat}
          />
        </div>
      </div>
    </form>
  );
};

export const InputText = ({
  placeholderClassName,
  placeholder,
  inputPlaceholder,
  passValue,
  inputType,
  defaultValue,
  id,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");

  const [prevInputValueLen, setPrevInputValueLen] = useState(0);
  const [inputKeyCode, setInputKeyCode] = useState(50);

  const [isValidName, setIsValidName] = useState(true);

  const onChangeInput = (evt) => {
    const target = evt.target.value;
    const len = target.length;
    switch (inputType) {
      case "birthday":
      case "serialNrReleaseDate":
      case "serialNrExpireDate":
        setDateInput(evt, target, len);
        break;
      case "serialNr":
        setSerialNumber(evt, target, len);
        passValue(evt.target.value);

        break;
      case "name":
        setNameInput(evt);
        passValue(evt.target.value);
    }
  };

  const setNameInput = (evt) => {
    if (!isValidName) return;
    setInputValue(evt.target.value);
  };
  const setSerialNumber = (evt, target, len) => {
    setInputValue(evt.target.value);
  };

  const setDateInput = (evt, target, len) => {
    if (len === 11) return;

    // Prevent having day and month values of `00`
    if (target[1] === "0" && target[0] === "0") return;
    if (target[4] === "0" && target[3] === "0") return;

    // Prevent number of days greater than 30
    if (parseInt(target[0]) > 3) return;
    if (parseInt(target[0]) === 3 && parseInt(target[1]) > 1) return;

    // Prevent month  to have a value of  12+
    if (parseInt(target[3]) > 1) return;
    if (parseInt(target[3]) === 1 && parseInt(target[4]) > 2) return;

    // Prevent year to start with digit 0 or with digit greater than 2
    if (parseInt(target[6]) === 0 || parseInt(target[6]) > 2) return;

    // Prevent invalid year digits
    const now = "" + new Date().getFullYear();

    if (inputType === "birthday") {
      // 2nd year digit
      if (parseInt(target[6]) === 2 && parseInt(target[7]) > parseInt(now[1]))
        return;
      // 3rd year digit
      if (
        parseInt(target[7]) === parseInt(now[1]) &&
        parseInt(target[8]) > parseInt(now[2])
      )
        return;
      // 4th year digit
      if (
        parseInt(target[7]) === 0 &&
        parseInt(target[8]) === parseInt(now[2]) &&
        parseInt(target[9]) > parseInt(now[3])
      )
        return;
    }

    // Prevent space characters to be introduced
    if (inputKeyCode === 32) {
      setInputKeyCode(50);
      return;
    }

    // If user pressed key that is not a digit do not add it to input
    if (isNaN(Number(target.substr(len - 1, len)))) {
      setInputValue(target.substr(0, len - 1));
      passValue(target.substr(0, len - 1));
      return;
    }

    // Case when you type a digit in place of a pre-planned `/` char
    if (target.length === 3 || target.length === 6) {
      let newValue;
      if (parseInt(target[len - 1]) > 1) {
        newValue = target.substr(0, len - 1) + "/";
        setInputValue(newValue);
        passValue(newValue);

        return;
      }
      newValue = target.substr(0, len - 1) + "/" + target.substr(len - 1, len);
      setInputValue(newValue);
      passValue(newValue);
      return;
    }
    // Add pre-planned `/` to match desired format [dd/mm/yyyy]
    if ((len === 2 || len === 5) && prevInputValueLen <= len) {
      setInputValue(evt.target.value + "/");
      passValue(evt.target.value + "/");
      setPrevInputValueLen(len + 1);
    } else {
      setInputValue(evt.target.value);
      passValue(evt.target.value);
      setPrevInputValueLen(len);
    }
  };

  const onKeyDown = (evt) => {
    if (inputType === "name") {
      if (
        (evt.keyCode >= 65 && evt.keyCode <= 90) ||
        evt.keyCode === 8 ||
        evt.keyCode === 32
      ) {
        // letters + backspace + space
        setIsValidName(true);
      } else {
        setIsValidName(false);
      }
    } else {
      // prevent space chars for other inputs
      if (evt.keyCode === 32) {
        setInputKeyCode(evt.keyCode);
      }
    }
  };

  return (
    <label>
      <input
        type='text'
        id={id}
        onChange={(evt) => onChangeInput(evt)}
        // onFocus={onFocusAddPhoneNrPrefix}
        // onBlur={(evt) => onBlurPhoneInputHidePrefix(evt)}
        onKeyDown={onKeyDown}
        value={inputValue}
        autoComplete='off'
        required
        spellCheck='false'
        placeholder={inputPlaceholder}
      />
      <span
        className={`${styles[placeholderClassName]} ${stylesPopup[placeholderClassName]} ${stylesUPD[placeholderClassName]}`}
      >
        {placeholder}
      </span>
    </label>
  );
};

export const CustomSelect = ({
  type,
  width,
  passValue,
  defaultOption,
  placeholder,
  id,
}) => {
  let options, defaultO;
  if (type === "nationality") {
    options = [
      {
        key: { id: "0" },
        value: `${getLanguageSpecificContent("Form-customSelect-placeholder")}`,
        label: `${getLanguageSpecificContent("Form-customSelect-placeholder")}`,
      },

      {
        label: (
          <span>
            <span className='flag-icon flag-icon-me'></span>
            <span>Montenegro</span>
          </span>
        ),
        value: "1",

        className: `${styles.flagClassName}`,
      },
      {
        label: (
          <span>
            <span className='flag-icon flag-icon-md'></span>{" "}
            <span>Moldova, Republic Of</span>
          </span>
        ),
        value: "2",

        className: `${styles.flagClassName}`,
      },
      {
        label: (
          <span>
            <span className='flag-icon flag-icon-mc'></span>
            <span> Monaco</span>
          </span>
        ),
        value: "3",

        className: `${styles.flagClassName}`,
      },
    ];
    if (defaultOption === "") {
      defaultO = options[0];
    } else {
      defaultO = defaultOption;
    }
  } else if (type === "gender") {
    options = [
      {
        label: `${getLanguageSpecificContent(
          "Form-customSelect-placeholder2"
        )}`,
        value: `${getLanguageSpecificContent(
          "Form-customSelect-placeholder2"
        )}`,
      },
      {
        label: `${getLanguageSpecificContent("gender-male")}`,
        value: `${getLanguageSpecificContent("gender-male")}`,
      },
      {
        label: `${getLanguageSpecificContent("gender-female")}`,
        value: `${getLanguageSpecificContent("gender-female")}`,
      },
    ];
    if (defaultOption === "") {
      defaultO = options[0];
    } else {
      defaultO = placeholder;
    }
  }

  const _onSelect = (option) => {
    passValue(option);
  };

  const classNames = [
    type === "nationality"
      ? `${styles.myClassName} ${stylesPopup.myClassName} ${stylesUPD.myClassName}`
      : `${styles.myClassName} ${styles.genderClassName} ${stylesPopup.myClassName} ${stylesPopup.genderClassName} ${stylesUPD.myClassName} ${stylesUPD.genderClassName}`,
    type === "nationality"
      ? `${styles.myControlClassName} ${stylesPopup.myControlClassName} ${stylesUPD.myControlClassName}`
      : `${styles.myControlClassName} ${styles.genderControlClassName} ${stylesPopup.myControlClassName} ${stylesPopup.genderControlClassName} ${stylesUPD.myControlClassName} ${stylesUPD.genderControlClassName}`,
    `${styles.myPlaceholderClassName} ${stylesPopup.myPlaceholderClassName} ${stylesUPD.myPlaceholderClassName}`,

    type === "nationality"
      ? `${styles.myMenuClassName} ${stylesPopup.myMenuClassName} ${stylesUPD.myMenuClassName}`
      : `${styles.myMenuClassName} ${styles.genderMenuClassName} ${stylesPopup.myMenuClassName} ${stylesPopup.genderMenuClassName} ${stylesUPD.myMenuClassName} ${stylesUPD.genderMenuClassName}`,
    `${styles.myArrowClassName} ${stylesPopup.myArrowClassName} ${stylesUPD.myArrowClassName}`,
  ];
  return (
    <div>
      <Dropdown
        className={classNames[0]}
        controlClassName={classNames[1]}
        placeholderClassName={classNames[2]}
        menuClassName={classNames[3]}
        arrowClassName={classNames[4]}
        options={options}
        onChange={(option) => _onSelect(option)}
        value={defaultO}
        placeholder={`${getLanguageSpecificContent(
          "Form-customSelect-placeholder"
        )}`}
      />
    </div>
  );
};
