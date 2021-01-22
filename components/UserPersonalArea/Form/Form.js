import React, { useState } from "react";
import stylesPopup from "../UserDataFormPopup/UserDataFormPopup.module.scss";
import stylesPassengerInformationForm from "../../PassengerInformationPage/PassengerInformationForm/PassengerInformationForm.module.scss";
import stylesUPD from "../UserPersonalData/UserPersonalData.module.scss";

import {
  InputText,
  CustomSelect,
} from "../../PassengerInformationPage/PassengerInformationForm/PassengerInformationForm";

import { i18n } from "../../../i18n";

export default function Form({
  t,
  fName,
  lName,
  birthday,
  nationalityD,
  genderD,
  serialNrD,
  serialNrReleaseDateD,
  serialNrExpireDateD,
  update,
  additionalPassenger,
}) {
  const getLanguageSpecificContent = (key) => {
    return t(`personalRoom:${key}`);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [serialNr, setSerialNr] = useState("");
  const [serialNrReleaseDate, setSerialNrReleaseDate] = useState("");
  const [serialNrExpireDate, setSerialNrExpireDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");

  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(false);
  const [isValidNationality, setIsValidNationality] = useState(false);
  const [isValidGender, setIsValidGender] = useState(false);
  const [isValidSerialNr, setIsValidSerialNr] = useState(false);
  const [isValidReleaseDate, setIsValidReleaseDate] = useState(false);
  const [isValidExpireDate, setIsValidExpireDate] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const [btnText, setBtnText] = useState("");

  // useEffect(() => {
  //   if (update) {
  //     setBtnText("");
  //   }
  // }, []);

  const showValues = () => {
    // console.log(firstName);
    // console.log(lastName);
    // console.log(dateOfBirth);
    // console.log(serialNr);
    // console.log(serialNrReleaseDate);
    // console.log(serialNrExpireDate);
  };

  const saveUserData = () => {
    if (isUpdated && !additionalPassenger) {
      // alert("updated");
    } else {
      if (formReady && !additionalPassenger) {
        document.querySelector(`.${stylesPopup.container}`).style.display =
          "none";
      } else {
        alert("added second passenger");
      }
    }
  };

  const receiveFirstName = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length > 0) {
      setIsValidFirstName(true);
    } else {
      setIsValidFirstName(false);
    }
    setFirstName(value);
  };
  const receiveLastName = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length > 0) {
      setIsValidLastName(true);
    } else {
      setIsValidLastName(false);
    }
    setLastName(value);
  };
  const receiveDateOfBirth = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length < 10) {
      setIsValidDateOfBirth(false);
      setDateOfBirth(value);
    } else {
      if (value.length === 11) {
        let v = value.substr(0, 10);
        setDateOfBirth(v);
        setIsValidDateOfBirth(true);
        return;
      }
      setIsValidDateOfBirth(true);
      setDateOfBirth(value);
    }
  };
  const receiveSerialNr = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length > 0) {
      setIsValidSerialNr(true);
    } else {
      setIsValidSerialNr(false);
    }
    setSerialNr(value);
  };
  const receiveSerialNrReleaseDate = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length < 10) {
      setIsValidReleaseDate(false);
      setSerialNrReleaseDate(value);
    } else {
      if (value.length === 11) {
        let v = value.substr(0, 10);
        setSerialNrReleaseDate(v);
        setIsValidReleaseDate(true);
        return;
      }
      setIsValidReleaseDate(true);
      setSerialNrReleaseDate(value);
    }
  };
  const receiveSerialNrExpireDate = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    if (value.length < 10) {
      setIsValidExpireDate(false);
      setSerialNrExpireDate(value);
    } else {
      if (value.length === 11) {
        let v = value.substr(0, 10);
        setSerialNrExpireDate(v);
        setIsValidExpireDate(true);
        return;
      }
      setIsValidExpireDate(true);
      setSerialNrExpireDate(value);
    }
  };
  const receiveNationality = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    setIsValidNationality(true);
    setNationality(value);
  };
  const receiveGender = (value) => {
    if (update) {
      setIsUpdated(true);
    }
    setIsValidGender(true);
    setGender(value);
  };
  const formReady =
    isValidFirstName &&
    isValidLastName &&
    isValidDateOfBirth &&
    isValidNationality &&
    isValidGender &&
    isValidSerialNr &&
    isValidReleaseDate &&
    isValidExpireDate;

  let btnClassNames;
  if (update && !additionalPassenger) {
    if (isUpdated) {
      btnClassNames = `${stylesPopup.saveButton} ${stylesPopup.saveButtonActive} ${stylesUPD.saveButton} ${stylesUPD.saveButtonActive}`;
    } else {
      btnClassNames = `${stylesPopup.saveButton} ${stylesUPD.saveButton}`;
    }
  } else {
    if (formReady) {
      btnClassNames = `${stylesPopup.saveButton} ${stylesPopup.saveButtonActive} ${stylesUPD.saveButton} ${stylesUPD.saveButtonActive}`;
    } else {
      btnClassNames = `${stylesPopup.saveButton} ${stylesUPD.saveButton}`;
    }
  }

  return (
    <form
      onClick={showValues}
      className={` ${stylesPopup.form} ${stylesUPD.form}`}
    >
      <div className={` ${stylesPopup.inputs} ${stylesUPD.inputs}`}>
        <div className={` ${stylesPopup.firstNameC} ${stylesUPD.firstNameC}`}>
          <InputText
            placeholderClassName='firstNamePlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder1"
            )}
            passValue={receiveFirstName}
            inputType='name'
            defaultValue={fName}
          />
        </div>
        <div className={` ${stylesPopup.lastNameC} ${stylesUPD.lastNameC}`}>
          <InputText
            placeholderClassName='lastNamePlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder2"
            )}
            passValue={receiveLastName}
            inputType='name'
            defaultValue={lName}
          />
        </div>
        <div
          className={` ${stylesPopup.dateOfBirthC} ${stylesUPD.dateOfBirthC}`}
        >
          <InputText
            placeholderClassName='dateOfBirthPlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder3"
            )}
            passValue={receiveDateOfBirth}
            inputType='birthday'
            defaultValue={birthday}
          />
        </div>
        <div
          className={` ${stylesPopup.selectWrapper} ${stylesUPD.selectWrapper}`}
        >
          <div
            className={` ${stylesPopup.nationalityC} ${stylesUPD.nationalityC}`}
          >
            <CustomSelect
              placeholder={getLanguageSpecificContent(
                "UserDataFormPopup-placeholder4"
              )}
              type='nationality'
              passValue={receiveNationality}
              defaultOption={nationalityD}
            />
          </div>
          <div className={` ${stylesPopup.genderC} ${stylesUPD.genderC}`}>
            <CustomSelect
              placeholder={getLanguageSpecificContent(
                "UserDataFormPopup-placeholder5"
              )}
              type='gender'
              passValue={receiveGender}
              defaultOption={genderD}
            />
          </div>
        </div>

        <div
          className={` ${stylesPopup.serialNrInputC} ${stylesUPD.serialNrInputC}`}
        >
          <InputText
            placeholderClassName='serialNumberPlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder6"
            )}
            passValue={receiveSerialNr}
            inputType='serialNr'
            defaultValue={serialNrD}
          />
        </div>
        <div
          className={` ${stylesPopup.serialNrReleaseDateC} ${stylesUPD.serialNrReleaseDateC}`}
        >
          <InputText
            placeholderClassName='serialNrReleaseDatePlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder7"
            )}
            passValue={receiveSerialNrReleaseDate}
            inputType='serialNrReleaseDate'
            defaultValue={serialNrReleaseDateD}
          />
        </div>
        <div
          className={` ${stylesPopup.serialNrExpireDateC} ${stylesUPD.serialNrExpireDateC}`}
        >
          <InputText
            placeholderClassName='serialNrExpireDatePlaceholder'
            placeholder={getLanguageSpecificContent(
              "UserDataFormPopup-placeholder8"
            )}
            passValue={receiveSerialNrExpireDate}
            inputType='serialNrExpireDate'
            defaultValue={serialNrExpireDateD}
          />
        </div>
        <div onClick={saveUserData} className={btnClassNames}>
          {update
            ? `${getLanguageSpecificContent("UserDataFormPopup-placeholder9")}`
            : `${getLanguageSpecificContent(
                "UserDataFormPopup-placeholder10"
              )}`}
        </div>
      </div>
    </form>
  );
}
