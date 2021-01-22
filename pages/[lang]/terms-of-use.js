import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import TermsOfUse from "../../components/TermsOfUse/TermsOfUse";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import TermsOfUse_M from "../../components_mobile/TermsOfUse/TermsOfUse";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function TermsOfUsePage({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Terms of Use' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <TermsOfUse_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <TermsOfUse t={t} />
        </Layout>
      )}
    </div>
  );
}

TermsOfUsePage.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "termsOfUse", "mobileHeader"],
});

export default withTranslation("common")(TermsOfUsePage);
