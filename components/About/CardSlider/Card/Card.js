import React from "react";
import styles from "./Card.module.scss";

export default function Card({
  icon,
  hText,
  pText,
  ctaText,
  bgColor,
  cardContainerStyles,
  pStyles,
  hStyles,
  btnStyles,
}) {
  return (
    <div
      style={{
        backgroundColor: `${bgColor}`,
        ...cardContainerStyles,
      }}
      className={styles.container}
    >
      <div className={styles.icon}>{icon}</div>
      <main>
        <h3 style={hStyles}>{hText}</h3>
        {pText && <p style={pStyles}>{pText}</p>}
      </main>
      <div className={styles.cta}>
        <button style={btnStyles}>{ctaText}</button>
      </div>
    </div>
  );
}
