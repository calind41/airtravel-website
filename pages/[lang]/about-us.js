import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import SearchFlighForm from "../../components/SearchFlightForm/SearchFlightForm";
import ExperienceIfly from "../../components/About/ExperienceIfly/ExperienceIfly";
import Services from "../../components/About/Services/Services";

import Facts from "../../components/About/Facts/Facts";
import DiscountOffer from "../../components/About/DiscountOffer/DiscountOffer";
import { cloudsSvg } from "../../components/SearchFlightForm/svg";

// mobile
import Layout_M from "../../components_mobile/Layout/Layout";
import SearchFlighForm_M from "../../components_mobile/SearchFlightForm/SearchFlightForm";
import ExperienceIfly_M from "../../components_mobile/About/ExperienceIfly/ExperienceIfly";
import Services_M from "../../components_mobile/About/Services/Services";
import Facts_M from "../../components_mobile/About/Facts/Facts";
import DiscountOffer_M from "../../components_mobile/About/DiscountOffer/DiscountOffer";

import useWindowSize from "../../helpers/useWindowSize";
import CustomHead from "../../helpers/CustomHead";

import { withTranslation, i18n } from "../../i18n";
import MobileHeader from "../../components/HomePage/Header/MobileHeader/MobileHeader";

function AboutUs({ t }) {
  const { width } = useWindowSize();
  const getLanguageSpecificContent = (key) => {
    return t(`aboutUs:${key}`);
  };

  return (
    <div>
      <CustomHead title='About Us' />
      {width === 0 ? null : width < 780 ? (
        <>
          {/* mobile_v */}
          <Layout_M t={t} noNavbar={true}>
            {/* <SearchFlighForm_M inAboutUs={true} /> */}
            <MobileHeader mode='light' />
            <ExperienceIfly_M />
            <div id='servicesWrapper'>
              <p>{t("aboutUs:servicesWrapper-header")}</p>
              <div>
                <Services_M />
              </div>
            </div>
            <Facts_M />
            <DiscountOffer_M
              containerClass={["marginTopZero", "marginBottom100"]}
              inAboutUs={true}
            />
          </Layout_M>
          <style jsx>{`
            #servicesWrapper {
              position: relative;
              min-height: 300px;
              width: 91.78vw;
              margin: auto;
            }
            #servicesWrapper p {
              position: relative;
              top: 50px;
              font-size: 19px;
              color: #212121;
              width: 100%;
            }
            #servicesWrapper div {
              position: relative;
              height: 770px;
            }

            @media screen and (min-width: 375px) {
              #servicesWrapper {
                width: 344.17px;
              }
            }
          `}</style>
        </>
      ) : (
        <>
          <Layout t={t} noNavbar={true}>
            <div id='cloudsSvgId'>{cloudsSvg}</div>
            <SearchFlighForm t={t} inAboutUs={true} />
            <ExperienceIfly t={t} />
            <div id='servicesWrapper'>
              <p>{getLanguageSpecificContent("servicesWrapper-header")}</p>
              <div>
                <Services t={t} />
              </div>
            </div>
            <Facts t={t} />
            <div id='discountOfferId'>
              <DiscountOffer t={t} inAboutUs={true} />
            </div>
          </Layout>
          <style jsx>
            {`
              #cloudsSvgId {
                position: absolute;
                top: 120px;
                width: 100%;
                overflow: hidden;
                right: 0;
                left: 0;
                margin-left: auto;
                margin-right: auto;
              }
              #servicesWrapper {
                position: relative;
                top: 211px;
                width: 964px;
                margin: auto;
              }
              #servicesWrapper p {
                position: relative;
                left: -0px;
                top: -170px;

                font-size: 22.4px;
                color: #212121;
                width: 353px;
                width: 964px;
                margin: auto;
              }
              #servicesWrapper div {
                position: relative;
                bottom: 275px;
              }
              #discountOfferId {
                position: relative;
                bottom: 107px;
              }
              @media screen and (max-width: 1140px) {
                #servicesWrapper {
                  position: relative;
                  width: 662px;
                }
                #servicesWrapper p {
                  position: relative;
                  left: -0px;
                  top: -170px;
                  width: 662px;
                }
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
    "services",
    "footer",
    "discountOffer",
    "aboutUs",
    "mobileHeader",
  ],
});

export default withTranslation("common")(AboutUs);
