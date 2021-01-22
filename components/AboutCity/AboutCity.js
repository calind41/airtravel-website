import React from "react";
import styles from "./AboutCity.module.scss";

import TicketSubset from "../FlyToCity/TicketSubset/TicketSubset";
import CoolChart from "../FlyToCity/CoolChart/CoolChart";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import SimilarAircompanies from "../AirCompanyAbout/SimilarAircompanies/SimilarAircompanies";
import { airMoldovaSvg } from "../AirCompanyAbout/svg";
import NearCityAirports from "./NearCityAirports/NearCityAirports";
import TripSetupOptions from "./TripSetupOptions/TripSetupOptions";
import CityTouristAttractions from "./CityTouristAttractions/CityTouristAttractions";
import SubscribeDiscount from "../AirCompanySearch/SubscribeDiscount/SubscribeDiscount";
import { i18n } from "../../i18n";

export default function AboutCity({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`aboutCity:${key}`);
  };
  const footerMessage = (
    <footer>
      Există un singur zbor direct București – Veneția, dar, ca recompensă, poți
      alege să combini vizita acestui oraș cu un alt oraș (italian sau nu)
      pentru a beneficia la maximum de zilele de vacanță și de zboruri
      compatibile cu programul tău.
      <span style={{ marginTop: "10px", display: "block" }}>
        De asemenea, spre Veneția există zboruri și din Cluj-Napoca, Craiova,
        Iași, Suceava sau Timișoara.
      </span>
    </footer>
  );
  const touristAttractionDescription = (
    <>
      <p>
        Iubită de porumbei, adorată de turiști și o destinație favorită a
        vedetelor, Veneția este unul dintre cele mai faimoase orașe din lume.
        Cei romantici vin aici să își reconfirme dragostea cu un sărut sub
        Puntea suspinelor, alții ca să se bucure de stilul de viață relaxat.
      </p>
      <p>
        Arhitectura gotică, bizantină și orientală, construită pe stâlpi de lemn
        în laguna venețiană, creează un peisaj frumos, străbătut de gondole, cu
        poduri mici și cupluri care fac plimbări romantice.
      </p>
      <p>
        Orașul este chiar și mai popular în timpul festivalurilor, precum
        Carnavalul de la Veneția, Festivalul de Film de la Veneția și Bienala de
        Artă de la Veneția.
      </p>
      <p>
        Piazza San Marco este locul din care trebuie să înceapă călătoria ta în
        orașul măștilor. Vei putea admira acolo Basilica San Marco, apoi te vei
        plimba pe străduțele centrale. Trebuie să vezi și Palazzo Ducale, să
        admiri priveliște de pe Ponte de Rialto și să îți pecetluiești dragostea
        sub Ponte dei Sospiri, într-o gondolă.
      </p>
      <p>
        Oferă-ți o plimbare pe Canal Grande, apoi servește ceva bun la unul
        dintre restaurantele din zona La Giudecca. Dacă ai poftă și de ceva
        cultural, poți face o vizită la Museo della Musica sau Museo Querini
        Stampalia. Teatro Goldoni sau Teatro la Fenice sunt alte locuri în care
        te poți relaxa și gusta puțin din arta locală.
      </p>
      <p>
        După ce ai admirat toate atracțiile turistice, viziteză galeriile de pe
        străzile lăturalnice, atelierele artizanilor, și plimbă-te printre
        micile pasaje și alei pentru a intra în atmosferă.
      </p>
    </>
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.aboutCityContainer}>
        <div className={styles.ticketPrice}>
          <div className={styles.title}>
            {getLanguageSpecificContent("AboutCity-ticketPrice-title")} Venetia
          </div>
          <div className={styles.value}>35€</div>
        </div>
        <div className={styles.chartWrapper}>
          <header>
            {getLanguageSpecificContent("AboutCity-chartWrapper-header")}
          </header>
          <CoolChart />
        </div>
        <FAQ getLanguageSpecificContent={getLanguageSpecificContent} />
        <TicketSubset t={t} location='inAboutCity' />
        <SimilarAircompanies
          headerTextValue={`${getLanguageSpecificContent(
            "SimilarAircompanies-headerTextValue"
          )} Venetia?`}
          footerMessage={footerMessage}
          logoList={[airMoldovaSvg]}
        />
        <NearCityAirports t={t} />
        <TripSetupOptions t={t} />
        <CityTouristAttractions
          t={t}
          text={touristAttractionDescription}
          city='Veneția'
        />
        <div className={styles.popularDestinationsWrapper}>
          <PopularDestinations t={t} />
        </div>
      </div>
      <div className={styles.subscribeDiscountWrapper}>
        <SubscribeDiscount t={t} />
      </div>
    </div>
  );
}

