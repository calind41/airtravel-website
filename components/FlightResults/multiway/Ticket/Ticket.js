import React, { useState, useEffect } from "react";
import styles from "./Ticket.module.scss";
import Popup from "../Popup/Popup";

export default function Ticket({
  logos,
  departureInfo,
  arrivalInfo,
  totalDuration,
  transferInfo,
  middleWidth,
  id,
  inModal,
  middleClassName,
  middleWrapperClassName,
}) {
  const [newTransfers, setNewTransfers] = useState(null);
  const [logoSlideAnimation, setLogoSlideAnimation] = useState("");
  const [departureSlideAnimation, setDepartureSlideAnimation] = useState("");
  const [arrivalSlideAnimation, setArrivalSlideAnimation] = useState("");
  const [transferSlideAnimation, setTransferSlideAnimation] = useState("");
  const [outerWidth, setOuterWidth] = useState(null);

  useEffect(() => {
    setOuterWidth(window.outerWidth);
    const handleResize = () => {
      if (window.outerWidth <= 857) {
        setOuterWidth(857);
      } else if (window.outerWidth <= 1036) {
        setOuterWidth(1036);
      } else if (window.outerWidth <= 1372) {
        setOuterWidth(1372);
      } else {
        setOuterWidth(window.outerWidth);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getTransferLineRepresentations = () => {
    const totalDurationTransformed = totalDuration
      .split(" ")
      .map((item) => parseInt(item));
    const totalMinutes =
      totalDurationTransformed[1] + 60 * totalDurationTransformed[0];

    const transfers = transferInfo.transfers;
    const temp = [];
    transfers.map((transfer) => {
      const durationArr = transfer.duration
        .split(" ")
        .map((item) => parseInt(item));
      const durationInMinutes = durationArr[1] + 60 * durationArr[0];
      temp.push({
        name: transfer.name,
        duration: durationInMinutes,
      });
    });

    temp.map((item) => {
      const percentage = (item.duration / totalMinutes) * 100;
      item.percentage = percentage;
    });

    setNewTransfers(temp);
  };
  useEffect(() => {
    getTransferLineRepresentations();
  }, []);

  const onMouseEnterPopupArea = (setValue, value) => {
    setValue(value);
  };
  const onMouseLeavePopupArea = (setValue, value) => {
    setValue(value);
  };

  let leftValueForTransferPopup;
  if (middleWidth && inModal) {
    leftValueForTransferPopup = "62px";
  } else if (middleWidth && !inModal) {
    leftValueForTransferPopup = "64px";
  } else if (!middleWidth) {
    leftValueForTransferPopup = "55px";
    // these values lower need to be changed
    if (outerWidth <= 857) {
      leftValueForTransferPopup = "20px";
    } else if (outerWidth <= 1036) {
      leftValueForTransferPopup = "3vw";
    } else if (outerWidth <= 1372) {
      leftValueForTransferPopup = "20px";
    }
  }
  return (
    <div
      className={
        middleWidth && !inModal
          ? `${styles.container} ${styles.mainTContainer}`
          : inModal
          ? `${styles.container} ${styles.containerInModal}`
          : `${styles.container}`
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
      <div
        className={`${styles.middleWrapper} ${styles[middleWrapperClassName]}`}
      >
        <Popup
          transferPopupClassName='popupForTicketTransfers'
          left={leftValueForTransferPopup}
          slideAnimation={transferSlideAnimation}
        >
          <div className={styles.transferPopupItem}>Пересадки:</div>
          {transferInfo.transfers &&
            transferInfo.transfers.map((transfer, index) => {
              return (
                <div key={index} className={styles.transferPopupItem}>
                  {transfer.name}
                </div>
              );
            })}
        </Popup>
        <div
          onMouseLeave={() =>
            onMouseLeavePopupArea(setTransferSlideAnimation, "slideDown")
          }
          onMouseEnter={() =>
            onMouseEnterPopupArea(setTransferSlideAnimation, "slideUp")
          }
          // style={middleWidth ? { width: middleWidth } : {}}
          className={
            inModal
              ? `${styles.middle} ${styles.middleInModal}`
              : `${styles.middle} ${styles[middleClassName]}`
          }
        >
          <div className={styles.totalDuration}>{totalDuration}</div>
          <div className={styles.durationReprLine}>
            {newTransfers &&
              newTransfers.map((item, index) => (
                <div
                  key={index}
                  style={
                    index === 1
                      ? { left: "244px", width: `${item.percentage}%` }
                      : { width: `${item.percentage}%` }
                  }
                  className={styles.transferLine}
                ></div>
              ))}
          </div>
          <div className={styles.transferDetails}>
            {transferInfo.count} пересадки, {transferInfo.totalTransferDuration}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.timeAndAirportCodeWwrapper2}>
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
