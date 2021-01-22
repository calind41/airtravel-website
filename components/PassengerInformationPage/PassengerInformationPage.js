import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./PassengerInformationPage.module.scss";

import PassengerInformationForm from "./PassengerInformationForm/PassengerInformationForm";

import { planeSvg, arrowSvg } from "./svg";
import ContactInformation from "./ContactInformation/ContactInformation";
import FlightTicketSummary from "./FlightTicketSummary/FlightTicketSummary";
import PhoneCard from "./PhoneCard/PhoneCard";

// import { i18n } from "../../i18n";

export default function PassengerInformationPage({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`booking:${key}`);
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);
  const router = useRouter();
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
      <nav>
        <span onClick={toSearchTickets}>
          {getLanguageSpecificContent("header-search")}
          <span>{arrowSvg}</span>
        </span>
        <span onClick={toBooking}>
          {getLanguageSpecificContent("header-passengerInfo")}
          <span>{arrowSvg}</span>
        </span>
        <span onClick={toPayment}>
          {getLanguageSpecificContent("header-payment")}
        </span>
      </nav>
      <main>
        <PassengerInformationForm t={t} />
        <ContactInformation t={t} />
        <Button getLanguageSpecificContent={getLanguageSpecificContent} />
      </main>
      <aside>
        <FlightTicketSummary t={t} />
        <PhoneCard t={t} />
      </aside>
    </div>
  );
}

const Button = ({ getLanguageSpecificContent }) => {
  const router = useRouter();
  const toPaymentPage = () => {
    router.push("/payment");
  };
  return (
    <div onClick={toPaymentPage} className={styles.btn}>
      <span>{getLanguageSpecificContent("btn-text")}</span>
      <span>{planeSvg}</span>
    </div>
  );
};
