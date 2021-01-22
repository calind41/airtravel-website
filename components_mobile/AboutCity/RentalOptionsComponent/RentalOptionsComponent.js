import React from "react";
import styles from "./RentalOptionsComponent.module.scss";
import CarRentalServices from "./CarRentalServices/CarRentalServices";
import PopularHotels from "./PopularHotels/PopularHotels";
import CarRelatedQA from "./CarRelatedQA/CarRelatedQA";
import PopularDestinations from "../../PopularDestinations/PopularDestinations";

export default function RentalOptionsComponent_M() {
  return (
    <div className={styles.rentalOptionsContainer}>
      <CarRentalServices />
      <PopularHotels />
      <CarRelatedQA />
      <div className={styles.popularDestinationsWrapper}>
        <PopularDestinations />
      </div>
    </div>
  );
}
