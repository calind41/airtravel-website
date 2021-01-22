import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";

export default function TwoWayRangeSlider({
  displayCancelIcon,
  sliderValues,
  passValues,
  min,
  max,
}) {
  const [value, setValue] = useState(sliderValues);

  useEffect(() => {
    setValue(sliderValues);
  }, [sliderValues]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    passValues(newValue[0] / 30, newValue[1] / 30);
  };
  return (
    <Slider
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      onChangeCommitted={displayCancelIcon}
      aria-labelledby='range-slider'
    />
  );
}
