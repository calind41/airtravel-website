import React from "react";
import styles from "./PopularHotels.module.scss";

import { i18n } from "../../../../i18n";

export default function PopularHotels({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`rentalOptions:${key}`);
  };
  return (
    <section className={styles.popularHotels}>
      <header>
        <div className={styles.title}>
          {getLanguageSpecificContent("PopularHotels-title-1")} Veneţia Marco
          Polo {getLanguageSpecificContent("PopularHotels-title-2")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("PopularHotels-subtitle")} Veneţia Marco
          Polo
        </div>
      </header>
      <main>
        <HotelCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          imageSrc='/images/le_boulvard.png'
          name='Le Boulvard'
          address='Gran Viale Santa Maria Elisabetta 41'
          distance='9.8KM'
        />
        <HotelCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          imageSrc='/images/ao_hotel_venezia_mestre.png'
          name='Ao Hotel Venezia Mestre'
          address='Via Ca’ Marcello 19'
          distance='8.2KM'
        />
        <HotelCard
          getLanguageSpecificContent={getLanguageSpecificContent}
          imageSrc='/images/nh_venezia_laguna_palace.png'
          name='NH Venezia Laguna Palace'
          address='Viale Ancona 2'
          distance='7.4KM'
        />
      </main>
    </section>
  );
}

function HotelCard({
  getLanguageSpecificContent,
  imageSrc,
  name,
  address,
  distance,
}) {
  return (
    <div className={styles.hotelCard}>
      <div className={styles.image}>
        <img src={imageSrc} alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.address}>{address}</div>
      <div className={styles.distanceFromAirport}>
        {distance} {getLanguageSpecificContent("HotelCard-t")}
      </div>
    </div>
  );
}
