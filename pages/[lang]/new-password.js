import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import NewPassword from "../../components/PasswordReset/NewPassword/NewPassword";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import NewPassword_M from "../../components_mobile/PasswordReset/NewPassword/NewPassword";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function newPassword({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='New Password' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <NewPassword_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <NewPassword t={t} />
        </Layout>
      )}
    </div>
  );
}

newPassword.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "newPassword", "mobileHeader"],
});

export default withTranslation("common")(newPassword);
