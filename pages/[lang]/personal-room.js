import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import UserPersonalArea from "../../components/UserPersonalArea/UserPersonalArea";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import UserPersonalArea_M from "../../components_mobile/UserPersonalArea/UserPersonalArea";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import Header from "../../components/HomePage/Header/Header";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function PersonalRoom({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Personal Room' />
      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M t={t} noNavbar={true} noFooter={true}>
          <MobileHeader mode='light' />
          <UserPersonalArea_M />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          <Header t={t} mode='light' />
          <UserPersonalArea t={t} />
        </Layout>
      )}
    </div>
  );
}

PersonalRoom.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "booking",
    "personalRoom",
    "mobileHeader",
  ],
});

export default withTranslation("common")(PersonalRoom);
