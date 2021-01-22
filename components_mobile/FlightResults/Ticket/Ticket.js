import React, { useState, useEffect } from "react";
import styles from "./Ticket.module.scss";
import TicketPrice from "../MainTicket/TicketPrice/TicketPrice";

export default function Ticket({
  headerTicket,
  logos,
  departureInfo,
  arrivalInfo,
  totalDuration,
  transferInfo,
  id,
  baggage,
}) {
  const [newTransfers, setNewTransfers] = useState(null);

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

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div
          style={
            logos.length > 1
              ? { width: 40 + (logos.length - 1) * 9 + "px" }
              : {}
          }
          className={styles.logosWrapper}
        >
          <div className={styles.logos}>
            {logos.map((logo, index) => (
              <div
                key={index}
                style={{ zIndex: 10 - index, left: index * -32 + "px" }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.airCompAndBaggage}>
          <div className={styles.aircList}>Fly One, Pobeda, Wizz Air</div>
          {baggage ? (
            <div className={`${styles.aboutBaggage} ${styles.withBaggage}`}>
              С багажом
            </div>
          ) : (
            <div className={styles.aboutBaggage}>Без багажа</div>
          )}
        </div>
        {headerTicket ? (
          <div className={styles.headerTicketType}>{headerTicket}</div>
        ) : (
          <div className={styles.ticketPriceWrapper}>
            <TicketPrice />
          </div>
        )}
      </div>
      <div className={styles.lower}>
        <div className={styles.timeAndAirportCodeWrapper}>
          <div className={styles.timeAndAirportCode}>
            <div className={styles.time}>{departureInfo.time}</div>
            <div className={styles.code}>{departureInfo.airportCode}</div>
          </div>
        </div>
        <div className={`${styles.middleWrapper} `}>
          <div className={`${styles.middle}`}>
            <div className={styles.totalDuration}>В пути {totalDuration}</div>
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
              {transferInfo.count} пересадки,
              {transferInfo.totalTransferDuration}
            </div>
          </div>
        </div>
        <div className={styles.timeAndAirportCodeWwrapper2}>
          <div className={styles.timeAndAirportCode}>
            <div className={styles.time}>{arrivalInfo.time}</div>
            <div className={styles.code}>{arrivalInfo.airportCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
