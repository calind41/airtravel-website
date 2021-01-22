import React, { useState, useEffect } from "react";
import styles from "./Test.module.scss";
import FlightResultsHeader from "./FlightResultsHeader/FlightResultsHeader";
import Filters from "./Filters/Filters";
import MainHeader from "./MainHeader/MainHeader";
import MainTicket from "./MainTicket/MainTicket";
import TicketModal from "./TicketModal/TicketModal";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../../FlightTickets/FlightTicket/logos";
import { dom } from "../../../helpers/reuse";

export default function Test({ t }) {
  const [dummyData, setDummyData] = useState([]);
  const [dummyData2, setDummyData2] = useState([]);
  const [isActiveSection1, setIsActiveSection1] = useState(true);
  const [isActiveSection2, setIsActiveSection2] = useState(false);
  const [renderTicketModal, setRenderTicketModal] = useState(false);
  const [isPositionFixedSection1, setIsPositionFixedSection1] = useState(false);
  const [scrolledAmountSection1, setScrolledAmountSection1] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActiveSection1]);

  useEffect(() => {
    const cond1 = isActiveSection2 && window.scrollY >= 383;
    const cond2 = !isActiveSection2 && window.scrollY >= 383;
    if (cond1) {
      window.scrollTo(0, 388);
    } else if (cond2) {
      dom("#mainWrapperId2").classList.add(styles.positionFixed2);
    }
  }, [isActiveSection2]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      dummyData.push("dummy");
      dummyData.push("dummy");
      dummyData2.push("dummy");
      dummyData2.push("dummy");
      dummyData2.push("dummy");
    }
    setDummyData(dummyData);
    setDummyData2(dummyData2);
  }, []);

  const handleScroll = () => {
    const section1 = dom("#mainWrapperId");
    const section2 = dom("#mainWrapperId2");
    if (isActiveSection1) {
      section1.style.transform = "translateY(0px)";
      section1.classList.remove(styles.positionFixed);
    }
    if (window.scrollY >= 383) {
      if (!isActiveSection1) {
        section1.classList.add(styles.positionFixed);
      }
      if (!isActiveSection2) {
        section2.classList.add(styles.positionFixed2);
      }
    } else {
      if (!isActiveSection1 && !isPositionFixedSection1) {
        section1.classList.remove(styles.positionFixed);
      }
      if (!isActiveSection2) {
        section2.classList.remove(styles.positionFixed2);
      }
    }
  };

  const selectFromTicketSectionTwo = () => {
    const section2 = dom("#mainWrapperId2");
    const section1 = dom("#mainWrapperId");
    const sectionContainer = dom(`.${styles.sidesWrapper}`);
    sectionContainer.style.justifyContent = "flex-end";

    section2.classList.remove(styles.mainWrapperInactive2);
    section2.classList.add(styles.slideLeft);
    section2.classList.remove(styles.slideRight);
    section2.classList.remove(styles.positionFixed2);
    section2.classList.add(styles.mainWrapper2PositionRelative);

    if (isActiveSection1) {
      section1.classList.add(styles.mainWrapperInactive);
      section1.classList.remove(styles.mainWrapperPositionRelative);
      setScrolledAmountSection1(window.scrollY);
      if (window.scrollY >= 383) {
        const scrollVal = window.scrollY - 383 + "px";
        section1.style.transform = `translateY(${"-" + scrollVal})`;
        section1.classList.add(styles.positionFixed);
        setIsPositionFixedSection1(true);
      } else {
        section1.style.transform = `translateY(0px)`;
        setIsPositionFixedSection1(false);
      }
    }

    setIsActiveSection2(true);
    setIsActiveSection1(false);
  };

  const selectFromTicketSectionOne = (evt) => {
    if (isActiveSection1) {
      if (evt.target.id.slice(0, 4) === "mtw1") return;
      selectFromTicketSectionTwo();
      return;
    }

    const section2 = dom("#mainWrapperId2");
    const section1 = dom("#mainWrapperId");
    const sectionContainer = dom(`.${styles.sidesWrapper}`);
    sectionContainer.style.justifyContent = "space-between";

    section2.classList.add(styles.mainWrapperInactive2);
    section2.classList.remove(styles.slideLeft);
    section2.classList.add(styles.slideRight);
    section2.classList.remove(styles.mainWrapper2PositionRelative);

    section1.classList.remove(styles.mainWrapperInactive);
    section1.classList.remove(styles.positionFixed);
    section1.classList.add(styles.mainWrapperPositionRelative);

    window.scrollTo(0, scrolledAmountSection1);
    setIsActiveSection2(false);
    setIsActiveSection1(true);
  };

  const receiveRenderTicketModal = (value) => {
    setRenderTicketModal(value);
  };

  return (
    <>
      <div className={styles.container}>
        <FlightResultsHeader
          passRenderTicketModal={receiveRenderTicketModal}
          t={t}
        />
        <Filters mainWrapperAnimationClass={styles.mainWrapperAnimationClass} />
        <div className={styles.sidesWrapper}>
          <div
            id='mainWrapperId'
            onClick={selectFromTicketSectionOne}
            className={`${styles.mainWrapper} ${styles.mainWrapperAnimationClass}`}
          >
            <MainHeader from='Кишинёв' to='Лондон' date='25 декабря, пятница' />

            {dummyData.map((item, index) => {
              return (
                <MainTicket
                  isActiveSection1={isActiveSection1}
                  ticketProps={ticketProps}
                  showPrice={true}
                  key={index}
                  id={`mtw1${index + 1}`}
                />
              );
            })}
          </div>
          <div
            id='mainWrapperId2'
            onClick={selectFromTicketSectionTwo}
            className={`${styles.mainWrapper2}  ${styles.mainWrapperInactive2} ${styles.mainWrapper2PositionRelative}`}
          >
            <MainHeader
              section2={true}
              from='Кишинёв'
              to='Лондон'
              date='25 декабря, пятница'
            />

            {dummyData2.map((item, index) => {
              return (
                <MainTicket
                  passRenderTicketModal={receiveRenderTicketModal}
                  isActiveSection2={isActiveSection2}
                  ticketProps={ticketProps}
                  showPrice={true}
                  key={index}
                  id={`mtw2${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      {renderTicketModal ? (
        <TicketModal
          from='Кишинёв'
          to='Лондон'
          date='19 января, вторник'
          unmountModal={() => setRenderTicketModal(false)}
        />
      ) : null}
    </>
  );
}

export const ticketProps = {
  logos: [wizzAirLogo, airMoldovaLogo],
  departureInfo: {
    time: "12:55",
    airportCode: "KIV",
  },
  arrivalInfo: {
    time: "07:50",
    airportCode: "STN",
  },
  totalDuration: "44ч 55м",
  transferInfo: {
    count: 2,
    totalTransferDuration: "38ч 20м",
    transfers: [
      {
        duration: "28ч 00м",
        name: "Вена, Швехат VIE",
      },
      {
        duration: "10ч 20м",
        name: "Дортмунд, Дортмунд DTM",
      },
    ],
  },
};
