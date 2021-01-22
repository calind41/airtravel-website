import React from "react";
import styles from "./SearchButton.module.scss";
import { useRouter } from "next/router";

export default function SearchButton({
  inFlightSearchResults,
  positionClass,
  t,
}) {
  const router = useRouter();

  const searchFlights = () => {
    router.push("/ro/flight-search-result");
  };
  return (
    <div
      onClick={searchFlights}
      className={`${styles.container} ${styles[positionClass]}`}
    >
      {inFlightSearchResults ? (
        tryAgainSvg
      ) : (
        <div className={styles.searchButton}>{t("searchFlightButtonText")}</div>
      )}
    </div>
  );
}
const tryAgainSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='105'
    height='105'
    viewBox='0 0 105 105'
  >
    <defs>
      <linearGradient
        id='linear-gradient'
        x1='1'
        x2='0'
        y2='1'
        gradientUnits='objectBoundingBox'
      >
        <stop offset='0' stopColor='#2b95ff' />
        <stop offset='1' stopColor='#0080ff' />
      </linearGradient>
      <filter
        id='Path_168'
        x='0'
        y='0'
        width='105'
        height='105'
        filterUnits='userSpaceOnUse'
      >
        <feOffset dx='-5' dy='5' input='SourceAlpha' />
        <feGaussianBlur stdDeviation='7.5' result='blur' />
        <feFlood floodColor='#45a2ff' floodOpacity='0.502' />
        <feComposite operator='in' in2='blur' />
        <feComposite in='SourceGraphic' />
      </filter>
    </defs>
    <g
      id='Group_119'
      data-name='Group 119'
      transform='translate(-990.5 -122.5)'
    >
      <g transform='matrix(1, 0, 0, 1, 990.5, 122.5)' filter='url(#Path_168)'>
        <path
          id='Path_168-2'
          data-name='Path 168'
          d='M30,0C55,0,60,5,60,30S55,60,30,60,0,55,0,30,5,0,30,0Z'
          transform='translate(27.5 17.5)'
          fill='url(#linear-gradient)'
        />
      </g>
      <g id='icons8-refresh' transform='translate(1033 155)'>
        <path
          id='Path_174'
          data-name='Path 174'
          d='M22.143,23.365A11,11,0,0,1,4,15M7.857,6.635A11,11,0,0,1,26,15'
          fill='none'
          stroke='#fff'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='2'
        />
        <path
          id='Path_175'
          data-name='Path 175'
          d='M26,20l-4-6h8ZM4,10l4,6H0Z'
          fill='#fff'
        />
      </g>
    </g>
  </svg>
);
