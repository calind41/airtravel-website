import React, { useEffect } from "react";
import styles from "./MultiHandleRangeSlider.module.css";
import { Slider, Handles, Tracks, Rail } from "react-compound-slider";
import { i18n } from "../../../../i18n";

const sliderStyle = {
  position: "relative",
  width: "80.33vw",
  height: 80,
  top: "10.8px",
};

const railStyle = {
  position: "absolute",
  width: "80.33vw",
  height: "3.6px",
  marginTop: 31.5,
  borderRadius: 0,
  backgroundColor: "#9DA1A6",
};

let rangeValues;

const getLanguageSpecificContent = (key) => {
  return i18n.t(`flightSearchResult:${key}`);
};

export default function MultiHandleRangeSlider() {
  useEffect(() => {}, []);
  const handleSliderChange = (evt) => {
    console.log(evt);
  };

  return (
    <div id='slider'>
      <Slider
        rootStyle={
          sliderStyle /* inline styles for the outer div. Can also use className prop. */
        }
        step={1}
        mode={2}
        domain={[0, 2380]} // minutes
        values={[5 * 60, 32 * 60 + 40]}
      >
        <div
          style={
            railStyle /* Add a rail as a child.  Later we'll make it interactive. */
          }
        />
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => {
            rangeValues = handles;
            return (
              <div className='slider-handles'>
                {handles.map((handle) => {
                  return (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      getHandleProps={getHandleProps}
                      onUpdate={(evt) => handleSliderChange(evt)}
                    />
                  );
                })}
              </div>
            );
          }}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className='slider-tracks'>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
}

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  const days = Math.floor(value / (24 * 60));
  const hours = Math.floor((value % (24 * 60)) / 60);
  const minutes = Math.floor((value % (24 * 60)) % 60);

  let str = "";
  if (days !== 0) {
    str += `${days}${getLanguageSpecificContent("MultiHandleRangSlider-day")}`;
  }
  if (hours !== 0) {
    str += `${hours}${getLanguageSpecificContent(
      "MultiHandleRangSlider-hour"
    )}`;
  }
  if (minutes !== 0) {
    str += `${minutes}${getLanguageSpecificContent(
      "MultiHandleRangSlider-minute"
    )}`;
  }
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -13.5,
        marginTop: 24.3,
        zIndex: 2,
        width: 27,
        height: 0,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "red",
        color: "#333",
      }}
      {...getHandleProps(id)}
    >
      <svg
        id='Group_154'
        className={styles.handleSvg}
        data-name='Group 154'
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='10'
        viewBox='0 0 25 10'
      >
        <g
          id='Rectangle_194'
          data-name='Rectangle 194'
          fill='#fff'
          stroke='#0080ff'
          strokeWidth='1'
        >
          <rect width='25' height='10' rx='2' stroke='none' />
          <rect x='0.5' y='0.5' width='24' height='9' rx='1.5' fill='none' />
        </g>
        <rect
          id='Rectangle_195'
          data-name='Rectangle 195'
          width='1'
          height='4'
          rx='0.5'
          transform='translate(8 3)'
          fill='#0080ff'
        />
        <rect
          id='Rectangle_196'
          data-name='Rectangle 196'
          width='1'
          height='4'
          rx='0.5'
          transform='translate(12 3)'
          fill='#0080ff'
        />
        <rect
          id='Rectangle_197'
          data-name='Rectangle 197'
          width='1'
          height='4'
          rx='0.5'
          transform='translate(16 3)'
          fill='#0080ff'
        />
      </svg>

      <div
        style={{
          fontSize: 9.9,
          marginTop: -31.5,
          position: "relative",
          right: "20px",
          width: "63px",
        }}
      >
        {str}
      </div>
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: "absolute",
        height: "3.6px",
        zIndex: 1,
        marginTop: 31.5,
        backgroundColor: "#0080FF",
        borderRadius: 5,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {
        ...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */
      }
    />
  );
}
