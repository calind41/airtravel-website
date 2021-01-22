import React, { useState, useEffect } from "react";
import styles from "./BookingModal.module.scss";
import { goBackIcon } from "../Filters/FiltersModal/FiltersModal";
import { ticketProps } from "../FlightResultsMultiway_M";
import TicketDetailsModal from "../MainTicket/TicketDetailsModal/TicketDetailsModal";
import { dom } from "../../../../helpers/reuse";

export default function BookingModal({ unmountModal, headerTicket }) {
  const closeBookingModal = () => {
    dom(`.${styles.goBackWrapper}`).style.transform = "scale(0.8)";
    setTimeout(() => {
      dom(`.${styles.container}`).classList.remove(styles.slideLeft);
      dom(`.${styles.container}`).classList.add(styles.slideRight);
    }, 50);

    setTimeout(() => {
      unmountModal();
    }, 500);
  };
  const [scrollableContainerHeight, setScrollableContainerHeight] = useState(
    ""
  );
  useEffect(() => {
    const header_bottom = dom(`.${styles.header}`).getBoundingClientRect()
      .bottom;
    const footer_top = dom(`.${styles.footer}`).getBoundingClientRect().top;
    const scrollableContainerHeight = footer_top - header_bottom;
    setScrollableContainerHeight(scrollableContainerHeight);
    dom(`.${styles.scrollableContainer}`).style.height =
      scrollableContainerHeight + "px";
  }, []);

  return (
    <div className={`${styles.container} ${styles.slideLeft}`}>
      <div className={styles.header}>
        <div
          onClick={(evt) => {
            closeBookingModal();
          }}
          className={styles.goBackWrapper}
        >
          <div className={styles.goBackIcon}>{goBackIcon}</div>
          <div className={styles.all}>Все</div>
        </div>
        <div className={styles.title}>Ваш билет</div>
      </div>
      <div className={styles.scrollableContainer}>
        {headerTicket ? (
          <BaggageOptions />
        ) : (
          <div className={styles.booking}>
            <div className={styles.wrapper1}>
              <div className={styles.title}>Бронирование</div>
              <div className={styles.psngAndType}>1 пассажир, эконом</div>
            </div>
            <div className={styles.baggageWrapper2}>
              <div className={styles.infoWrapper}>
                <div className={styles.b1}>
                  <div className={styles.icon}>{b1Icon}</div>
                  <div className={styles.count}>x1</div>
                </div>
                <div className={styles.b2}>
                  <div className={styles.icon}>{b2Icon}</div>
                  <div className={styles.count}>8</div>
                </div>
                <div className={styles.text}>С багажом</div>
              </div>
              <div className={styles.checkIcon}>{checkIcon}</div>
            </div>
            <div className={styles.bookingFooter}>
              Багаж 1 место. Ручная кладь 1 место до 8 кг
            </div>
          </div>
        )}
        <div className={styles.chosenTicket}>
          <div className={styles.info}>
            <div className={styles.route}>Кишинёв – Лондон</div>
            <div className={styles.date}>2 апреля, пятница</div>
          </div>
          <TicketInModal
            scrollableContainerHeight={scrollableContainerHeight}
          />
        </div>
        <div style={{ marginBottom: "32px" }} className={styles.chosenTicket}>
          <div className={styles.info}>
            <div className={styles.route}>Лондон – Кишинёв</div>
            <div className={styles.date}>3 апреля, пятница</div>
          </div>
          <TicketInModal
            scrollableContainerHeight={scrollableContainerHeight}
          />
        </div>
      </div>
      <div id='bookingModalFooterId' className={styles.footer}>
        <div className={styles.title}>Предложение</div>
        <div className={styles.lower}>
          <div className={styles.priceWrapper}>
            <div className={styles.title}>MEGO.travel</div>
            <div className={styles.subtitle}>Покупка у партнера</div>
            <div className={styles.subtitle2}>Кэшбэк и бонусы начисляются</div>
          </div>
          <div onClick={(evt) => {}} className={styles.showButton}>
            320 $
          </div>
        </div>
      </div>
    </div>
  );
}

