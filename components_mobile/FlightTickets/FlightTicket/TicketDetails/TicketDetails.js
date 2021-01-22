import React from "react";
import styles from "./TicketDetails.module.scss";
import {
  baggageType1Svg,
  baggageType2Svg,
  dashedLineSvg,
  userIconSvg,
} from "./svg";
import { closeIconSvg } from "../../../SearchFlightForm/svg";
import { useRouter } from "next/router";
export default function TicketDetails({
  id,
  logo,
  from,
  to,
  transfer,
  flight,
  unmountTicketDetails,
  type,
  alreadyBooked,
  bookedNrPassengers,
  bookedInsuranceType,
}) {
  const flightDuration = "1 ч 30 мин";

  const closeTicketDetails = () => {
    document.querySelector(`#${id}`).classList.add(styles.slideDownAnimation);
    setTimeout(() => {
      unmountTicketDetails();
    }, 500);
  };

  return (
    <>
      <section id={`${id}`} className={styles.ticketDetailsContainer}>
        <div onClick={closeTicketDetails} className={styles.closeIcon}>
          {closeIconSvg}
        </div>
        <div className={styles.wrapper}>
          <header>
            <div className={styles.fromToLocations}>
              <div>
                <span>{from.city}</span>
                <span>{from.airport}</span>
              </div>
              <div> —</div>
              <div>
                <span>{to.city}</span>
                <span>{to.airport}</span>
              </div>
            </div>
            <div className={styles.flightDuration}>
              {flightDuration} <span>в пути</span>
            </div>
            <div className={styles.baggageTypes}>
              <div>
                {baggageType1Svg}
                <span>1x Ручная кладь</span>
              </div>
              <div>
                {baggageType2Svg}
                <span>0x Багаж</span>
              </div>
            </div>
          </header>
          {alreadyBooked ? (
            <div className={styles.alreadyBookedInfo}>
              <div>
                <div>{userIconSvg}</div>
                <div>
                  {bookedNrPassengers} пассажира, {"  "}
                  {bookedInsuranceType}
                </div>
              </div>
              <div className={styles.getInsuranceLink}>Приобрести</div>
            </div>
          ) : null}

          <OneWayTicketDetails
            logo={logo}
            from={from}
            to={to}
            transfer={transfer}
            flight={flight}
            secondTicketDetails={false}
          />
          {transfer && (
            <TransferDetails
              location={transfer.location}
              aboutInfo={transfer.aboutInfo}
              duration={transfer.duration}
              alreadyBooked={alreadyBooked}
            />
          )}
          {type === "twoWay" ? (
            <OneWayTicketDetails
              logo={logo}
              from={from}
              to={to}
              transfer={transfer}
              flight={flight}
              secondTicketDetails={true}
            />
          ) : null}
        </div>
      </section>
      <BookTicket alreadyBooked={alreadyBooked} />
    </>
  );
}

const OneWayTicketDetails = ({
  logo,
  from,
  to,
  transfer,
  flight,
  secondTicketDetails,
}) => {
  return (
    <div
      className={
        secondTicketDetails
          ? `${styles.oneWayTicketDetailsContainer} ${styles.oneWayTicketDetailsContainerSecond}`
          : `${styles.oneWayTicketDetailsContainer}`
      }
    >
      <div className={styles.airports}>
        <div>{from.airport}</div>
        <div className={styles.lineDown}>{dashedLineSvg}</div>
        <div>{to.airport}</div>
      </div>
      <div className={styles.flightTimeAndCompanyInfo}>
        <div className={styles.fromTime}>{from.dateTime}</div>
        <div className={styles.companyInfo}>
          <div className={styles.logo}>{logo}</div>
          <div>
            <div>Turkish Airlines</div>
            <div>Рейс TK 272</div>
          </div>
        </div>
        <div className={styles.toTime}>{to.dateTime}</div>
      </div>
      <div className={styles.depArrTimesAndFlightDuration}>
        <div>18 авг</div>
        <div className={styles.flightTime}>1ч 30м</div>
        <div>18 авг</div>
      </div>
    </div>
  );
};

const TransferDetails = ({ location, aboutInfo, duration, alreadyBooked }) => {
  return (
    <div
      className={
        alreadyBooked
          ? `${styles.transferDetailsWrapper}`
          : ` ${styles.transferDetailsWrapper} ${styles.transferDetailsWrapperBooked}`
      }
    >
      <div className={styles.transferDetailsContainer}>
        <div>
          <span>Пересадка</span>
          <span className={styles.dot}> • </span>
          <span>{location}</span>
          <span className={styles.dot}> • </span>
          <span>{aboutInfo[0]}</span>
          <span className={styles.dot}> • </span>
          <span>{aboutInfo[1]}</span>
        </div>
        <div className={styles.transferDuration}>12ч 30м</div>
      </div>
    </div>
  );
};

const BookTicket = ({ alreadyBooked }) => {
  const router = useRouter();
  const toBookingPage = () => {
    router.push("/booking");
  };
  return (
    <div
      onClick={toBookingPage}
      style={alreadyBooked ? { visibility: "hidden" } : {}}
      className={styles.bookTicketContainer}
    >
      <div className={styles.wrapper}>
        <div>
          <div>249$</div>
          <div className={styles.type}>В одну сторону</div>
        </div>
        <div>Забронировать</div>
      </div>
    </div>
  );
};
