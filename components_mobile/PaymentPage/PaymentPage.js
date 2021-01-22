import React, { useState, useEffect } from "react";
import styles from "./PaymentPage.module.scss";
import IflyWarrant from "./IflyWarrant/IflyWarrant";
import UserTicket from "./UserTicket/UserTicket";
import InsuranceOptions from "./InsuranceOptions/InsuranceOptions";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import FlightTicketSummary from "../PassengerInformationPage/FlightTicketSummary/FlightTicketSummary";
import PhoneCard from "../PassengerInformationPage/PhoneCard/PhoneCard";
import { arrowSvg } from "../PassengerInformationPage/svg";
import { useRouter } from "next/router";

import { i18n } from "../../i18n";

export default function PaymentPage_M() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`payment:${key}`);
  };

  const router = useRouter();
  useEffect(() => {
    window.scroll(0, 0);

    function onScrollPaymentPage(ev) {
      const paymentMethod = document.querySelector(`.${styles.paymentMethod}`);
      const summary = document.querySelector(`.${styles.summary}`);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        // setRenderedSummary(true);
        summary.classList.add(styles.summaryShow);
        paymentMethod.classList.remove(styles.paymentMethodShow);
      } else {
        // setRenderedSummary(false);
        summary.classList.remove(styles.summaryShow);
        paymentMethod.classList.add(styles.paymentMethodShow);
      }
    }

    window.addEventListener("scroll", onScrollPaymentPage);

    return () => {
      window.removeEventListener("scroll", onScrollPaymentPage);
    };
  });

  const toBooking = () => {
    router.push("/booking");
  };
  const toPayment = () => {
    router.push("/payment");
  };
  const toSearchTickets = () => {
    router.push("/flight-search-result");
  };
  return (
    <div className={styles.container}>
      <main>
        <UserTicket />
        <IflyWarrant />
        <InsuranceOptions />
        <PaymentMethods />
      </main>
      <aside>
        <PhoneCard />
      </aside>

      <div className={styles.summary}>
        <div className={styles.wrapper}>
          <div className={styles.ticketCost}>
            <div>
              1
              {getLanguageSpecificContent("mobile-summaryCard-passengerSingle")}
              {/* {getLanguageSpecificContent("mobile-summaryCard-passengerMultiple")} */}
            </div>
            <div>249$</div>
          </div>
          <div className={styles.insuranceCost}>
            <div>
              {getLanguageSpecificContent("mobile-summaryCard-insurance")}
            </div>
            <div>56$</div>
          </div>
          <div className={styles.total}>
            <div>{getLanguageSpecificContent("mobile-summaryCard-total")}</div>
            <div className={styles.finalPrice}>305$</div>
          </div>
        </div>
      </div>

      <div className={`${styles.paymentMethod} ${styles.paymentMethodShow}`}>
        <div className={styles.wrapper}>
          <div>{getLanguageSpecificContent("PaymentMethods-title")}</div>
          <div className={styles.finalPrice}>305$</div>
        </div>
      </div>
    </div>
  );
}