function FAQ({ getLanguageSpecificContent }) {
  return (
    <section className={styles.faqContainer}>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q1")} Venetia?
        </div>
        <div className={styles.text}>
          Temperaturile ideale pentru a vizita acest oraș sunt în lunile de
          primăvară și toamnă. Vara este destul de cald, iar turiștii numeroși
          determină creșterea tarifelor de către hoteluri sau restaurante. Iarna
          este destul de frig, dar dacă nu te deranjează asta, vei putea vedea
          orașul italian beneficiind de cele mai mici prețuri.
        </div>
      </div>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q2")} Bacău
          {getLanguageSpecificContent("FAQ-q2-1")} Venetia?
        </div>
        <div className={styles.text}>
          Utilizatorii care au rezervat călătorii din Paris către Paris au găsit
          zboruri cu 91% mai ieftine decât prețul mediu al zborurilor în
          Venetia. Cel mai ieftin zbor în Venetia, cu plecare din zona Bacău, a
          avut plecarea din Aeroportul Suceava Salcea și aterizarea în Bologna
          Aeroportul Bologna Guglielmo Marconi: în medie 171 lei/persoană. Acest
          preț se poate modifica în funcție de luna în care alegi să zbori. În
          timpul lunilor august și septembrie, cea mai ieftină rută este
          Aeroportul Suceava Salcea - Bologna Aeroportul Bologna Guglielmo
          Marconi.
        </div>
      </div>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q3")} Venetia?
        </div>
        <div className={styles.text}>
          Cea mai ieftină zi pentru a zbura din România în Venetia este o zi de
          miercuri, când pot fi găsite bilete la numai 297 lei. Asigură-te că nu
          îți rezervi plecarea într-o zi de Vineri, deoarece prețurile tind să
          fie mai scumpe decât de obicei. Conform datelor noastre, prețul mediu
          al biletului de avion către Venetia, într-o zi de Vineri, este de 396
          lei.
        </div>
      </div>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q4")} Venetia?
        </div>
        <div className={styles.text}>
          Cele mai recente date ale noastre arată că cel mai bun moment al zilei
          pentru a zbura în Venetia este dimineața. Zborurile din România în
          Venetia în acest moment al zilei pot fi de numai 330 lei. Cu un preț
          mediu al biletului de 408 lei, zborurile la prânz sunt, în general,
          cele mai scumpe.
        </div>
      </div>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q5")} Venetia?
        </div>
        <div className={styles.text}>
          Aeroportul Veneţia Treviso, Aeroportul Trieste Ronchi dei Legionari,
          Aeroportul Verona, Bologna Aeroportul Bologna Guglielmo Marconi sau
          Aeroportul Rimini Miramare pot fi opțiuni alternative de aeroporturi
          pentru zborul în Venetia.
        </div>
      </div>
      <div>
        <div className={styles.title}>
          {getLanguageSpecificContent("FAQ-q6")} Venetia?
        </div>
        <div className={styles.text}>
          Cu un preț mediu de 427 lei de persoană, Aeroportul Veneţia Treviso
          este cel mai ieftin aeroport în care poți zbura pentru călătoria ta în
          Venetia. Acest preț poate fluctua în funcție de destinația de origine.
          Funcționalitatea momondo Ghid pentru prețul acestei rute te poate
          ajuta să găsești cele mai bune tarife. Cel mai ieftin zbor din Bacău
          către Aeroportul Veneţia Treviso este 216 lei.
        </div>
      </div>
    </section>
  );
}
