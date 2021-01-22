import React, { useState, useEffect } from "react";
import styles from "./FInput.module.css";
import stylesCalendar from "../CInput/Calendar/Calendar.module.css";
import locationStyles from "../Locations/Locations.module.css";
import Locations from "../Locations/Locations";
import LocSmallScreen from "../LocSmallScreen/LocSmallScreen";

export default function FInput({ nr, passLocationsState }) {
  const [acronym, setAcronym] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [locs, setLocs] = useState(locations);
  const [display, setDisplay] = useState("none");
  const [displayLocsSmall, setDisplayLocsSmall] = useState(false);

  const [isRenderedLocationsFInput, setIsRenderedLocationsFInput] = useState(
    false
  );

  const receiveFromInput = (text, acronym) => {
    setDisplay("none");
    setFromValue(text);
    setAcronym(acronym);
  };

  const filterLocations = (evt) => {
    setFromValue(evt.target.value);
    let input, filter;
    input = evt.target;
    filter = evt.target.value.toLowerCase();
    let filtered_locs = [];
    let temp = locations;
    temp.map((location, index) => {
      const city = location.full.props.children[0];
      const country = location.full.props.children[1].props.children;
      let text = city + country;
      if (text.toLowerCase().indexOf(filter) > -1) {
        // display it
        filtered_locs.push(location);
      }
    });
    setLocs(filtered_locs);
  };

  const showLocations = (evt) => {
    if (window.innerWidth <= 780) {
      setDisplayLocsSmall(true);

      // Already rendered
      if (displayLocsSmall) {
        const locationsSmallScreenElement = document.querySelector(
          `#locationSmallScreenId${nr}`
        );
        locationsSmallScreenElement.style.display = "block";
      }

      // Hide component when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setDisplayLocsSmall(false);
      });
      localStorage.setItem("inType", "From");
    } else {
      // Already rendered
      if (isRenderedLocationsFInput) {
        setDisplay("block");
        evt.target.parentNode.nextSibling.style.display = "block";
      }
      // First render
      else {
        setDisplay("block");
        setIsRenderedLocationsFInput(true);
      }

      // Hide rest of locations if already rendered
      document
        .querySelectorAll(`.${locationStyles.locationsC}`)
        .forEach((el) => {
          if (
            el.id !== `locationsFromId${nr}` &&
            el.id !== `locationsToId${nr}`
          ) {
            el.style.display = "none";
          }
        });
      const toNr = document.querySelector(`.to${nr}`);
      if (toNr) toNr.style.display = "none";

      // Hide passenger dropdown
      document
        .querySelectorAll(`#dropdownCid`)
        .forEach((el) => (el.style.display = "none"));
      document.querySelector(`#passengerSvgId`).style.transform =
        "rotate(0deg)";

      // Hide calendar
      for (let i = 0; i < 4; i++) {
        let c = document.querySelector(`#wrapperId${i}`);
        if (c) {
          c.style.display = "none";
        }
        let svg = document.querySelector(`#departingSvgId${i}`);
        if (svg) {
          svg.style.transform = "rotate(0deg)";
        }
      }
    }
  };
  return (
    <div className={styles.fromInput}>
      <label>
        <input
          id={`fromInputId${nr}`}
          value={fromValue}
          type='text'
          placeholder='From'
          spellCheck='false'
          autoComplete='off'
          onClick={(el) => el.target.setSelectionRange(0, 24)}
          onFocus={(evt) => {
            showLocations(evt);
          }}
          onChange={filterLocations}
        />
        <span id={`fromInputAcronymId${nr}`}>{acronym}</span>
      </label>
      {isRenderedLocationsFInput ? (
        <Locations
          nr={nr}
          display={display}
          locations={locs}
          inputType='from'
          passInput={receiveFromInput}
        />
      ) : null}

      {displayLocsSmall ? <LocSmallScreen locType='From' nr={nr} /> : null}
    </div>
  );
}

