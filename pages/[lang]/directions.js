import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import DirectionSearch from "../../components/DirectionSearch/DirectionSearch";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import { cloudsSvg } from "../../components/SearchFlightForm/svg";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import PopularDestinations_M from "../../components_mobile/PopularDestinations/PopularDestinations";
import SearchFlighForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import DirectionSearch_M from "../../components_mobile/DirectionSearch/DirectionSearch";

import useWindowSize from "../../helpers/useWindowSize";
import { withTranslation } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function Directions({ t }) {
  const { width } = useWindowSize();

  return (
    <div>
      <Head>
        <title>Directions</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, minimum-scale=1'
        />
      </Head>
      {width === 0 ? null : width < 780 ? (
        //  {/* mobile_v */}
        <Layout_M t={t} noNavbar={true}>
          {/* <SearchFlighForm_M inAboutUs={true} /> */}
          <MobileHeader mode='light' />
          <DirectionSearch_M />
          <PopularDestinations_M />
        </Layout_M>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId2'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <DirectionSearch t={t} />
            <div id='popularDestContainer'>
              <PopularDestinations t={t} />
            </div>
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
              #popularDestContainer {
                margin-top: 50px;
              }
            `}
          </style>
        </>
      )}
    </div>
  );
}

Directions.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "subscribeDiscount",
    "popularDestinationsHelpAndAdvice",
    "directions",
    "mobileHeader",
  ],
});

export default withTranslation("common")(Directions);
