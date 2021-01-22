import React from "react";
import styles from "./SearchButton.module.scss";
import { useRouter } from "next/router";

export default function SearchButton({ inFlightSearchResults }) {
  const router = useRouter();

  const searchFlights = () => {
    router.push("/flight-search-result");
  };
  return (
    <div onClick={searchFlights} id='searchB' className={`${styles.container}`}>
      Найти билеты
    </div>
  );
}
