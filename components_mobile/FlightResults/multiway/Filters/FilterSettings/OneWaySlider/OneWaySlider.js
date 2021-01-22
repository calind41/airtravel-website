import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "90vw !important",
  },
  colorPrimary: {
    color: "#ffdd2d !important",
  },
  rail: {
    color: "#dddfe0 !important",
    borderRadius: "16px !important",
    height: "5px !important",
  },
  thumb: {
    color: "#ffdd2d !important",
    width: "19px !important",
    height: "19px !important",
    marginTop: "-8px !important",
    boxShadow: "none !important",
  },
  track: {
    height: "5px !important",
  },
});

export default function OneWaySlider({ sliderValue, passValue, min, max }) {
  const [value, setValue] = useState(sliderValue[0]);
  const classes = useStyles();

  useEffect(() => {
    setValue(sliderValue[0]);
  }, [sliderValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    passValue(newValue / 30, newValue);
  };

  return (
    <Slider
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        rail: classes.rail,
        thumb: classes.thumb,
        track: classes.track,
      }}
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      aria-labelledby='continuous-slider'
    />
  );
}
