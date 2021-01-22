import React, { useState, useEffect } from "react";
import styles from "./TicketDetails.module.scss";
import Popup from "../../Popup/Popup";

export default function TicketDetails({
  inModal,
  animateClass,
  logos,
  departureInfo,
  arrivalInfo,
  totalDuration,
  transferInfo,
}) {
  const transfer = true;
  const [baggageSlideAnimation, setBaggageSlideAnimation] = useState(
    "slideDown"
  );
  const [baggageTwoSlideAnimation, setBaggageTwoSlideAnimation] = useState(
    "slideDown"
  );

  const onMouseEnterPopupArea = (setValue, value) => {
    setValue(value);
  };
  const onMouseLeavePopupArea = (setValue, value) => {
    setValue(value);
  };

  return (
    <div
      className={
        animateClass === "slideDown"
          ? `${styles.ticketDetailsWrapper} ${styles.overflowVisible}`
          : `${styles.ticketDetailsWrapper} ${styles.overflowHidden}`
      }
    >
      <div
        className={
          inModal
            ? `${styles.containerInModal} ${styles.container} ${styles[animateClass]}`
            : `${styles.container} ${styles[animateClass]} `
        }
      >
        <div className={styles.arrowContainer}></div>
        <div
          className={
            inModal
              ? `${styles.flightBlockWrapper} ${styles.flightBlockWrapperInModal}`
              : `${styles.flightBlockWrapper}`
          }
        >
          <FlightBlock
            inModal={inModal}
            logos={logos}
            departureInfo={departureInfo}
            arrivalInfo={arrivalInfo}
          />
          <div
            className={
              inModal
                ? `${styles.flightBlockDuration} ${styles.flightBlockDurationInModal}`
                : `${styles.flightBlockDuration}`
            }
          >
            <span>1ч 30м</span>
          </div>
          <div className={styles.baggageIconsWrapper}>
            <Popup left='-28px' slideAnimation={baggageSlideAnimation}>
              <div className={styles.baggageIconPopupItem}>
                Багаж 1 место до 30 кг
              </div>
              <div className={styles.baggageIconPopupItem}>
                Ручная кладь 1 место
              </div>
            </Popup>
            <div
              onMouseLeave={() =>
                onMouseLeavePopupArea(setBaggageSlideAnimation, "slideDown")
              }
              onMouseEnter={() =>
                onMouseEnterPopupArea(setBaggageSlideAnimation, "slideUp")
              }
              className={styles.baggageIcons}
            >
              <div className={styles.b1}>
                <div>{baggageIcon}</div>
                <div className={styles.weight}>30</div>
              </div>
              <div className={styles.b2}>
                <div>{baggageIconSmall}</div>
                <div className={styles.count}>x1</div>
              </div>
            </div>
          </div>
        </div>

        {transfer && (
          <TransferDetails
            inModal={inModal}
            location=' Москва, Россия '
            duration='5ч 35м'
          />
        )}
        <div
          style={{ marginTop: "17px" }}
          className={
            inModal
              ? `${styles.flightBlockWrapper} ${styles.flightBlockWrapperInModal}`
              : `${styles.flightBlockWrapper}`
          }
        >
          <FlightBlock
            inModal={inModal}
            logos={logos}
            departureInfo={departureInfo}
            arrivalInfo={arrivalInfo}
          />
          <div
            className={
              inModal
                ? `${styles.flightBlockDuration} ${styles.flightBlockDurationInModal}`
                : `${styles.flightBlockDuration}`
            }
          >
            <span>1ч 30м</span>
          </div>
          <div className={styles.baggageIconsWrapper}>
            <Popup left='-28px' slideAnimation={baggageTwoSlideAnimation}>
              <div className={styles.baggageIconPopupItem}>
                Багаж не включен
              </div>
              <div className={styles.baggageIconPopupItem}>
                Ручная кладь 1 место
              </div>
            </Popup>
            <div
              onMouseLeave={() =>
                onMouseLeavePopupArea(setBaggageTwoSlideAnimation, "slideDown")
              }
              onMouseEnter={() =>
                onMouseEnterPopupArea(setBaggageTwoSlideAnimation, "slideUp")
              }
              className={styles.baggageIcons}
            >
              <div className={`${styles.b1} ${styles.noBaggage}`}>
                <div>{baggageIcon}</div>
                <div className={styles.weight}>x</div>
              </div>
              <div className={styles.b2}>
                <div>{baggageIconSmall}</div>
                <div className={styles.count}>8</div>
              </div>
            </div>
          </div>
        </div>
        {inModal ? null : (
          <button className={styles.chooseTicket}>Выбрать рейс</button>
        )}
      </div>
    </div>
  );
}

