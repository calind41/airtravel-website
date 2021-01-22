import React, { useEffect, useState } from "react";
import styles from "./CarRentalServices.module.scss";
import Map from "../../../Map/Map";
import RentalService from "./RentalService/RentalService";
import { hertzCompanyLogo } from "./icons";

import { i18n } from "../../../../i18n";

export default function CarRentalServices({ t }) {
  const getLanguageSpecificContent = (key) => {
    return t(`rentalOptions:${key}`);
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
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
          <RentalService
            t={t}
            logo={hertzCompanyLogo}
            companyName='Hertz'
            ratingValue='7.5/10'
          />
        </div>
        {viewportWidth < 1140 ? (
          <Map
            coordinates={[45.4408474, 12.3155151]}
            mapContainerStyles={{
              width: "430px",
              height: "430px",
            }}
            mapStyles={{
              width: "430px",
              height: "430px",
              borderRadius: "6px",
            }}
            mapId='mapId2'
          />
        ) : (
          <Map
            coordinates={[45.4408474, 12.3155151]}
            mapContainerStyles={{
              width: "640px",
              height: "430px",
            }}
            mapStyles={{
              width: "640px",
              height: "430px",
              borderRadius: "6px",
            }}
            mapId='mapId2'
          />
        )}
      </main>
    </section>
  );
}
