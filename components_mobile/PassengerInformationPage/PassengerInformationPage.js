import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./PassengerInformationPage.module.scss";

import PassengerInformationForm from "./PassengerInformationForm/PassengerInformationForm";

import { planeSvg, arrowSvg } from "./svg";
import ContactInformation from "./ContactInformation/ContactInformation";
import FlightTicketSummary from "./FlightTicketSummary/FlightTicketSummary";
import PhoneCard from "./PhoneCard/PhoneCard";

import { i18n } from "../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`booking:${key}`);
};

export default function PassengerInformationPage_M() {
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
      <main>
        <PassengerInformationForm />
        <ContactInformation />
        <Button />
      </main>
      <aside>
        <PhoneCard />
      </aside>
    </div>
  );
}

const Button = () => {
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
