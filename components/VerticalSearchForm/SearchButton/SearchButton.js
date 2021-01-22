import React from "react";
import styles from "./SearchButton.module.scss";
import { useRouter } from "next/router";

export default function SearchButton({ inFlightSearchResults, positionClass }) {
  const router = useRouter();

  const searchFlights = () => {
    router.push("/flight-search-result");
  };
  return (
    <div
      onClick={searchFlights}
      className={`${styles.container} ${styles[positionClass]}`}
    >
      {inFlightSearchResults ? (
        tryAgainSvg
      ) : (
        <div className={styles.searchButton}>Caută bilet</div>
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
        <stop offset='0' stop-color='#2b95ff' />
        <stop offset='1' stop-color='#0080ff' />
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
        <feFlood flood-color='#45a2ff' flood-opacity='0.502' />
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
          stroke-linecap='round'
          stroke-miterlimit='10'
          stroke-width='2'
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

const airPlaneSvg = (
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
        <stop offset='0' stop-color='#2b95ff' />
        <stop offset='1' stop-color='#0080ff' />
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
        <feFlood flood-color='#45a2ff' flood-opacity='0.502' />
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
      <path
        id='Path_169'
        data-name='Path 169'
        d='M-159.614-29.1l-2.96,1.946.474.858h.178s12.576-4.128,14.383-4.635,4.49-1.587,4.794-1.545,2.723-.057,2.723-.057l3.2-1.717-.414-1.431s5.277-3.148,6.156-3.662,3.181-1.677,3.433-2.632c.238-.652-.538-.9-.888-.973a11.156,11.156,0,0,0-4.913.286,22.317,22.317,0,0,0-5.5,2.461s-11.176,5.929-12.489,6.467c-1.821.542-3.042.966-7.221-.572s-5.209-1.946-5.209-1.946l-2.131,1.145Z'
        transform='translate(1194.808 204.701)'
        fill='#fff'
        fill-rule='evenodd'
      />
    </g>
  </svg>
);
