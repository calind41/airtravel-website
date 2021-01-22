import React, { useState, useEffect } from "react";
import styles from "./AirCompanyAbout.module.scss";
import { airMoldovaSvg, flyOneSvg, arrowDownSvg, eyeIconSvg } from "./svg";
import { hamburgerSvg } from "../TermsOfUse/svg";
import PopularDestinations from "../PopularDestinations/PopularDestinations";

import { i18n } from "../../i18n";

const getLanguageSpecificContent = (key) => {
  return i18n.t(`aboutAircompany:${key}`);
};

export default function AirCompanyAbout_M() {
  return (
    <div className={styles.container}>
      <About />
      <CompanyInformation />
      <Ratings />
      <DirectFlights />
      <WhereIsFlying />
      <TravelRules />
      <SimilarAircompanies logoList={[flyOneSvg]} />
      <ClientFeedBack />
      <div className={styles.popularDestinationsWrapper}>
        <PopularDestinations />
      </div>
    </div>
  );
}

function NavigationMenu() {
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
function About() {
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

function CompanyInformation() {
  return (
    <section id='companyInfo' className={styles.companyInformationC}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>{airMoldovaSvg}</div>
        <div className={styles.info}>
          <div className={styles.address}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-addrTitle")}
            </div>
            <div className={styles.value}>
              {getLanguageSpecificContent("CompanyInformation-addrValue")}
            </div>
          </div>
          <div className={styles.phoneNr}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-phoneNr")}
            </div>
            <div className={styles.value}>+373 22 830 830</div>
          </div>

          <div className={styles.nrPlanes}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-nrPlanesTitle")}
            </div>
            <div className={styles.value}>
              {getLanguageSpecificContent("CompanyInformation-nrPlanesValue")}
            </div>
          </div>
          <div className={styles.IATAcode}>
            <div className={styles.title}>
              {getLanguageSpecificContent("CompanyInformation-codeIATA")}
            </div>
            <div className={styles.value}>9U</div>
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
      </div>
    </section>
  );
}

function Ratings() {
  useEffect(() => {
    const dots = document.querySelectorAll(`.${styles.dots} > span`);
    const ratingSliderWrapper = document.querySelector(
      `.${styles.ratingSlideWrapper}`
    );
    const selectDot = (evt) => {
      const dotIdx = parseInt(evt.target.id[1]) - 1;
      ratingSliderWrapper.scrollLeft = dotIdx * 261 + 21 * dotIdx;
    };
    const handleHorizontalScroll = () => {
      let idx = Math.ceil(parseFloat(ratingSliderWrapper.scrollLeft) / 281);
      if (idx === 0) {
        idx = 1;
      }
      dots.forEach((d) => {
        if (parseInt(d.id[1]) === idx) {
          d.classList.add(styles.selectedDot);
        } else {
          d.classList.remove(styles.selectedDot);
        }
      });
    };
    dots.forEach((dot) => dot.addEventListener("click", selectDot));
    ratingSliderWrapper.addEventListener("scroll", () => {
      handleHorizontalScroll();
    });
  }, []);
  return (
    <>
      <header id='rating' className={styles.ratingsHeader}>
        <h1>{getLanguageSpecificContent("Ratings-h1")}</h1>
        <div className={styles.allReviews}>
          {getLanguageSpecificContent("Ratings-allReviews")}
        </div>
      </header>
      <div className={styles.ratings}>
        <div className={styles.meanRating}>
          <Rating
            ratingMetric={getLanguageSpecificContent("Ratings-avgMark")}
            value='4.9'
            isMeanRating={true}
          />
        </div>
        <div className={styles.ratingSlideWrapper}>
          <div className={styles.ratingSlider}>
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric1")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric2")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric3")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric4")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric5")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric6")}
              value='4.9'
            />
            <Rating
              ratingMetric={getLanguageSpecificContent("Ratings-metric7")}
              value='4.9'
            />
          </div>
          <div className={styles.dots}>
            <span className={styles.selectedDot} id='d1'></span>
            <span id='d2'></span>
            <span id='d3'></span>
            <span id='d4'></span>
            <span id='d5'></span>
            <span id='d6'></span>
            <span id='d7'></span>
          </div>
        </div>
      </div>
    </>
  );
}
function Rating({ isMeanRating, ratingMetric, value }) {
  return (
    <div className={styles.ratingContainer}>
      <div className={styles.rating}>
        <div className={styles.title}>{ratingMetric}</div>
        <div className={styles.valueC}>
          <span className={styles.value}>{value}</span>
          <span className={styles.slider}>
            <span></span>
          </span>
        </div>
        {isMeanRating ? (
          <div className={styles.note}>
            {getLanguageSpecificContent("Rating-markBasedOn")}
          </div>
        ) : null}
      </div>
      {isMeanRating ? (
        <div className={styles.rateCta}>
          <div className={styles.cta}>
            {getLanguageSpecificContent("Rating-leaveFeedback")}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DirectFlights() {
  return (
    <>
      <header id='directFlights' className={styles.directFlightsHeader}>
        {getLanguageSpecificContent("DirectFlights-headerTitle")}
      </header>
      <section className={styles.directFlightsC}>
        <div className={styles.wrapper}>
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
          <DirectFlight />
        </div>
      </section>
    </>
  );
}

function DirectFlight() {
  const handleClick = (evt) => {};
  return (
    <div onClick={handleClick} className={styles.directFlightC}>
      <div className={styles.route}>Москва → Кишинев</div>

      <div className={styles.bookBtn}>{eyeIconSvg}</div>
    </div>
  );
}

function WhereIsFlying() {
  return (
    <>
      <header id='whereIsFlying' className={styles.whereIsFlyingHeader}>
        {getLanguageSpecificContent("WhereIsFlying-mobile-header")} Air Moldova
      </header>
      <section className={styles.whereIsFlying}>
        <CityCard city='Москва' img='/images/moscow.png' />
        <CityCard city='Кишинев' img='/images/chisinau.png' />
        <CityCard city='Санкт-Петербург' img='/images/sankt_peterburg.png' />
        <CityCard city='Стамбул' img='/images/stambul.png' />
      </section>
    </>
  );
}

function CityCard({ city, img }) {
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

function TravelRules() {
  const toggleFulltTextVisibility = (evt) => {
    const text = document.querySelector(`.${styles.travelRulesContainer}`);
    text.classList.toggle(styles.hideFullText);
    if (
      evt.target.textContent ===
      `${getLanguageSpecificContent("TravelRules-mobile-t1")}`
    ) {
      evt.target.textContent = getLanguageSpecificContent(
        "TravelRules-mobile-t2"
      );
    } else {
      evt.target.textContent = getLanguageSpecificContent(
        "TravelRules-mobile-t1"
      );
    }
  };
  return (
    <div className={styles.travelRulesWrapper}>
      <header id='travelRules' className={styles.travelRulesHeader}>
        {getLanguageSpecificContent("TravelRules-header")}
      </header>
      <section
        className={`${styles.travelRulesContainer} ${styles.hideFullText}`}
      >
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
          см).
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
            <li>{getLanguageSpecificContent("TravelRules-block5-li3")}</li>
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
      <div onClick={toggleFulltTextVisibility} className={styles.showFullText}>
        <span>{getLanguageSpecificContent("TravelRules-mobile-t1")}</span>
      </div>
    </div>
  );
}

function SimilarAircompanies({ logoList }) {
  return (
    <div className={styles.similarAirCwrapper}>
      <header id='similarAirCompanies' className={styles.similarAirCheader}>
        {getLanguageSpecificContent("SimilarAirCompanies-header")}
      </header>
      <section className={styles.similarAirCompaniesC}>
        {logoList.map((item, idx) => {
          return <div key={idx}>{item}</div>;
        })}
      </section>
    </div>
  );
}

function ClientFeedBack() {
  return (
    <>
      <header id='clientFeedback' className={styles.clientFeedbackHeader}>
        {getLanguageSpecificContent("ClientFeedback-header")}
      </header>
      <section className={styles.clientFeedbackC}>
        <ClientFeedbackCard
          name='Ivan Ivanov'
          date='19 Августа 2020'
          meanRating='4.9'
          ratings={[4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9]}
          commentary={getLanguageSpecificContent("ClientFeedback-commentary")}
        />
        <ClientFeedbackCard
          name='Mihail Mihailov'
          date='19 Августа 2020'
          meanRating='4.8'
          ratings={[4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8]}
          commentary={getLanguageSpecificContent("ClientFeedback-commentary")}
        />
      </section>
    </>
  );
}

function ClientFeedbackCard({ name, date, meanRating, ratings, commentary }) {
  const [isRatingSelected, setIsRatingSelected] = useState(false);

  const toggleContent = (evt) => {
    setIsRatingSelected(!isRatingSelected);
  };
  return (
    <div className={styles.clientFeedbackCardC}>
      <aside>
        <div className={styles.wrapper}>
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
        </div>
        <div onClick={toggleContent} className={styles.toggleContentButton}>
          <span className={styles.action}>
            {isRatingSelected
              ? `${getLanguageSpecificContent(
                  "ClientFeedbackCard-seeFeedback"
                )}`
              : `${getLanguageSpecificContent("ClientFeedbackCard-seeRating")}`}
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
      </aside>
      <main>
        <header>
          <div>Заголовок</div>
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
