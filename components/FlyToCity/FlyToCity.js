import React, { useState, useEffect } from "react";
import styles from "./FlyToCity.module.scss";
import { wizzAirSvg, airMoldovaSvg } from "../AirCompanyAbout/svg";
import SimilarAircompanies from "../AirCompanyAbout/SimilarAircompanies/SimilarAircompanies";
import { sunIcon, snowIcon, cloudIcon, rainIcon } from "./icons";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import SubscribeDiscount from "../AirCompanySearch/SubscribeDiscount/SubscribeDiscount";
import TicketSubset from "./TicketSubset/TicketSubset";
import CoolChart from "./CoolChart/CoolChart";
import Map from "../Map/Map";

// import { i18n } from "../../i18n";

export default function FlyToCityComponent({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`flyToCity:${key}`);
  };
  const [viewportWidth, setViewportWidth] = useState("");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setViewportWidth(1000);
      } else {
        setViewportWidth(1400);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <HowToSaveOnFlight
          getLanguageSpecificContent={getLanguageSpecificContent}
        />
        <TicketSubset t={t} />
        <Text getLanguageSpecificContent={getLanguageSpecificContent} />
        {viewportWidth < 1140 ? (
          <Map
            headerText={`${getLanguageSpecificContent("map-headerText")} Рим`}
            coordinates={[41.902782, 12.496366]}
            mapContainerStyles={{
              width: "662px",
            }}
            headerStyles={{
              fontSize: "21px",
              fontWeight: "500",
              color: "#212121",
              marginTop: "50px",
            }}
            mapStyles={{
              marginTop: "20px",
              width: "662px",
              height: "140px",
              borderRadius: "6px",
            }}
            mapId='mapId1'
          />
        ) : (
          <Map
            headerText={`${getLanguageSpecificContent("map-headerText")} Рим`}
            coordinates={[41.902782, 12.496366]}
            mapContainerStyles={{
              width: "705px",
            }}
            headerStyles={{
              fontSize: "21px",
              fontWeight: "500",

              color: "#212121",
              marginTop: "50px",
            }}
            mapStyles={{
              marginTop: "20px",
              width: "705px",
              height: "140px",
              borderRadius: "6px",
            }}
            mapId='mapId1'
          />
        )}

        <WeatherInfo getLanguageSpecificContent={getLanguageSpecificContent} />
        <SimilarAircompanies
          headerTextValue={`${getLanguageSpecificContent(
            "similarAirCompanies-headerText"
          )} Рим`}
          logoList={[wizzAirSvg, airMoldovaSvg]}
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

function HowToSaveOnFlight({ getLanguageSpecificContent }) {
  return (
    <section className={styles.howToSaveOnFlightContainer}>
      <div className={styles.ticketPrice}>
        <div className={styles.title}>
          {getLanguageSpecificContent("HowToSaveOnFlight-title1")} Кишинева
          {getLanguageSpecificContent("HowToSaveOnFlight-title2")} Рим
        </div>
        <div className={styles.value}>35€</div>
      </div>
      <div className={styles.priceByMonthChartContainer}>
        <div className={styles.heading}>
          {getLanguageSpecificContent(
            "HowToSaveOnFlight-priceByMonthChartContainer-1"
          )}{" "}
          Рим
          {getLanguageSpecificContent(
            "HowToSaveOnFlight-priceByMonthChartContainer-2"
          )}
        </div>
        <div className={styles.chart}>
          <CoolChart />
        </div>
      </div>
      <div className={styles.text1}>
        <div className={styles.title}>
          {getLanguageSpecificContent("t1")} Кишинева{" "}
          {getLanguageSpecificContent("t2")} Рим
        </div>
        <div className={styles.value}>
          Секрет самых низких цен на авиабилеты в Рим заключается в том, чтобы
          организовать путешествие заранее. Лучше всего запланировать все за
          несколько месяцев до Вашего отъезда. Проанализируйте наш календарь
          тарифов. Сравните цены и будьте в курсе самых выгодны
        </div>
      </div>
      <div className={styles.text2}>
        <div className={styles.fastestFlightC}>
          <div className={styles.title}>{getLanguageSpecificContent("t7")}</div>
          <div className={styles.value}>
            Хорошие вещи могут быть сделаны в 2ч 14 мин - рекордное время для
            поездки из Кишинев в Рим на прошлой неделе для нашего клиента,
            который будет летать 2020-08-06 с Wizz Air
          </div>
        </div>
        <div className={styles.cheapestFlightC}>
          <div className={styles.title}>{getLanguageSpecificContent("t8")}</div>
          <div className={styles.value}>
            36 EUR! Doar atât a costat biletul de avion din Кишинев către Рим
            găsit de un client Avigo pe site-ul nostru în ultima săptămână.
            Acest va zbura pe 6 августа 2020, iar zborul va fi operat de Wizz
            Air.
          </div>
        </div>
      </div>
    </section>
  );
}

function Text({ getLanguageSpecificContent }) {
  return (
    <section className={styles.textContainer}>
      <header>{getLanguageSpecificContent("t3")} Рим</header>
      <main>
        <br />
        Полеты в Рим, которые обойдутся Вам даже дешевле, чем Вы могли подумать?
        Теперь это возможно.
        <br />
        <br />
        Узнайте ниже, как можно купить дешевые авиабилеты по маршруту Кишинев -
        Рим, а также обратный маршрут Вы найдете на странице Рим - Кишинев.
        <br />
        <br /> Мы будем искать Ваш авиабилет в 5 поисковых систем и среди более
        700 авиакомпаний. С таким внушительным набором функций, у Вас будет
        авиабилет в Рим или в любую точку мира по самой низкой цене.
        <br />
        <br />
        Метод поиска уникален потому что, мы предоставляем Вам расписание,
        которое четко показывает Вам самые низкие цены на авиабилеты.
        <br />
        <br />
        Наибольший спрос на авиарейсы приходится на сентябрь, ноябрь, февраль.
        Используйте график цен для каждого месяца, чтобы найти самый выгодный
        тариф. Возможность улететь на один день раньше или на два дня позже, или
        из соседних городов, возможность выбора умной стыковки значительно
        увеличат Ваши шансы на поиск самых дешевых рейсов в Рим.
        <br />
        <br />
      </main>
    </section>
  );
}

function WeatherInfo({ getLanguageSpecificContent }) {
  return (
    <section className={styles.weatherInfoContainer}>
      <header>{getLanguageSpecificContent("t4")}</header>
      <div className={styles.todayWeatherContainer}>
        <TodayWeather borderClass='borderRight' />
        <TodayWeather textAlignClass='textAlignEnd' />
      </div>
      <WeatherFullYearComparison
        getLanguageSpecificContent={getLanguageSpecificContent}
      />
    </section>
  );
}

function TodayWeather({ borderClass, textAlignClass }) {
  return (
    <div className={`${styles.todayWeather} ${styles[borderClass]}`}>
      <div className={`${styles.city} ${styles[textAlignClass]}`}>Кишинев</div>
      <div className={`${styles.date} ${styles[textAlignClass]}`}>
        19 Августа 2020
      </div>
      <div className={`${styles.temperatureValues} ${styles[textAlignClass]}`}>
        22°C — 32°C
      </div>
    </div>
  );
}

// sunIcon, snowIcon, cloudIcon, rainIcon
function WeatherFullYearComparison({ getLanguageSpecificContent }) {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthData = [
    {
      monthName: "JAN",
      weatherIcon: sunIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "FEB",
      weatherIcon: snowIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "MAR",
      weatherIcon: cloudIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "APR",
      weatherIcon: rainIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "MAY",
      weatherIcon: sunIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "JUN",
      weatherIcon: snowIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "JUL",
      weatherIcon: cloudIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "AUG",
      weatherIcon: rainIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "SEP",
      weatherIcon: sunIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "OCT",
      weatherIcon: snowIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "NOV",
      weatherIcon: cloudIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
    {
      monthName: "DEC",
      weatherIcon: rainIcon,
      temperature: {
        firstTemperature: "10°",
        secondTemperature: "14°",
      },
    },
  ];

  return (
    <div className={styles.weatherFullYearContainer}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <div>{getLanguageSpecificContent("t5")}</div>
          <div>{getLanguageSpecificContent("t6")}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.first}>
            <span className={styles.cityName}>Кишинев</span>
            <span className={styles.colorCode}></span>
          </div>
          <div className={styles.second}>
            <span className={styles.cityName}>Рим</span>
            <span className={styles.colorCode}></span>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        {monthData.map((data, idx) => {
          return <MonthTemperature key={idx} id={idx + 1} data={data} />;
        })}
      </div>
    </div>
  );
}

function MonthTemperature({ id, data }) {
  const { monthName, weatherIcon, temperature } = data;
  const { firstTemperature, secondTemperature } = temperature;

  const showTemperature = (nr, id) => {
    console.log("id is ", id);
    const tempElem = document.querySelector(`#tempValue${id}`);

    if (nr === 1) {
      tempElem.textContent = firstTemperature;
    } else if (nr === 2) {
      tempElem.textContent = secondTemperature;
    }
  };
  return (
    <div id={`c${id}`} className={styles.monthTempContainer}>
      <div className={styles.bars}>
        <div
          onMouseEnter={() => showTemperature(1, id)}
          className={styles.first}
        ></div>
        <div
          onMouseEnter={() => showTemperature(2, id)}
          className={styles.second}
        ></div>
      </div>
      <div className={styles.monthName}>{monthName}</div>
      <div className={styles.weatherIcon}>{weatherIcon}</div>
      <div id={`tempValue${id}`} className={styles.temperatureValue}>
        {firstTemperature}
      </div>
    </div>
  );
}
