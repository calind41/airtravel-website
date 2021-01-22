import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./PaginationComponent.module.scss";

export default function PaginationComponent({ min, max }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const arrowRight = document.querySelector(`.${styles.arrowRight}`);
    const arrowLeft = document.querySelector(`.${styles.arrowLeft}`);
    if (currentPage > min && currentPage < max) {
      arrowRight.classList.remove(styles.disabledArrow);
      arrowLeft.classList.remove(styles.disabledArrow);
    }
    if (currentPage === min) {
      arrowLeft.classList.add(styles.disabledArrow);
    }
    if (currentPage === max) {
      arrowRight.classList.add(styles.disabledArrow);
    }
  }, [currentPage]);

  const incrementPage = () => {
    if (currentPage === max) return;

    setCurrentPage(currentPage + 1);
  };
  const decrementPage = () => {
    if (currentPage === min) return;

    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.paginationComponent}>
      <div
        onClick={decrementPage}
        className={`${styles.arrowLeft} ${styles.disabledArrow}`}
      >
        {horizontalArrowSvg}
      </div>
      <div className={styles.pagination}>
        <span className={styles.currentPage}>{currentPage}</span>
        <span>из</span>
        <span>5</span>
      </div>
      <div onClick={incrementPage} className={styles.arrowRight}>
        {horizontalArrowSvg}
      </div>
    </div>
  );
}

const horizontalArrowSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='44'
    height='44'
    viewBox='0 0 44 44'
  >
    <g id='Group_159' data-name='Group 159' transform='translate(-124 -675)'>
      <rect
        id='Rectangle_204'
        data-name='Rectangle 204'
        width='44'
        height='44'
        rx='6'
        transform='translate(124 675)'
        fill='none'
      />
      <path
        id='Path_1'
        data-name='Path 1'
        d='M389,2305.935l7,7,7-7'
        transform='translate(-2163.435 1093) rotate(-90)'
        fill='none'
        stroke='#626466'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </g>
  </svg>
);
