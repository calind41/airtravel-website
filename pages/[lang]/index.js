import Head from "next/head";
// import HomePage from "../components/HomePage/HomePage";
import Header from "../../components/HomePage/Header/Header";
import CardSlider from "../../components/About/CardSlider/CardSlider";

import Layout from "../../components/Layout/Layout";
import Services from "../../components/About/Services/Services";
import TravelCategories from "../../components/About/TravelCategories/TravelCategories";
import InterestingFact from "../../components/About/InterestingFact/InterestingFact";
import DiscountOffer from "../../components/About/DiscountOffer/DiscountOffer";
import SearchFlightForm from "../../components/SearchFlightForm/SearchFlightForm";

import VerticalSearchForm from "../../components/VerticalSearchForm/VerticalSearchForm";

// mobile_v imports
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlightForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import Services_M from "../../components_mobile/About/Services/Services";
import TravelCategories_M from "../../components_mobile/About/TravelCategories/TravelCategories";
import InterestingFact_M from "../../components_mobile/About/InterestingFact/InterestingFact";
import DiscountOffer_M from "../../components_mobile/About/DiscountOffer/DiscountOffer";
import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";
import NewSearchFlightForm from "../../components_mobile/SearchFlightForm/NewSearchFlightForm/NewSearchFlightForm";
import GetPhoneNrModal from "../../components_mobile/GetPhoneNrModal/GetPhoneNrModal";
import Loader from "../../components_mobile/Loader/Loader";

import { useState, useEffect } from "react";
import { withTranslation, i18n } from "../../i18n";

function Home({ t }) {
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("in use effect ", process.env.NEXT_PUBLIC_API_KEY);
    console.log("in use effect, db_host var is ", process.env.DB_HOST);
    console.log("language is ", i18n.language);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div>
      <CustomHead title='Landing Page' />
      {isLoading ? <Loader /> : null}
      {/* <GetPhoneNrModal /> */}

      {width === 0 ? null : width < 780 ? (
        <>
          <Layout_M t={t} noNavbar={true}>
            {/* <SearchFlightForm_M inLandingPage={true} /> */}
            <NewSearchFlightForm />
            <Services_M />
            <TravelCategories_M />
            <InterestingFact_M />
            <DiscountOffer_M />
          </Layout_M>
        </>
      ) : (
        <Layout t={t} noNavbar={true}>
          <SearchFlightForm
            t={t}
            inLandingPage={true}
            positionLocationClass='positionLocationClass'
          />
          {/* <VerticalSearchForm /> */}
          <CardSlider />
          <Services t={t} />
          <TravelCategories t={t} />
          <InterestingFact t={t} />
          <DiscountOffer t={t} />
        </Layout>
      )}
    </div>
  );
}

// export async function getStaticProps() {
//   console.log(process.env.DB_HOST);
//   return { props: {}, namespacesRequired: ["common"] };
// }

Home.getInitialProps = async () => ({
  namespacesRequired: [
    "common",
    "monthNames",
    "daysOfWeek",
    "services",
    "travelCategories",
    "interestingFact",
    "discountOffer",
    "footer",
    "searchFlightFormMobile",
    "mobileHeader",
  ],
});

// export async function getStaticPaths() {
//   const paths = [
//     {
//       params: {
//         id: "ro",
//       },
//     },
//   ];
//   return { paths, fallback: false };
// }
// export async function getStaticProps({ params }) {
//   return {
//     props: {},
//   };
// }
export default withTranslation("common")(Home);