const planeIcon = (
  <svg
    id='planeSvgId'
    width='36px'
    height='36px'
    viewBox='0 0 36 36'
    version='1.1'
  >
    <title>66114142-7F07-4EF2-8BCF-A568B96F909F</title>
    <desc>Created with sketchtool.</desc>
    <g
      id='Symbols'
      stroke='none'
      stroke-width='1'
      fill='none'
      fill-rule='evenodd'
    >
      <g id='ico/product/white/avia' fill='#000000'>
        <g id='icon/product/avia'>
          <path
            d='M27.1787888,7.27521278 C28.0371528,6.41684873 29.3967971,6.39070045 30.2530483,7.24695167 C31.1092996,8.1032029 31.0831513,9.46284717 30.2247872,10.3212112 L24.8117128,15.7342856 L27.5000401,28.4132048 C27.6512408,29.1263102 27.4314868,29.8675031 26.9160351,30.3829548 L25.8369664,31.4620235 L20.168823,20.3771754 L14.3652108,26.1807877 L14.9942179,29.4519753 C15.0616748,29.8027888 14.950775,30.1642211 14.6981681,30.416828 L13.5544497,31.5605464 L10.9076741,26.5923259 L5.93945362,23.9455503 L7.08317198,22.8018319 C7.33577893,22.549225 7.69721121,22.4383252 8.0480247,22.5057821 L11.3192123,23.1347892 L27.1787888,7.27521278 Z M6.03797648,11.6630336 L7.14665684,10.5543533 C7.66179689,10.0392132 8.4024301,9.81939279 9.11519137,9.97009089 L19.6464466,12.1966991 L15.4038059,16.4393398 L6.03797648,11.6630336 Z'
            id='Combined-Shape'
          ></path>
        </g>
      </g>
    </g>
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

export const locations = [
  {
    full: (
      <>
        New York (all airports), <span>United States</span>
      </>
    ),
    acronym: "NYC",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Tenerife (all airports), <span>Spain</span>
      </>
    ),
    acronym: "TCI",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Paris (all airports), <span>France</span>
      </>
    ),
    acronym: "PAR",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Amsterdam (Schiphol), <span>Netherlands</span>
      </>
    ),
    acronym: "AMS",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Alicante, <span>Spain</span>
      </>
    ),
    acronym: "ALC",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Malaga, <span>Spain</span>
      </>
    ),
    acronym: "AGP",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Barcelona, <span>Spain</span>
      </>
    ),
    acronym: "BCN",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Edinburgh, <span>United Kingdom</span>
      </>
    ),
    acronym: "EDI",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Rome (all airports), <span>Italy</span>
      </>
    ),
    acronym: "ROM",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Dublin, Ireland, <span>Ireland, Republic Of</span>
      </>
    ),
    acronym: "DUB",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Faro, <span>Portugal</span>
      </>
    ),
    acronym: "FAO",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Prague (Ruzyne), <span>Czech Republic</span>
      </>
    ),
    acronym: "PRG",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Glasgow, <span>United Kingdom</span>
      </>
    ),
    acronym: "GLA",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Milan (all airports), <span>Italy</span>
      </>
    ),
    acronym: "MIL",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Madrid (Barajas), <span>Spain</span>
      </>
    ),
    acronym: "MAD",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Lanzarote, <span>Spain</span>
      </>
    ),
    acronym: "ACE",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Copenhagen, <span>Denmark</span>
      </>
    ),
    acronym: "CPH",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        Geneva (Geneve Cointrin), <span>Switzerland</span>
      </>
    ),
    acronym: "GVA",
    icon: locationIcon,
    iconType: "location",
  },
  {
    full: (
      <>
        New York, John F Kennedy, <span>United States</span>
      </>
    ),
    acronym: "JFK",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        New York, Newark Liberty, <span>United States</span>
      </>
    ),
    acronym: "EWR",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        New York, La Guardia, <span>United States</span>
      </>
    ),
    acronym: "LGA",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        Buenos Aires, Jorge Newbery, <span>Argen</span>
      </>
    ),
    acronym: "AEP",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        Buenos Aires, Ministro Pistarini, <span>Argen</span>
      </>
    ),
    acronym: "EZE",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        Paris, Charles De Gaulle, <span>France</span>
      </>
    ),
    acronym: "CDG",
    icon: planeIcon,
    iconType: "plane",
  },
  {
    full: (
      <>
        Malta, (Luqa), <span>Malta</span>
      </>
    ),
    acronym: "MLA",
    icon: locationIcon,
    iconType: "location",
  },
];
