import Head from "next/head";
import Layout from "../../../../components/Layout/Layout";
import SearchFlightsFilter from "../../../../components/FlightTickets/SearchFlightsFilter/SearchFlightsFilter";
import { SearchForm } from "../../../../components/SearchFlightForm/SearchFlightForm";
import Test from "../../../../components/FlightResults/multiway/Test";

import Layout_M from "../../../../components_mobile/Layout/Layout";
import SearchFlightsFilter_M from "../../../../components_mobile/FlightTickets/SearchFlightsFilter/SearchFlightsFilter";
import FlightResultsMultiway_M from "../../../../components_mobile/FlightResults/multiway/FlightResultsMultiway_M";

import useWindowSize from "../../../../helpers/useWindowSize";
import CustomHead from "../../../../helpers/CustomHead";

import { withTranslation } from "../../../../i18n";
import Header from "../../../../components/HomePage/Header/Header";
import MobileHeader from "../../../../components/HomePage/Header/MobileHeader/MobileHeader";

import { useEffect } from "react";
function FlightSearchResult({ t }) {
  const { width } = useWindowSize();

  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "#fff";
  }, []);

  return (
    <div id='flightSearchResult' className='flightSearchResult'>
      <CustomHead title='Flight Search Results' />

      {width === 0 ? null : width < 780 ? (
        // {/* mobile_v */}
        <Layout_M
          t={t}
          noNavbar={true}
          navClass='hamburgerMenuDark menuWrapperDark'
        >
          {/* <MobileHeader mode='light' /> */}
          {/* <SearchFlightsFilter_M /> */}
          <FlightResultsMultiway_M t={t} />
        </Layout_M>
      ) : (
        <Layout t={t} noNavbar={true}>
          {/* <Header mode='light' /> */}
          {/* <SearchForm t={t} inFlightSearchResults={true} /> */}
          {/* <SearchFlightsFilter /> */}
          {/* <FlightResults t={t} /> */}
          {/* <FlightResultsMultiWay t={t} /> */}
          <Test t={t} />
        </Layout>
      )}
    </div>
  );
}

FlightSearchResult.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "footer",
    "flightSearchResult",
    "mobileHeader",
  ],
});

export default withTranslation("common")(FlightSearchResult);
