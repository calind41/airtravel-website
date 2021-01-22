import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Authorization from "../../components/Authorization/Authorization";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import Authorization_M from "../../components_mobile/Authorization/Authorization";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function Auth({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Authorization' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <Authorization_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <Authorization t={t} />
        </Layout>
      )}
    </div>
  );
}

Auth.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "auth", "mobileHeader"],
});

export default withTranslation("common")(Auth);
