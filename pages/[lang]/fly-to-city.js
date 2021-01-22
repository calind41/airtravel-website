import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import FlyToCityComponent from "../../components/FlyToCity/FlyToCity";

import { cloudsSvg } from "../../components/SearchFlightForm/svg";
import { useState, useEffect } from "react";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlightForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import FlyToCityComponent_M from "../../components_mobile/FlyToCity/FlyToCity";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function FlyToCity({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <CustomHead title='Fly to City' leafletMap={true} />
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlightForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <FlyToCityComponent_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId4'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <FlyToCityComponent t={t} />
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

FlyToCity.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "popularDestinationsHelpAndAdvice",
    "ticketSubset",
    "subscribeDiscount",
    "flyToCity",
    "mobileHeader",
  ],
});

export default withTranslation("common")(FlyToCity);
