import React from "react";
import styles from "./RentalOptionsComponent.module.scss";
import CarRentalServices from "./CarRentalServices/CarRentalServices";
import PopularHotels from "./PopularHotels/PopularHotels";
import CarRelatedQA from "./CarRelatedQA/CarRelatedQA";
import PopularDestinations from "../../PopularDestinations/PopularDestinations";

export default function RentalOptionsComponent({ t }) {
  return (
    <div className={styles.rentalOptionsContainer}>
      <CarRentalServices t={t} />
      <PopularHotels t={t} />
      <CarRelatedQA t={t} />
      <div className={styles.popularDestinationsWrapper}>
        <PopularDestinations t={t} />
      </div>
    </div>
  );
}
