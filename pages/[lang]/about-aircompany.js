import Head from "next/head";
import AirCompanyAbout from "../../components/AirCompanyAbout/AirCompanyAbout";
import Layout from "../../components/Layout/Layout";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import { cloudsSvg } from "../../components/SearchFlightForm/svg";

// mobile
import AirCompanyAbout_M from "../../components_mobile/AirCompanyAbout/AirCompanyAbout";
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlighForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation, i18n } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function AboutUs({ t }) {
  const { width } = useWindowSize();
  return (
    <div>
      <CustomHead title='About Aircompany' />

      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlighForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <AirCompanyAbout_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId3'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <AirCompanyAbout t={t} />
          </Layout>
          <style jsx>
            {`
              #cloudsSvgId3 {
                position: absolute;
                top: 90px;
                width: 100%;
                right: 0;
                left: 0;
                margin-left: auto;
                margin-right: auto;
                overflow: hidden;
              }
            `}
          </style>
        </>
      )}
    </div>
  );
}

AboutUs.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "aboutAircompany",
    "popularDestinationsHelpAndAdvice",
    "subscribeDiscount",
    "mobileHeader",
  ],
});

export default withTranslation("common")(AboutUs);
