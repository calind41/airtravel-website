import React from "react";
import styles from "./Locations.module.css";

const planeIcon = (
  <svg
    className='plane-svg'
    width='682pt'
    height='682pt'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M27.179 7.275c.858-.858 2.218-.884 3.074-.028.856.856.83 2.216-.028 3.074l-5.413 5.413 2.688 12.68a2.154 2.154 0 0 1-.584 1.969l-1.079 1.079-5.668-11.085-5.804 5.804.63 3.271c.067.35-.044.712-.297.965l-1.144 1.144-2.646-4.969-4.969-2.646 1.144-1.144c.253-.253.614-.364.965-.296l3.271.629 15.86-15.86zM6.038 11.663l1.109-1.109a2.154 2.154 0 0 1 1.968-.584l10.531 2.227-4.242 4.242-9.366-4.776z'
      fill='#000'
      fill-rule='evenodd'
    />
  </svg>
);
const locationIcon = (
  <svg version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512 512'>
    <g>
      <g>
        <path
          d='M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
                c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
                C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
                s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z'
        />
      </g>
    </g>
  </svg>
);

export default function Locations({
  nr,
  display,
  locations,
  inputType,
  passInput,
}) {
  const handleClick = (loc, evt) => {
    console.log(loc.acronym);
    const city = loc.full.props.children[0];
    const country = loc.full.props.children[1].props.children;
    let text = city + country;

    passInput(text, loc.acronym);

    if (inputType === "to") {
      if (document.querySelector(`#wrapperId${nr}`)) {
        document.querySelector(`#wrapperId${nr}`).style.display =
          "none !important";
      }

      evt.target.parentNode.style.display = "none";
    } else {
      if (document.querySelector(`#wrapperId${nr}`)) {
        document.querySelector(`#wrapperId${nr}`).style.display =
          "none !important";
      }

      evt.target.parentNode.style.display = "none";
      if (document.querySelector(`.to${nr}`)) {
        document.querySelector(`.to${nr}`).style.display = "block";
        document.querySelector(`#toInputId${nr}`).focus();
      }
    }
  };
  return (
    <div
      style={{ display: `${display}` }}
      id={inputType === "from" ? `locationsFromId${nr}` : `locationsToId${nr}`}
      className={`${styles.locationsC} ${inputType + nr}`}
    >
      {locations &&
        locations.map((loc, index) => {
          return (
            <div onClick={(evt) => handleClick(loc, evt)} key={index}>
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
