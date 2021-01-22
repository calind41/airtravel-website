import React, { useEffect } from "react";
import styles from "./CarRentalServices.module.scss";
import RentalService from "./RentalService/RentalService";
import { hertzCompanyLogo } from "./icons";

import { i18n } from "../../../../i18n";

export default function CarRentalServices() {
  const getLanguageSpecificContent = (key) => {
    return i18n.t(`rentalOptions:${key}`);
  };
  return (
    <section className={styles.container}>
      <header>
        <div className={styles.title}>
          Venetia {getLanguageSpecificContent("CarRentalServices-title")}
        </div>
        <div className={styles.subtitle}>
          {getLanguageSpecificContent("CarRentalServices-subtitle")} Venetia
        </div>
      </header>
      <main>
        <div className={styles.rentalServices}>
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
        </div>
        <Map coordinates={[45.4408474, 12.3155151]} mapId='mapId2' />
      </main>
    </section>
  );
}

function Map({ coordinates, mapId }) {
  useEffect(() => {
    const map = L.map(`${mapId}`, { zoomControl: false }).setView(
      coordinates,
      9
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.off();
      map.remove();
    };
  }, []);
  return (
    <section className={styles.mapContainer}>
      <div className={styles.map} id={mapId}></div>
    </section>
  );
}
