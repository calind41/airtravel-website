import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";

import Header from "./Header/Header";
import MultiCitySearchForm from "./MultiCitySearchForm/MultiCitySearchForm";
import SearchForm from "./SearchForm/SearchForm";
import LocationsSmallScreen from "./SearchForm/Locations/LocationsSmallScreen/LocationsSmallScreen";
import CalendarInputSmallScreen from "./SearchForm/CalendarInput/CalendarInputSmallScreen/CalendarInputSmallScreen";
import SForm from "./MultiCitySearchForm/SForm/SForm";
export default function HomePage() {
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) {
        // unmount small calendar
        setIsRenderedCalendarSmall(false);
        // unmount LocationsSmallScreen
        setIsRenderedLocationsSmall(false);
      }
    });
  }, []);
  const [isRenderedCalendarSmall, setIsRenderedCalendarSmall] = useState(false);
  const [isRenderedLocationsSmall, setIsRenderedLocationsSmall] = useState(
    false
  );
  const [
    renderedSearchFormComponent,
    setRenderedSearchFormComponent,
  ] = useState(true);
  const [renderedSFormComponent, setRenderedSFormComponent] = useState(false);

  const receiveCalendarState = (state) => {
    setIsRenderedCalendarSmall(state);
  };
  const receiveLocationsState = (state) => {
    setIsRenderedLocationsSmall(state);
  };
  const renderSearchFormComponent = () => {
    setRenderedSearchFormComponent(true);
    setRenderedSFormComponent(false);
  };
  const renderSForm = () => {
    setRenderedSFormComponent(true);
    setRenderedSearchFormComponent(false);
  };
  return (
    <div
      id='homePageId'
      className={`${styles.homePageC} ${styles.homePageCMultiCity}`}
    >
      <Header />
      {renderedSearchFormComponent ? (
        <SearchForm
          passLocationsState={receiveLocationsState}
          passCalendarState={receiveCalendarState}
          renderSForm={renderSForm}
        />
      ) : null}

      {renderedSFormComponent ? (
        <SForm renderSearchFormComponent={renderSearchFormComponent} />
      ) : null}
      {isRenderedLocationsSmall ? <LocationsSmallScreen /> : null}

      {isRenderedCalendarSmall ? (
        <CalendarInputSmallScreen
          daysOfWeekSmallSearchFormClass='daysOfWeekSmallSearchForm'
          monthNameClass='centerH4'
        />
      ) : null}
    </div>
  );
}
