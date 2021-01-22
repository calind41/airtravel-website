import React, { useState, useEffect } from "react";
import styles from "./AirCompanyAbout.module.scss";
import { airMoldovaSvg, flyOneSvg, arrowDownSvg } from "./svg";
import { hamburgerSvg } from "../TermsOfUse/svg";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import SubscribeDiscount from "../AirCompanySearch/SubscribeDiscount/SubscribeDiscount";
// import { i18n } from "../../i18n";

export default function AirCompanyAbout({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`aboutAircompany:${key}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.subscribeDiscountWrapper}>
        <SubscribeDiscount t={t} />
      </div>
      <NavigationMenu getLanguageSpecificContent={getLanguageSpecificContent} />

      <About getLanguageSpecificContent={getLanguageSpecificContent} />
      <CompanyInformation
        getLanguageSpecificContent={getLanguageSpecificContent}
      />
      <Ratings getLanguageSpecificContent={getLanguageSpecificContent} />
      <DirectFlights getLanguageSpecificContent={getLanguageSpecificContent} />
      <WhereIsFlying getLanguageSpecificContent={getLanguageSpecificContent} />
      <TravelRules getLanguageSpecificContent={getLanguageSpecificContent} />
      <SimilarAircompanies
        getLanguageSpecificContent={getLanguageSpecificContent}
        logoList={[flyOneSvg]}
      />
      <ClientFeedBack getLanguageSpecificContent={getLanguageSpecificContent} />
      <div className={styles.popularDestinationsWrapper}>
        <PopularDestinations t={t} />
      </div>
    </div>
  );
}

function NavigationMenu({ getLanguageSpecificContent }) {
  useEffect(() => {
    let items = document.querySelectorAll(
      `.${styles.navigationMenuC} > div:not(:first-child)`
    );
    items.forEach((item) => item.addEventListener("click", selectItem));

    return () => {
      items.forEach((item) => item.removeEventListener("click", selectItem));
    };
  }, []);
  const selectItem = (evt) => {
    let items = document.querySelectorAll(
      `.${styles.navigationMenuC} > div:not(:first-child)`
    );
    items.forEach((item) => item.classList.remove(styles.selected));
    if (evt.target.parentNode.classList.contains(styles.navigationMenuC)) {
      evt.target.classList.add(styles.selected);
    } else {
      evt.target.parentNode.classList.add(styles.selected);
    }
  };
  return (
    <aside className={styles.navigationMenuC}>
      <div className={styles.heading}>
        <div> {hamburgerSvg}</div>
        <span>{getLanguageSpecificContent("NavigationMenu-heading")}</span>
      </div>
      <div className={styles.selected}>
        <a href='/about-aircompany#about'>
          {getLanguageSpecificContent("NavigationMenu-aboutAirCompany")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#companyInfo'>
          {getLanguageSpecificContent("NavigationMenu-usefullInfo")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#rating'>
          {getLanguageSpecificContent("NavigationMenu-rating")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#directFlights'>
          {getLanguageSpecificContent("NavigationMenu-directFlights")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#whereIsFlying'>
          {getLanguageSpecificContent("NavigationMenu-direction")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#travelRules'>
          {getLanguageSpecificContent("NavigationMenu-travelRules")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#similarAirCompanies'>
          {getLanguageSpecificContent("NavigationMenu-similarAirC")}
        </a>
      </div>
      <div>
        <a href='/about-aircompany#clientFeedback'>
          {getLanguageSpecificContent("NavigationMenu-clientFeedback")}
        </a>
      </div>
    </aside>
  );
}
function About({ getLanguageSpecificContent }) {
  return (
    <section id='about' className={styles.aboutC}>
      <div className={styles.title}>
        {getLanguageSpecificContent("About-title")}
      </div>
      <div className={styles.companyName}>Air Moldova</div>
      <div className={styles.aboutText}>
        {getLanguageSpecificContent("About-aboutText")}
      </div>
    </section>
  );
}

function CompanyInformation({ getLanguageSpecificContent }) {
  return (
    <section id='companyInfo' className={styles.companyInformationC}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>{airMoldovaSvg}</div>
        <div>
          <div className={styles.address}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-addrTitle")}
            </div>
            <div className={styles.value}>
              {getLanguageSpecificContent("CompanyInformation-addrValue")}
            </div>
          </div>
          <div className={styles.nrPlanes}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-nrPlanesTitle")}
            </div>
            <div className={styles.value}>
              {getLanguageSpecificContent("CompanyInformation-nrPlanesValue")}
            </div>
          </div>
          <div className={styles.websiteUrl}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-urlTitle")}
            </div>
            <div className={styles.value}>
              <a href='http://www.airmoldova.md/' target='_blank'>
                http://www.airmoldova.md/
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.phoneNr}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-phoneNr")}
            </div>
            <div className={styles.value}>+373 22 830 830</div>
          </div>
          <div className={styles.IATAcode}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-codeIATA")}
            </div>
            <div className={styles.value}>9U</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ratings({ getLanguageSpecificContent }) {
  return (
    <>
      <header id='rating' className={styles.ratingsHeader}>
        <h1>{getLanguageSpecificContent("Ratings-h1")}</h1>
        <div className={styles.allReviews}>
          {getLanguageSpecificContent("Ratings-allReviews")}
        </div>
      </header>
      <div className={styles.ratings}>
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-avgMark")}
          value='4.9'
          isMeanRating={true}
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric1")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric2")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric3")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric4")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric5")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric6")}
          value='4.9'
        />
        <Rating
          getLanguageSpecificContent={getLanguageSpecificContent}
          ratingMetric={getLanguageSpecificContent("Ratings-metric7")}
          value='4.9'
        />
      </div>
    </>
  );
}
function Rating({
  getLanguageSpecificContent,
  isMeanRating,
  ratingMetric,
  value,
}) {
  const containerWidth = isMeanRating ? "278px" : "126px";
  return (
    <div style={{ height: containerWidth }} className={styles.ratingContainer}>
      <div className={styles.rating}>
        <div className={styles.title}>{ratingMetric}</div>
        <div className={styles.valueC}>
          <span className={styles.value}>{value}</span>
          <span className={styles.slider}>
            <span></span>
          </span>
        </div>
      </div>
      {isMeanRating ? (
        <div className={styles.rateCta}>
          <div className={styles.title}>
            {getLanguageSpecificContent("Rating-markBasedOn")}
          </div>
          <div className={styles.cta}>
            {getLanguageSpecificContent("Rating-leaveFeedback")}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DirectFlights({ getLanguageSpecificContent }) {
  return (
    <>
      <header id='directFlights' className={styles.directFlightsHeader}>
        {getLanguageSpecificContent("DirectFlights-headerTitle")}
      </header>
      <section className={styles.directFlightsC}>
        <header>
          <div className={styles.wrapper}>
            <div>{getLanguageSpecificContent("DirectFlights-header-val1")}</div>
            <div>{getLanguageSpecificContent("DirectFlights-header-val2")}</div>
            <div>{getLanguageSpecificContent("DirectFlights-header-val3")}</div>
            <div>{getLanguageSpecificContent("DirectFlights-header-val4")}</div>
          </div>
        </header>
        <div className={styles.wrapper}>
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
          <DirectFlight
            getLanguageSpecificContent={getLanguageSpecificContent}
          />
        </div>
      </section>
    </>
  );
}

function DirectFlight({ getLanguageSpecificContent }) {
  const handleClick = (evt) => {
    const dFlights = document.querySelectorAll(
      `.${styles.directFlightsC} .${styles.wrapper} > div`
    );
    dFlights.forEach((item) => {
      item.classList.remove(`${styles.selectedFlight}`);
    });
    if (evt.target.classList.contains(styles.directFlightC))
      evt.target.classList.add(styles.selectedFlight);
    else evt.target.parentNode.classList.add(styles.selectedFlight);
  };
  return (
    <div onClick={handleClick} className={styles.directFlightC}>
      <div className={styles.route}>
        {getLanguageSpecificContent("DirectFlight-route")}
      </div>
      <div className={styles.departureTime}>23:45</div>
      <div className={styles.flightTime}>
        {getLanguageSpecificContent("DirectFlight-flightTime")}
      </div>
      <div className={styles.arrivalTime}>02:15</div>
      <div className={styles.bookBtn}>
        {getLanguageSpecificContent("DirectFlight-bookBtn")}
      </div>
    </div>
  );
}

function WhereIsFlying({ getLanguageSpecificContent }) {
  return (
    <>
      <header id='whereIsFlying' className={styles.whereIsFlyingHeader}>
        Куда летает Air Moldova
      </header>
      <section className={styles.whereIsFlying}>
        <CityCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          city={getLanguageSpecificContent("WhereIsFlying-city1")}
          img='/images/moscow.png'
        />
        <CityCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          city={getLanguageSpecificContent("WhereIsFlying-city2")}
          img='/images/chisinau.png'
        />
        <CityCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          city={getLanguageSpecificContent("WhereIsFlying-city3")}
          img='/images/sankt_peterburg.png'
        />
        <CityCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          city={getLanguageSpecificContent("WhereIsFlying-city4")}
          img='/images/stambul.png'
        />
      </section>
    </>
  );
}

function CityCard({ getLanguageSpecificContent, city, img }) {
  return (
    <div className={styles.cityCard}>
      <div className={styles.image}>
        <img src={img} alt={`${city} image`} />
      </div>
      <div>
        <div>{getLanguageSpecificContent("CityCard-title")}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}

function TravelRules({ getLanguageSpecificContent }) {
  return (
    <>
      <header id='travelRules' className={styles.travelRulesHeader}>
        {getLanguageSpecificContent("TravelRules-header")}
      </header>
      <section className={styles.travelRulesContainer}>
        <div>
          {getLanguageSpecificContent("TravelRules-title1")}
          <br />
          {getLanguageSpecificContent("TravelRules-block1")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-title2")} <br />
          {getLanguageSpecificContent("TravelRules-block2")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-title3")} <br />
          {getLanguageSpecificContent("TravelRules-block3")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-title4")} <br />
          {getLanguageSpecificContent("TravelRules-block4")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-block4-li1")}
          <br />
          {getLanguageSpecificContent("TravelRules-block4-li2")}
          <br />
          {getLanguageSpecificContent("TravelRules-block4-li3")}
          <br />
          {getLanguageSpecificContent("TravelRules-block4-li4")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-title5")}
          <br />
          <br />
          <ul>
            <li>{getLanguageSpecificContent("TravelRules-block5-li1")}</li>
            <li>{getLanguageSpecificContent("TravelRules-block5-li2")}</li>
            <li> {getLanguageSpecificContent("TravelRules-block5-li3")}</li>
            <li>{getLanguageSpecificContent("TravelRules-block5-li4")}</li>
            <li>{getLanguageSpecificContent("TravelRules-block5-li5")}</li>
          </ul>
          <br />
          {getLanguageSpecificContent("TravelRules-block5-1")} <br />
          {getLanguageSpecificContent("TravelRules-block5-2")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-block6-1")}
          <br />
          <br />
          {getLanguageSpecificContent("TravelRules-block6-2")}
        </div>
      </section>
    </>
  );
}

export function SimilarAircompanies({ getLanguageSpecificContent, logoList }) {
  return (
    <>
      <header id='similarAirCompanies' className={styles.similarAirCheader}>
        {getLanguageSpecificContent("SimilarAirCompanies-header")}
      </header>
      <section className={styles.similarAirCompaniesC}>
        {logoList.map((item, idx) => {
          return <div key={idx}>{item}</div>;
        })}
      </section>
    </>
  );
}

function ClientFeedBack({ getLanguageSpecificContent }) {
  return (
    <>
      <header id='clientFeedback' className={styles.clientFeedbackHeader}>
        {getLanguageSpecificContent("ClientFeedback-header")}
      </header>
      <section className={styles.clientFeedbackC}>
        <ClientFeedbackCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          name='Ivan Ivanov'
          date={getLanguageSpecificContent("ClientFeedback-date")}
          meanRating='4.9'
          ratings={[4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9]}
          commentary={getLanguageSpecificContent("ClientFeedback-commentary")}
        />
        <ClientFeedbackCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          name='Mihail Mihailov'
          date={getLanguageSpecificContent("ClientFeedback-date")}
          meanRating='4.8'
          ratings={[4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8]}
          commentary={getLanguageSpecificContent("ClientFeedback-commentary")}
        />
      </section>
    </>
  );
}

function ClientFeedbackCard({
  getLanguageSpecificContent,
  name,
  date,
  meanRating,
  ratings,
  commentary,
}) {
  const [isRatingSelected, setIsRatingSelected] = useState(false);

  const toggleContent = (evt) => {
    setIsRatingSelected(!isRatingSelected);
  };
  return (
    <div className={styles.clientFeedbackCardC}>
      <aside>
        <div className={styles.name}>
          <div>{name}</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.rating}>
          <div className={styles.value}>{meanRating}</div>
          <div>
            {getLanguageSpecificContent("ClientFeedbackCard-meanRating")}
          </div>
        </div>
      </aside>
      <main>
        <header>
          <div>Заголовок</div>
          <div onClick={toggleContent} className={styles.toggleContentButton}>
            <span className={styles.action}>
              {isRatingSelected
                ? getLanguageSpecificContent("ClientFeedbackCard-seeFeedback")
                : getLanguageSpecificContent("ClientFeedbackCard-seeRating")}
            </span>
            <span
              style={
                isRatingSelected
                  ? { transform: "rotate(180deg)", marginTop: "8px" }
                  : { transform: "rotate(0deg)" }
              }
            >
              {arrowDownSvg}
            </span>
          </div>
        </header>
        {isRatingSelected ? (
          <div className={styles.ratings}>
            <div>
              <div>{ratings[0]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric1")}
              </div>
            </div>
            <div>
              <div>{ratings[1]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric2")}
              </div>
            </div>
            <div>
              <div>{ratings[2]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric3")}
              </div>
            </div>
            <div>
              <div>{ratings[3]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric4")}
              </div>
            </div>
            <div>
              <div>{ratings[4]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric5")}
              </div>
            </div>
            <div>
              <div>{ratings[5]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric6")}
              </div>
            </div>
            <div>
              <div>{ratings[6]}</div>
              <div>
                {getLanguageSpecificContent("ClientFeedbackCard-metric7")}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.text}>{commentary}</div>
        )}
      </main>
    </div>
  );
}
