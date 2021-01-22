import React, { useState, useEffect } from "react";
import styles from "./Month.module.scss";
import stylesFlightDate from "../../FlightDate.module.scss";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Month({
  monthNameClass,
  passSelectedDate,
  selectedMonth,
  tripType,
  month,
  year,
}) {
  let [nrSelectedDates, setNrSelectedDates] = useState(0);

  useEffect(() => {
    localStorage.setItem("tripType", "Round trip");
    return () => {
      localStorage.removeItem("tripType");
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);

      el.addEventListener("mouseenter", handleOnMouseEnter);
    });
    localStorage.setItem("nrSelectedDates", 0);
  }, [tripType, selectedMonth]);

  const getDaysInMonth = (month, year) => {
    // Here jan is 1 based
    // Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
  };

  const handleOnMouseEnter = (evt) => {
    // Only for  Round Trip option and when 1 date is already selected
    if (tripType === "One way") return;
    if (nrSelectedDates === 0 || nrSelectedDates === 2) return;
    if (
      localStorage.getItem("nrSelectedDates") == 0 ||
      localStorage.getItem("nrSelectedDates") >= 2
    )
      return;
    if (JSON.parse(localStorage.getItem("firstItemSelected")) === null) return;

    let gridItems = document.querySelectorAll("#gridItemId");

    // Remove all hovered-date classes
    gridItems.forEach((item) => {
      item.classList.remove(styles.hoveredDate);
      item.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });

    let dateSelected = Date.parse(
      `${JSON.parse(localStorage.getItem("firstItemSelected"))[1]}/${
        JSON.parse(localStorage.getItem("firstItemSelected"))[0]
      }/${JSON.parse(localStorage.getItem("firstItemSelected"))[2]}`
    );
    let currentDate = Date.parse(
      `${evt.target.getAttribute("data-month-nr")}/${
        evt.target.textContent
      }/${evt.target.getAttribute("data-year-nr")}`
    );

    gridItems.forEach((item) => {
      let itemDate = Date.parse(
        "" +
          item.getAttribute("data-month-nr") +
          "/" +
          item.textContent +
          "/" +
          item.getAttribute("data-year-nr")
      );
      if (currentDate < dateSelected) {
        if (itemDate > currentDate && itemDate < dateSelected) {
          item.classList.add(styles.hoveredDate);
        }
        if (itemDate === currentDate) {
          item.classList.add(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
        }
      } else {
        if (itemDate > dateSelected && itemDate < currentDate) {
          item.classList.add(styles.hoveredDate);
        }
        if (itemDate === currentDate) {
          item.classList.add(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
        }
      }
    });
  };

  const selectDateFromSmallCalendar = (evt) => {
    // Show select button
    document.querySelector("#selectBtnId").style.display = "block";
    document.querySelector("#calendarCSmallId").style.height = "80% ";
    document.querySelector("#horizontalLineBottomId").style.display = "block";

    const type = localStorage.getItem("tripType");
    if (type === "Round trip") {
      // Cleanup
      if (parseInt(localStorage.getItem("nrSelectedDates")) === 0) {
        setFirstItemDate(evt.target);
        localStorage.setItem("nrSelectedDates", 1);
        nrSelectedDates = nrSelectedDates + 1;
        setNrSelectedDates(1);
        evt.target.classList.add(styles.selectedDate);

        return;
      }

      // Added already  2 items
      if (parseInt(localStorage.getItem("nrSelectedDates")) + 1 > 2) {
        removeHoveredAndSelectedClasses();
        localStorage.setItem("nrSelectedDates", 1);

        setFirstItemDate(evt.target);
        evt.target.classList.add(styles.selectedDate);
        return;
      }

      if (parseInt(localStorage.getItem("nrSelectedDates")) === 1) {
        setSecondItemDate(evt.target);
        localStorage.setItem("nrSelectedDates", 2);

        evt.target.classList.add(styles.selectedDate);
        nrSelectedDates = nrSelectedDates + 1;
        setNrSelectedDates(2);
        document.querySelector(
          `.${stylesFlightDate.calendarPlaceholder}`
        ).style.display = "block";
        document.querySelector(`#departingValuesSpanId`).style.color =
          "#212121";
        document.querySelector(`#departingValuesSpanId`).style.fontWeight =
          "400";

        return;
      }
    }
    // One way trip
    else {
      removeHoveredAndSelectedClasses();
      evt.target.classList.add(styles.selectedDate);

      setFirstItemDate(evt.target);
      document.querySelector(
        `.${stylesFlightDate.calendarPlaceholder}`
      ).style.display = "block";
      document.querySelector(`#departingValuesSpanId`).style.color = "#212121";
      document.querySelector(`#departingValuesSpanId`).style.fontWeight = "400";
    }

    nrSelectedDates = nrSelectedDates + 1;
    setNrSelectedDates(nrSelectedDates);
  };

  const setFirstItemDate = (data) => {
    localStorage.setItem(
      "firstItemSelected",
      JSON.stringify([
        data.textContent,
        data.getAttribute("data-month-nr"),
        data.getAttribute("data-year-nr"),
      ])
    );
  };
  const setSecondItemDate = (data) => {
    localStorage.setItem(
      "secondItemSelected",
      JSON.stringify([
        data.textContent,
        data.getAttribute("data-month-nr"),
        data.getAttribute("data-year-nr"),
      ])
    );
  };

  const getSelectedDatesAsMiliseconds = () => {
    let first = Date.parse(
      `${JSON.parse(localStorage.getItem("firstItemSelected"))[1]}/${
        JSON.parse(localStorage.getItem("firstItemSelected"))[0]
      }/${JSON.parse(localStorage.getItem("firstItemSelected"))[2]}`
    );
    let second = Date.parse(
      `${JSON.parse(localStorage.getItem("secondItemSelected"))[1]}/${
        JSON.parse(localStorage.getItem("secondItemSelected"))[0]
      }/${JSON.parse(localStorage.getItem("secondItemSelected"))[2]}`
    );

    return [first, second];
  };

  const setSelectedDates = (first, second) => {
    let txt = "";
    let arr;
    if (second - first < 0) {
      arr = [
        JSON.parse(localStorage.getItem("secondItemSelected")),
        JSON.parse(localStorage.getItem("firstItemSelected")),
      ];
    } else {
      arr = [
        JSON.parse(localStorage.getItem("firstItemSelected")),
        JSON.parse(localStorage.getItem("secondItemSelected")),
      ];
    }
    arr.map((item) => {
      txt += `${item[0]} ${months[item[1] - 1].slice(0, 3)}-`;
    });

    let finalStr = txt.slice(-txt.length, txt.length - 1);
    // Set chosen dates
    document.querySelector("#departingValuesSpanId").textContent = finalStr;
    // Hide calendar
    document.querySelector("#wrapperId").style.display = "none";
    document.querySelector("#departingSvgId").style.transform = "rotate(0deg)";
  };
  const removeHoveredAndSelectedClasses = () => {
    document.querySelectorAll("#gridItemId").forEach((el) => {
      el.classList.remove(styles.selectedDate);
      el.classList.remove(styles.hoveredDate);
      el.classList.remove(styles.hoveredDateWithoutBeforeAfterPseudoClasses);
    });
  };

  const selectDate = (evt) => {
    if (evt.target.classList.contains(styles.colorGray)) return;

    if (window.innerWidth <= 780) {
      selectDateFromSmallCalendar(evt);
      return;
    }

    const type = localStorage.getItem("tripType");
    if (type === "Round trip") {
      // Cleanup
      if (parseInt(localStorage.getItem("nrSelectedDates")) === 0) {
        setFirstItemDate(evt.target);
      }

      // Check if second selected date is bigger than first one
      if (parseInt(localStorage.getItem("nrSelectedDates")) === 1) {
        setSecondItemDate(evt.target);

        const [first, second] = getSelectedDatesAsMiliseconds();
        setSelectedDates(first, second);
        document.querySelector(
          `.${stylesFlightDate.calendarPlaceholder}`
        ).style.display = "block";
        document.querySelector(`#departingValuesSpanId`).style.color =
          "#212121";
        document.querySelector(`#departingValuesSpanId`).style.fontWeight =
          "400";
      }
      // Added already  2 items
      if (parseInt(localStorage.getItem("nrSelectedDates")) + 1 > 2) {
        removeHoveredAndSelectedClasses();
        localStorage.setItem("nrSelectedDates", 1);

        setFirstItemDate(evt.target);
        evt.target.classList.add(styles.selectedDate);

        return;
      }
      evt.target.classList.add(styles.selectedDate);
      evt.target.classList.remove(styles.hoveredDate);
    }
    // One way trip
    else {
      removeHoveredAndSelectedClasses();
      evt.target.classList.add(styles.selectedDate);

      setFirstItemDate(evt.target);
      let txt = "";
      let item = JSON.parse(localStorage.getItem("firstItemSelected"));
      txt += `${item[0]} ${months[item[1] - 1].slice(0, 3)}`;

      // Set chosen date
      document.querySelector("#departingValuesSpanId").textContent = txt;
      // Hide calendar
      document.querySelector("#wrapperId").style.display = "none";
      document.querySelector("#departingSvgId").style.transform =
        "rotate(0deg)";

      document.querySelector(
        `.${stylesFlightDate.calendarPlaceholder}`
      ).style.display = "block";
      document.querySelector(`#departingValuesSpanId`).style.color = "#212121";
      document.querySelector(`#departingValuesSpanId`).style.fontWeight = "400";
    }

    nrSelectedDates = nrSelectedDates + 1;
    localStorage.setItem(
      "nrSelectedDates",
      parseInt(localStorage.getItem("nrSelectedDates")) + 1
    );
    setNrSelectedDates(nrSelectedDates);
  };
  const determineJsx = (monthNr, year) => {
    const d = new Date(`${monthNr}/01//${year}`);
    let dayOfWeek = d.getDay();
    const maxDaysInMonth = getDaysInMonth(monthNr, year);

    if (dayOfWeek == 0) {
      dayOfWeek = 7;
    }

    let jsx = [];
    let k = 1;

    let i = 0;
    while (i < dayOfWeek - 1) {
      jsx.push(
        <div
          // key={uuid()}
          className={`${styles.gridItem}  ${styles.gridItemEmpty}`}
        ></div>
      );
      i++;
    }
    for (let i = 0; i < maxDaysInMonth; i++) {
      let className = `${styles.gridItem}`;
      if (k < new Date().getDate() && monthNr === new Date().getMonth() + 1) {
        className = `${styles.gridItem} ${styles.colorGray}`;
      }
      jsx.push(
        <div
          // key={uuid()}
          id='gridItemId'
          onClick={selectDate}
          className={className}
          data-month-nr={monthNr}
          data-year-nr={year}
        >
          {k}
        </div>
      );
      k++;
    }
    let d2 = new Date(`${monthNr}/${maxDaysInMonth}/${year}`);
    let dayOfWeek2 = d2.getDay();

    for (let i = 0; i < 7 - dayOfWeek2; i++) {
      jsx.push(
        <div
          key={i * monthNr}
          className={`${styles.gridItem}  ${styles.gridItemEmpty}`}
        ></div>
      );
    }

    return jsx;
  };

  return (
    <div id='monthId' className={styles.monthC}>
      <h4 className={styles[monthNameClass]} id='monthNameId'>
        {months[month - 1]}
      </h4>
      <div className={styles.gridContainer}>{determineJsx(month, year)}</div>
    </div>
  );
}
