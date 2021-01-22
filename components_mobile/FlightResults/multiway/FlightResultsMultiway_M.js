import React, { useState, useEffect } from "react";
import styles from "./FlightResults.module.scss";
import FlightResultsHeader from "./FlightResultsHeader/FlightResultsHeader";
import Filters from "./Filters/Filters";
import MainHeader from "./MainHeader/MainHeader";
import MainTicket from "./MainTicket/MainTicket";
import {
  wizzAirLogo,
  airMoldovaLogo,
} from "../../FlightTickets/FlightTicket/logos";
import SectionTabs from "./SectionTabs/SectionTabs";
import { dom } from "../../../helpers/reuse";
import TicketDetailsModal from "./MainTicket/TicketDetailsModal/TicketDetailsModal";
import BookingModal from "./BookingModal/BookingModal";

export const ticketProps = {
  logos: [wizzAirLogo, airMoldovaLogo, airMoldovaLogo],
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

export default function FlightResultsMultiway_M({ t }) {
  const [dummyData, setDummyData] = useState(null);
  const [dummyData2, setDummyData2] = useState(null);
  const [isActiveSection1, setIsActiveSection1] = useState(true);
  const [selectedTab, setSelectedTab] = useState("tur");
  const [iconTur, setIconTur] = useState("plane");
  const [iconRetur, setIconRetur] = useState("plane");
  const [selectedTicketIdSection1, setSelectedTicketIdSection1] = useState("");
  const [selectedTicketIdSection2, setSelectedTicketIdSection2] = useState("");
  const [ticketDetailsId, setTicketDetailsId] = useState("");
  const [filtersPositionRelative, setFiltersPositionRelative] = useState(false);
  useEffect(() => {
    let temp1 = [];
    let temp2 = [];
    localStorage.setItem("selectedTicketCount", 0);
    localStorage.setItem("tur", 0);
    localStorage.setItem("retur", 0);
    for (let i = 0; i < 10; i++) {
      temp1.push("dummy");
      temp2.push("dummy");
    }
    setDummyData(temp1);
    setDummyData2(temp2);

    const scrollHandler = () => {
      if (window.scrollY >= 456) {
        dom(`.${styles.sidesWrapper}`).style.marginTop = "50px";
      } else {
        dom(`.${styles.sidesWrapper}`).style.marginTop = "0px";
      }
      const container = dom(`.${styles.container}`);
      if (window.outerHeight - container.getBoundingClientRect().bottom > 55) {
        // reached end of container
        // set filters to position relative;
        setFiltersPositionRelative(true);
      } else {
        // set filters to position fixed
        setFiltersPositionRelative(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      localStorage.removeItem("selectedTicketCount");
      localStorage.removeItem("tur");
      localStorage.removeItem("retur");
    };
  }, []);

  const receiveSelectedSection = (section) => {
    const mainWrapper = dom(`.${styles.mainWrapper}`);
    const mainWrapper2 = dom(`.${styles.mainWrapper2}`);
    if (section === "tur") {
      setSelectedTab("tur");
      if (mainWrapper2) {
        mainWrapper2.classList.add(styles.slideLeftReverse);
        setTimeout(() => {
          setIsActiveSection1(true);
        }, 100);
      } else {
        setIsActiveSection1(true);
      }
    } else {
      setSelectedTab("retur");

      if (mainWrapper) {
        mainWrapper.classList.add(styles.slideRightReverse);
        setTimeout(() => {
          setIsActiveSection1(false);
        }, 100);
      } else {
        setIsActiveSection1(false);
      }
    }
  };

  const [renderTicketDetailsModal, setRenderTicketDetailsModal] = useState(
    false
  );
  const [renderBookingModal, setRenderBookingModal] = useState(false);
  const openModal = (id, clickedOnPreviouslySelectedTicket) => {
    if (clickedOnPreviouslySelectedTicket) {
      setSelectedTicketIdSection1("");
      setSelectedTicketIdSection2("");
      setIconTur("plane");
      setIconRetur("plane");
      setSelectedTab("tur");
      localStorage.setItem("selectedTicketCount", 0);
      localStorage.setItem("tur", 0);
      localStorage.setItem("retur", 0);
      return;
    }
    setTicketDetailsId(id);
    setRenderTicketDetailsModal(true);
    document.querySelector("html").style.overflow = "hidden";
    document.querySelector("html").style.height = "100vh";
  };
  const unmountTicketDetailsModal = () => {
    setRenderTicketDetailsModal(false);
  };

  const receiveChosenTicketFromSection1 = (id) => {
    setIsActiveSection1(false);
    setSelectedTab("retur");
    setIconTur("checkmark");
    setSelectedTicketIdSection1(id);
  };

  const receiveChosenTicketFromSection2 = (id) => {
    console.log("called");
    localStorage.setItem("selectedTicketCount", 1);
    setIsActiveSection1(true);
    setSelectedTab("tur");
    setIconRetur("checkmark");

    // ??
    setSelectedTicketIdSection2(id);
  };

  return (
    <>
      <div className={styles.container}>
        <FlightResultsHeader t={t} />
        {/* <Filters mainWrapperAnimationClass={styles.mainWrapperAnimationClass} /> */}
        <SectionTabs
          iconTur={iconTur}
          iconRetur={iconRetur}
          selectedTab={selectedTab}
          passSelectedOption={receiveSelectedSection}
        />
        <div className={styles.sidesWrapper}>
          {isActiveSection1 ? (
            <div
              id='mainWrapperId'
              // className={`${styles.mainWrapper} ${styles.mainWrapperAnimationClass}`}
              className={`${styles.mainWrapper} ${styles.slideRight} `}
            >
              <MainHeader from='Кишинёв' to='Лондон' />
              <div className={styles.tickets}>
                {dummyData &&
                  dummyData.map((item, index) => {
                    return (
                      <MainTicket
                        selectedTicketId={selectedTicketIdSection1}
                        key={index}
                        ticketProps={ticketProps}
                        id={`mt${index + 1}`}
                        baggage={index % 2 === 0 ? true : false}
                        openTicketDetailsModal={openModal}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <div
              id='mainWrapperId2'
              // className={`${styles.mainWrapper2} ${styles.mainWrapperAnimationClass}`}
              className={`${styles.mainWrapper2} ${styles.slideLeft}`}
            >
              <MainHeader from='Лондон' to='Кишинёв' />
              <div className={styles.tickets}>
                {dummyData2 &&
                  dummyData2.map((item, index) => {
                    return (
                      <MainTicket
                        selectedTicketId={selectedTicketIdSection2}
                        key={index}
                        ticketProps={ticketProps}
                        id={`mt2${index + 1}`}
                        baggage={index % 2 === 0 ? true : false}
                        openTicketDetailsModal={openModal}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <Filters
          positionRelativeClass={
            filtersPositionRelative ? "positionRelativeClass" : ""
          }
          mainWrapperAnimationClass={styles.mainWrapperAnimationClass}
        />
      </div>

      {renderTicketDetailsModal ? (
        <TicketDetailsModal
          ticketDetailsId={ticketDetailsId}
          renderBookingModal={() => setRenderBookingModal(true)}
          unmountModal={unmountTicketDetailsModal}
          openFromSection={isActiveSection1 ? "section1" : "section2"}
          passChosenTicketFromSection1={receiveChosenTicketFromSection1}
          passChosenTicketFromSection2={receiveChosenTicketFromSection2}
        />
      ) : null}
      {renderBookingModal ? (
        <BookingModal unmountModal={() => setRenderBookingModal(false)} />
      ) : null}
    </>
  );
}
