import React from "react";
import styles from "./MultiCitySearchForm.module.css";

import FromInput from "../SearchForm/FromInput/FromInput";
import ToInput from "../SearchForm/ToInput/ToInput";
import CalendarInput from "../SearchForm/CalendarInput/CalendarInput";
import PassengerDropdown from "../SearchForm/PassengerDropdown/PassengerDropdown";
import SearchButton from "../SearchForm/SearchButton/SearchButton";

export default function MultiCitySearchForm() {
  return (
    <div className={styles.multiSearchFormC}>
      <div>FLIGHTS</div>
      <div className={styles.baseGroup}>
        <FromInput />
        <ToInput />
        <CalendarInput />
      </div>
      <div className={styles.deletableGroups}>
        <div className={styles.group}>
          <FromInput />
          <ToInput />
          <CalendarInput />
        </div>
      </div>

      <div>
        <div>
          <button>
            <span>+</span>
            <span>Add flight</span>
          </button>
        </div>
        <PassengerDropdown />
        <SearchButton />
      </div>
    </div>
  );
}
