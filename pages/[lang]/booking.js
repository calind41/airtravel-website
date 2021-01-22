import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import PassengerInformationPage from "../../components/PassengerInformationPage/PassengerInformationPage";

import Layout_M from "../../components_mobile/Layout/Layout";
import PassengerInformationPage_M from "../../components_mobile/PassengerInformationPage/PassengerInformationPage";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";
import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function Booking({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Booking' />

      {width === 0 ? null : width < 780 ? (
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <PassengerInformationPage_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true} noFooter={true}>
          <Header t={t} mode='light' />
          <PassengerInformationPage t={t} />
        </Layout>
      )}
    </div>
  );
}

Booking.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "booking",
    "flightTicketSummary",
    "phoneCard",
    "mobileHeader",
  ],
});

export default withTranslation("common")(Booking);
