import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import PasswordReset from "../../components/PasswordReset/PasswordReset";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import PasswordReset_M from "../../components_mobile/PasswordReset/PasswordReset";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function passwordReset({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Password Reset' />
      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <PasswordReset_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <PasswordReset t={t} />
        </Layout>
      )}
    </div>
  );
}

passwordReset.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "passwordReset", "mobileHeader"],
});

export default withTranslation("common")(passwordReset);