function BaggageOptions() {
  const [withBaggage, setWithBaggage] = useState(false);
  const selectOption = (wb) => {
    const b1 = dom(`#withBtn`);
    const b2 = dom(`#withoutBtn`);
    if (wb) {
      b1.classList.remove(styles.hidden);
      b2.classList.add(styles.hidden);
    } else {
      b1.classList.add(styles.hidden);
      b2.classList.remove(styles.hidden);
    }
    setWithBaggage(wb);
  };
  return (
    <div className={styles.baggageOptionsContainer}>
      <div onClick={() => selectOption(false)} className={styles.booking}>
        <div className={styles.wrapper1}>
          <div className={styles.title}>Бронирование</div>
          <div className={styles.psngAndType}>1 пассажир, эконом</div>
        </div>
        <div className={styles.baggageWrapper2}>
          <div className={styles.infoWrapper}>
            <div className={`${styles.b1} ${styles.noBaggage}`}>
              <div className={styles.icon}>{b1Icon}</div>
              <div className={styles.count}>x</div>
            </div>
            <div className={styles.b2}>
              <div className={styles.icon}>{b2Icon}</div>
              <div className={styles.count}>x1</div>
            </div>
            <div className={styles.text}>Без багажа</div>
          </div>
          <div className={styles.checkButton}>
            <div id='withoutBtn' className={styles.selected}></div>
          </div>
        </div>
      </div>
      <div onClick={() => selectOption(true)} className={styles.booking}>
        <div className={styles.baggageWrapper2}>
          <div className={styles.infoWrapper}>
            <div className={styles.b1}>
              <div className={styles.icon}>{b1Icon}</div>
              <div className={styles.count}>1</div>
            </div>
            <div className={styles.b2}>
              <div className={styles.icon}>{b2Icon}</div>
              <div className={styles.count}>8</div>
            </div>
            <div className={styles.text}>С багажом</div>
          </div>
          <div className={styles.checkButton}>
            <div
              id='withBtn'
              className={`${styles.selected} ${styles.hidden}`}
            ></div>
          </div>
        </div>
        <div className={styles.bookingFooter}>
          {withBaggage
            ? "Багаж 1 место. Ручная кладь 1 место до 8 кг"
            : "Багаж не включен. Ручная кладь 1 место"}
        </div>
      </div>
    </div>
  );
}

function TicketInModal({ scrollableContainerHeight }) {
  const [newTransfers, setNewTransfers] = useState(null);
  const [renderTicketDetails, setRenderTicketDetails] = useState(false);
  const openTicketDetailsInModal = () => {
    dom(`.${styles.footer}`).classList.add(styles.footerSlideDown);
    dom(`.${styles.footer}`).classList.remove(styles.footerSlideUp);
    dom(`.${styles.scrollableContainer}`).style.overflowY = "visible";
    dom(`.${styles.scrollableContainer}`).style.height =
      scrollableContainerHeight + 170 + "px";
    setTimeout(() => {
      setRenderTicketDetails(true);
    }, 100);
  };
  const unmountTicketDetailsModal = () => {
    setRenderTicketDetails(false);
    dom(`.${styles.footer}`).classList.add(styles.footerSlideUp);
    dom(`.${styles.footer}`).classList.remove(styles.footerSlideDown);
    setTimeout(() => {
      dom(`.${styles.scrollableContainer}`).style.overflowY = "scroll";
      dom(`.${styles.scrollableContainer}`).style.height =
        scrollableContainerHeight + "px";
    }, 300);
  };

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
  const {
    logos,
    departureInfo,
    totalDuration,
    arrivalInfo,
    transferInfo,
  } = ticketProps;
  const l = logos.filter((item, index) => index < 2);
  return (
    <>
      <div onClick={openTicketDetailsInModal} className={styles.ticketInModal}>
        <div className={styles.left}>
          <div className={styles.logos}>
            {l.map((logo, index) => (
              <div
                key={index}
                style={{ zIndex: 10 - index, top: index * -39 + "px" }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
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
      {renderTicketDetails ? (
        <TicketDetailsModal
          inBookingModal={true}
          unmountModal={unmountTicketDetailsModal}
        />
      ) : null}
    </>
  );
}

const b1Icon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.5 5.7H16V3.4C16 2.1 14.9 1 13.5 1h-3C9.1 1 8 2.1 8 3.4v2.3H6.5C5.1 5.8 4 6.8 4 8.2v11.5C4 21 5.1 22 6.5 22H7c0 .5.4 1 .9 1H9c.5 0 .9-.4.9-1H14c0 .5.4 1 .9 1H16c.5 0 1-.4 1-1h.5c1.4 0 2.5-1.1 2.5-2.4V8.2c0-1.4-1.1-2.5-2.5-2.5zm-10 1.6c-1.1 0-2 .9-2 2v9.3c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V9.3c0-1.1-.9-2-2-2h-9zm2-2.9c0-1.1.9-1.9 2-1.9h1c1.1 0 2 .8 2 1.9v1.3h-5V4.4z'
      fill='currentColor'
    ></path>
  </svg>
);

const b2Icon = (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.778 8h-1.334v-.5c0-1.4-.977-2.5-2.222-2.5H9.778C8.533 5 7.556 6.1 7.556 7.5V8H6.222C4.978 8 4 9.1 4 10.5v7c0 1.4.978 2.5 2.222 2.5H17.778C19.022 20 20 18.9 20 17.5v-7c0-1.4-.978-2.5-2.222-2.5zM7.11 9.5c-.978 0-1.778.9-1.778 2v5c0 1.1.8 2 1.778 2h9.778c.978 0 1.778-.9 1.778-2v-5c0-1.1-.8-2-1.778-2H7.11zM8.8 8c0-.8.178-1.6 1.333-1.6h3.734c1.066 0 1.333.8 1.333 1.6H8.8z'
      fill='currentColor'
    ></path>
  </svg>
);
const checkIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M16.293 8.293l-6.294 6.294c.001-.001-2.292-2.294-2.292-2.294a1 1 0 00-1.414 1.414l2.294 2.294c.78.78 2.05.777 2.826 0l6.294-6.294a1 1 0 10-1.414-1.414z'
      fill='currentColor'
    ></path>
  </svg>
);
