import React from "react";
import styles from "./Locations.module.scss";
import { planeIcon, locationIcon } from "../svg";

export default function Locations({
  locations,
  inputType,
  passInput,
  positionLocationClass,
}) {
  const handleClick = (loc) => {
    console.log(loc.acronym);
    const city = loc.full.props.children[0];
    const country = loc.full.props.children[1].props.children;
    let text = city + country;

    passInput(text, loc.acronym);

    if (inputType === "to") {
      if (document.querySelector("#wrapperId")) {
        document.querySelector("#wrapperId").style.display = "none !important";
      }

      document.querySelector(`.${inputType}`).style.display = "none";
    } else {
      if (document.querySelector("#wrapperId")) {
        document.querySelector("#wrapperId").style.display = "none !important";
      }
      if (document.querySelector(`.${inputType}`)) {
        document.querySelector(`.${inputType}`).style.display = "none";
      }
      if (document.querySelector(".to")) {
        document.querySelector(".to").style.display = "block";
        document.querySelector("#toInputId").focus();
      }
    }
  };
  return (
    <div
      id={inputType === "from" ? "locationsFromId" : "locationsToId"}
      className={`${styles.locationsC} ${inputType} ${styles[positionLocationClass]}`}
    >
      {locations &&
        locations.map((loc, index) => {
          return (
            <div onClick={() => handleClick(loc)} key={index}>
              <span>{loc.icon}</span>
              <span
                className={loc.icon === planeIcon ? `${styles.planeI}` : ""}
              >
                {loc.full}
              </span>
              <span>{loc.acronym}</span>
            </div>
          );
        })}
    </div>
  );
}
