import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Registration from "../../components/Registration/Registration";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import Registration_M from "../../components_mobile/Registration/Registration";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function Register({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Registration' />
      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <Registration_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <Registration t={t} />
        </Layout>
      )}
    </div>
  );
}

Register.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "register", "auth", "mobileHeader"],
});

export default withTranslation("common")(Register);
