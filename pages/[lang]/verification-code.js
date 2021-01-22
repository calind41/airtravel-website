import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import VerificationCode from "../../components/Registration/VerificationCode/VerificationCode";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import VerificationCodeC_M from "../../components_mobile/Registration/VerificationCodeC/VerificationCodeC";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function VerificationCodePage({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Verification Code' />
      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <VerificationCodeC_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <VerificationCode t={t} />
        </Layout>
      )}
    </div>
  );
}

VerificationCodePage.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "verificationCode", "mobileHeader"],
});

export default withTranslation("common")(VerificationCodePage);
