import React, { useEffect } from "react";
import styles from "./PaymentPage.module.scss";
import IflyWarrant from "./IflyWarrant/IflyWarrant";
import UserTicket from "./UserTicket/UserTicket";
import InsuranceOptions from "./InsuranceOptions/InsuranceOptions";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import FlightTicketSummary from "../PassengerInformationPage/FlightTicketSummary/FlightTicketSummary";
import PhoneCard from "../PassengerInformationPage/PhoneCard/PhoneCard";
import { arrowSvg } from "../PassengerInformationPage/svg";
import { useRouter } from "next/router";

// import { i18n } from "../../i18n";

export default function PaymentPage({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`payment:${key}`);
  };
  const router = useRouter();
  useEffect(() => {
    window.scroll(0, 0);
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
      <nav>
        <span onClick={toSearchTickets}>
          {getLanguageSpecificContent("search")}
          <span>{arrowSvg}</span>
        </span>
        <span onClick={toBooking}>
          {getLanguageSpecificContent("passengerInfo")}
          <span>{arrowSvg}</span>
        </span>
        <span onClick={toPayment}>{getLanguageSpecificContent("payment")}</span>
      </nav>
      <main>
        <UserTicket t={t} />
        <IflyWarrant t={t} />
        <InsuranceOptions t={t} />
        <PaymentMethods t={t} />
      </main>
      <aside>
        <FlightTicketSummary t={t} />
        <PhoneCard t={t} />
      </aside>
    </div>
  );
}
