import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import RentalOptionsComponent from "../../components/AboutCity/RentalOptionsComponent/RentalOptionsComponent";

import { cloudsSvg } from "../../components/SearchFlightForm/svg";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlightForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import RentalOptionsComponent_M from "../../components_mobile/AboutCity/RentalOptionsComponent/RentalOptionsComponent";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function RentalOptions({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Rental Options' leafletMap={true} />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlightForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <RentalOptionsComponent_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId4'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <RentalOptionsComponent t={t} />
          </Layout>
          <style jsx>
            {`
              #cloudsSvgId4 {
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

RentalOptions.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "popularDestinationsHelpAndAdvice",
    "footer",
    "rentalOptions",
    "mobileHeader",
  ],
});

export default withTranslation("common")(RentalOptions);
