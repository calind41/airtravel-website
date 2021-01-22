import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import AirCompaniesSearch from "../../components/AirCompanySearch/AirCompanySearch";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import { cloudsSvg } from "../../components/SearchFlightForm/svg";
import HelpAndAdvice from "../../components/HelpAndAdvice/HelpAndAdvice";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import AirCompanySearch_M from "../../components_mobile/AirCompanySearch/AirCompanySearch";
import PopularDestinations_M from "../../components_mobile/PopularDestinations/PopularDestinations";
import SearchFlighForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function AirCompanies({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Air Companies' />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlighForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <AirCompanySearch_M />
          <PopularDestinations_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId2'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <AirCompaniesSearch t={t} />
            <PopularDestinations t={t} />
          </Layout>
          <style jsx>
            {`
              #cloudsSvgId2 {
                position: absolute;
                top: 120px;
                width: 100%;
                overflow: hidden;
                right: 0;
                left: 0;
                margin-left: auto;
                margin-right: auto;
              }
            `}
          </style>
        </>
      )}
    </div>
  );
}

AirCompanies.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "subscribeDiscount",
    "popularDestinationsHelpAndAdvice",
    "airCompanies",
    "mobileHeader",
  ],
});

export default withTranslation("common")(AirCompanies);
