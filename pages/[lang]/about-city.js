import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";

import { cloudsSvg } from "../../components/SearchFlightForm/svg";
import AboutCity from "../../components/AboutCity/AboutCity";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlightForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import AboutCity_M from "../../components_mobile/AboutCity/AboutCity";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation, i18n } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function AboutCityPage({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='About City' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlightForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <AboutCity_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId5'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <AboutCity t={t} />
          </Layout>
          <style jsx>
            {`
              #cloudsSvgId5 {
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

AboutCityPage.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "aboutCity",
    "popularDestinationsHelpAndAdvice",
    "ticketSubset",
    "subscribeDiscount",
    "discountOffer",
    "mobileHeader",
  ],
});

export default withTranslation("common")(AboutCityPage);
