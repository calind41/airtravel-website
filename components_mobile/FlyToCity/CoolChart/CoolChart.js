import React, { useState, useEffect } from "react";
import styles from "./CoolChart.module.scss";
import Chart from "chart.js";

export default function CoolChart() {
  const [canvasHeight, setCanvasHeight] = useState("400");

  useEffect(() => {
    const updateCanvasHeight = () => {
      if (window.innerWidth >= 400) {
        setCanvasHeight("200");
      }
    };
    updateCanvasHeight();

    window.addEventListener("resize", updateCanvasHeight);

    return () => {
      window.removeEventListener("resize", updateCanvasHeight);
    };
  }, []);
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "black");
    gradientStroke.addColorStop(1, "white");

    let yLabels = {};
    const maxPrice = 140;
    let key = 20;
    for (let i = 0; i < maxPrice; i++) {
      yLabels[key] = `${key}$`;
      key += 20;
      if (key > maxPrice) break;
    }

    // Chart props
    const labels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const data = [23, 50, 100, 83, 62, 50, 100, 100, 75, 100, 130, 50];
    const chartOptions = {
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "#AAAEB3",
              lineWidth: 0.5,
            },
            ticks: {
              fontColor: "#7A7D80",
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "#AAAEB3",
              lineWidth: 0.5,
            },
            ticks: {
              callback: function (value, index, values) {
                return yLabels[value];
              },
              fontColor: "#7A7D80",
              fontSize: 11,
              padding: 7,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        titleAlign: "center",
        bodyAlign: "center",
        custom: function (tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        },
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem, data) {
            return tooltipItem.yLabel + "$";
          },
          // remove title
          title: function (tooltipItem, data) {
            return;
          },
        },
      },
      bezierCurve: false,
    };

    const datasets = [
      {
        data: data,
        lineTension: 0.05,
        backgroundColor: "rgba(0,128,255,.1)",
        borderColor: "#0080FF",
        borderWidth: 1,
        fill: "origin",
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointBorderWidth: "2px",
        pointRadius: 3.5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#0080FF",
      },
    ];
    // -------------------------------

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: chartOptions,
    });
  }, []);
  return (
    <div>
      <canvas id='myChart' width='705'></canvas>
    </div>
  );
}
