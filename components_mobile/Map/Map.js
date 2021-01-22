import React, { useEffect } from "react";
import styles from "./Map.module.scss";

export default function Map({ headerText, coordinates, mapId }) {
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
      <header className={styles.header}>{headerText}</header>
      <div className={styles.map} id={mapId}></div>
    </section>
  );
}
