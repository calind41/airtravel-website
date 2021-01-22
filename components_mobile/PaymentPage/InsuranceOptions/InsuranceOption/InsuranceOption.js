import React from "react";
import styles from "./InsuranceOption.module.scss";
import { withoutInsuranceSvg, iflyBasicSvg, iflyPlusSvg } from "./svg";

export default function InsuranceOption({
  name,
  type,
  price,
  passOptionSelected,
}) {
  let typeIcon;
  if (type === "without") {
    typeIcon = withoutInsuranceSvg;
  } else if (type === "basic") {
    typeIcon = iflyBasicSvg;
  } else if (type === "plus") {
    typeIcon = iflyPlusSvg;
  }
  const chooseOption = (evt) => {
    const optionHeaders = document.querySelectorAll(
      `.${styles.container} header`
    );
    optionHeaders.forEach((item) =>
      item.classList.remove(styles.selectedOption)
    );
    const arrows = document.querySelectorAll(`.${styles.arrow}`);
    arrows.forEach((arrow) => arrow.classList.remove(styles.arrowVisible));
    evt.target.classList.add(styles.selectedOption);
    document.querySelector(`#arrow${type}`).classList.add(styles.arrowVisible);

    passOptionSelected(type);
  };

  return (
    <div className={styles.container}>
      <header
        className={type === "basic" ? styles.selectedOption : ""}
        onClick={(evt) => chooseOption(evt)}
      >
        <span>{typeIcon}</span>
        <span style={type === "without" ? { width: "90px" } : {}}>{name}</span>
        <span>{price}€</span>
        <div
          id={`arrow${type}`}
          className={
            type === "basic"
              ? `${styles.arrow} ${styles.arrowVisible}`
              : `${styles.arrow}`
          }
        >
          {filledArrow}
        </div>
      </header>
    </div>
  );
}

const filledArrow = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='10'
    viewBox='0 0 14 10'
  >
    <path
      id='Polygon_1'
      data-name='Polygon 1'
      d='M7,0l7,10H0Z'
      transform='translate(14 10) rotate(-180)'
      fill='#59acff'
    />
  </svg>
);
