import React, { useEffect } from "react";

export default function Map({
  headerText,
  coordinates,
  mapContainerStyles,
  headerStyles,
  mapStyles,
  mapId,
}) {
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
    <section style={mapContainerStyles}>
      {headerStyles ? <header style={headerStyles}>{headerText}</header> : null}
      <div style={mapStyles} id={mapId}></div>
    </section>
  );
}