function FlightBlock({ inModal, logos, departureInfo, arrivalInfo }) {
  const [logoSlideAnimation, setLogoSlideAnimation] = useState("");
  const [departureSlideAnimation, setDepartureSlideAnimation] = useState("");
  const [arrivalSlideAnimation, setArrivalSlideAnimation] = useState("");
  const onMouseEnterPopupArea = (setValue, value) => {
    setValue(value);
  };
  const onMouseLeavePopupArea = (setValue, value) => {
    setValue(value);
  };

  return (
    <div
      className={
        inModal
          ? `${styles.flightBlockContainer} ${styles.flightBlockContainerInModal}`
          : `${styles.flightBlockContainer}`
      }
    >
      <div className={styles.left}>
        <div className={styles.logosWrapper}>
          <Popup slideAnimation={logoSlideAnimation}>
            <div className={styles.logosPopupItem}>Wizz Air</div>
            <div className={styles.logosPopupItem}>Air Moldova</div>
          </Popup>
          <div
            onMouseLeave={() =>
              onMouseLeavePopupArea(setLogoSlideAnimation, "slideDown")
            }
            onMouseEnter={() =>
              onMouseEnterPopupArea(setLogoSlideAnimation, "slideUp")
            }
            className={styles.logos}
          >
            {logos.map((logo, index) => (
              <div
                style={{ zIndex: 10 - index, top: index * -25 + "px" }}
                key={index}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.timeAndAirportCodeWrapper}>
          <Popup left='-55px' slideAnimation={departureSlideAnimation}>
            <div className={styles.departurePopupItem}>Вылет: Кишинёв</div>
            <div className={styles.departurePopupItem}>
              Кишинёв <strong>{departureInfo.airportCode}</strong>
            </div>
          </Popup>

          <div
            onMouseLeave={() =>
              onMouseLeavePopupArea(setDepartureSlideAnimation, "slideDown")
            }
            onMouseEnter={() =>
              onMouseEnterPopupArea(setDepartureSlideAnimation, "slideUp")
            }
            className={styles.timeAndAirportCode}
          >
            <div className={styles.time}>{departureInfo.time}</div>
            <div className={styles.code}>{departureInfo.airportCode}</div>
          </div>
        </div>
      </div>
      <div className={styles.flightDetails}>
        <div className={styles.path}>Кишинёв – Аэропорт Стамбул</div>
        <div className={styles.airplaneDetails}>
          Рейс TK 270 (Turkish), Airbus A321
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.timeAndAirportCodeWrapper2}>
          <Popup left='-55px' slideAnimation={arrivalSlideAnimation}>
            <div className={styles.arrivalPopupItem}>Прилет: Лондон</div>
            <div className={styles.arrivalPopupItem}>
              Лутон <strong>{arrivalInfo.airportCode}</strong>
            </div>
            <div className={styles.arrivalPopupItem}>
              <span style={{ color: "#D91A1A" }}>20 января</span>
            </div>
          </Popup>
          <div
            onMouseLeave={() =>
              onMouseLeavePopupArea(setArrivalSlideAnimation, "slideDown")
            }
            onMouseEnter={() =>
              onMouseEnterPopupArea(setArrivalSlideAnimation, "slideUp")
            }
            className={styles.timeAndAirportCode}
          >
            <div className={styles.time}>{arrivalInfo.time}</div>
            <div className={styles.code}>{arrivalInfo.airportCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransferDetails({ inModal, location, duration }) {
  return (
    <div
      className={
        inModal
          ? `${styles.transferDetailsContainer} ${styles.transferDetailsContainerInModal}`
          : `${styles.transferDetailsContainer}`
      }
    >
      <div>
        <div className={styles.location}>
          <span>Пересадка:</span>
          <span>{location}</span>
          <span className={styles.dot}> • </span>
        </div>
        {/* <span>{aboutInfo[0]}</span> */}
        {/* <span className={styles.dot}> • </span>
          <span>{aboutInfo[1]}</span> */}
        <div className={styles.transferDuration}>{duration}</div>
      </div>
    </div>
  );
}

export const baggageIcon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M17.5 5.7H16V3.4C16 2.1 14.9 1 13.5 1h-3C9.1 1 8 2.1 8 3.4v2.3H6.5C5.1 5.8 4 6.8 4 8.2v11.5C4 21 5.1 22 6.5 22H7c0 .5.4 1 .9 1H9c.5 0 .9-.4.9-1H14c0 .5.4 1 .9 1H16c.5 0 1-.4 1-1h.5c1.4 0 2.5-1.1 2.5-2.4V8.2c0-1.4-1.1-2.5-2.5-2.5zm-10 1.6c-1.1 0-2 .9-2 2v9.3c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V9.3c0-1.1-.9-2-2-2h-9zm2-2.9c0-1.1.9-1.9 2-1.9h1c1.1 0 2 .8 2 1.9v1.3h-5V4.4z'
      fill='currentColor'
    ></path>
  </svg>
);
export const baggageIconSmall = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M17.778 8h-1.334v-.5c0-1.4-.977-2.5-2.222-2.5H9.778C8.533 5 7.556 6.1 7.556 7.5V8H6.222C4.978 8 4 9.1 4 10.5v7c0 1.4.978 2.5 2.222 2.5H17.778C19.022 20 20 18.9 20 17.5v-7c0-1.4-.978-2.5-2.222-2.5zM7.11 9.5c-.978 0-1.778.9-1.778 2v5c0 1.1.8 2 1.778 2h9.778c.978 0 1.778-.9 1.778-2v-5c0-1.1-.8-2-1.778-2H7.11zM8.8 8c0-.8.178-1.6 1.333-1.6h3.734c1.066 0 1.333.8 1.333 1.6H8.8z'
      fill='currentColor'
    ></path>
  </svg>
);
