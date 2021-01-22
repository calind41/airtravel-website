import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import PaymentPage from "../../components/PaymentPage/PaymentPage";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import PaymentPage_M from "../../components_mobile/PaymentPage/PaymentPage";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function Payment({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Payment' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <PaymentPage_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true} noFooter={true}>
          <Header t={t} mode='light' />
          <PaymentPage t={t} />
        </Layout>
      )}
    </div>
  );
}

Payment.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "flightTicketSummary",
    "phoneCard",
    "payment",
    "mobileHeader",
  ],
});

export default withTranslation("common")(Payment);
