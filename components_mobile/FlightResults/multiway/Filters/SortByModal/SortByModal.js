import React, { useState, useEffect } from "react";
import styles from "./SortByModal.module.scss";
import { sortIcon } from "../Filters";
import { dom } from "../../../../../helpers/reuse";

export default function SortByModal({
  initialCriteria,
  initialAscendingSort,
  unmountModal,
}) {
  const [ascendingSort, setAscendingSort] = useState(initialAscendingSort);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [unmount, setUnmount] = useState(false);
  const [touchStartVal, setTouchStartVal] = useState();

  const handleTouchStart = (evt) => {
    setTouchStartVal(evt.touches[0].clientY);
  };
  const handleTouchMove = (evt) => {
    if (evt.target.classList.contains(styles.overlay)) return;
    evt.preventDefault();

    const wrapper = dom(`.${styles.wrapper}`);
    let value = evt.touches[0].clientY;
    // console.log(value);

    if (value <= 50) return;
    if (window.outerHeight - value <= 50) {
      return;
    }
    wrapper.style.transition = "top 0.3s ease";
    wrapper.style.top = value + "px";
  };
  const handleTouchEnd = (evt) => {
    const wrapper = dom(`.${styles.wrapper}`);
    const scrollDownAmount = window.outerHeight - parseInt(wrapper.style.top);
    if (scrollDownAmount <= 210) {
      wrapper.style.top = "100%";
      wrapper.style.transition =
        "top 0.3s cubic-bezier(0.59, 0.18, 0.01, 1.05)";
      unmountHelper();
      return;
    }

    wrapper.style.top = "calc(100% - 343px)";
    wrapper.style.transition = "top 0.3s ease";
  };

  useEffect(() => {
    const container = dom(`.${styles.container}`);
    const htmlEl = dom("html");
    htmlEl.style.overflow = "hidden";
    container.addEventListener("touchstart", handleTouchStart, false);

    container.addEventListener("touchmove", handleTouchMove, false);
    container.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      container.removeEventListener("touchmove", handleTouchMove, false);
      container.removeEventListener("touchend", handleTouchEnd, false);
      htmlEl.style.overflow = "visible";
    };
  }, []);

  const changeSortDirection = () => {
    setAscendingSort((prevValue) => !prevValue);
  };

  const chooseCriteria = (crt) => {
    setCriteria(crt);
    if (crt !== criteria) {
      unmountHelper(crt, ascendingSort);
    }
  };
  const unmountHelper = (crt, ascendingSort) => {
    if (!crt) {
      setTimeout(() => {
        unmountModal(criteria, ascendingSort);
      }, 300);
      return;
    }
    const wrapper = dom(`.${styles.wrapper}`);
    wrapper.style = {};
    setUnmount(true);
    //   close modal
    setTimeout(() => {
      unmountModal(crt, ascendingSort);
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => unmountHelper(criteria, ascendingSort)}
        className={
          unmount
            ? `${styles.overlay} ${styles.overlayAnimDown}`
            : `${styles.overlay}`
        }
      ></div>
      <div
        className={
          unmount
            ? `${styles.wrapper} ${styles.wrapperAnimDown}`
            : `${styles.wrapper} ${styles.wrapperAnimUp}`
        }
      >
        <div className={styles.closeLineIcon}>{closeLineIcon}</div>
        <div className={styles.header}>
          <div className={styles.title}>Сортировка</div>
          <div onClick={changeSortDirection} className={styles.sortDirection}>
            {ascendingSort ? (
              <div className={styles.asc}>От меньшего</div>
            ) : (
              <div className={styles.desc}>От большего</div>
            )}

            <div
              style={!ascendingSort ? { transform: "scaleY(-1)" } : {}}
              className={styles.icon}
            >
              {sortIcon}
            </div>
          </div>
        </div>
        <div onClick={() => chooseCriteria(1)} className={styles.sortCriteria}>
          <div className={styles.name}>По цене</div>
          <div
            className={
              criteria === 1
                ? `${styles.selectedIcon} ${styles.isSelected}`
                : `${styles.selectedIcon}`
            }
          >
            {selectedIcon}
          </div>
        </div>
        <div onClick={() => chooseCriteria(2)} className={styles.sortCriteria}>
          <div className={styles.name}>По вылету</div>
          <div
            className={
              criteria === 2
                ? `${styles.selectedIcon} ${styles.isSelected}`
                : `${styles.selectedIcon}`
            }
          >
            {selectedIcon}
          </div>
        </div>
        <div onClick={() => chooseCriteria(3)} className={styles.sortCriteria}>
          <div className={styles.name}>По прилету</div>
          <div
            className={
              criteria === 3
                ? `${styles.selectedIcon} ${styles.isSelected}`
                : `${styles.selectedIcon}`
            }
          >
            {selectedIcon}
          </div>
        </div>
        <div onClick={() => chooseCriteria(4)} className={styles.sortCriteria}>
          <div className={styles.name}>По времени в пути</div>
          <div
            className={
              criteria === 4
                ? `${styles.selectedIcon} ${styles.isSelected}`
                : `${styles.selectedIcon}`
            }
          >
            {selectedIcon}
          </div>
        </div>
      </div>
    </div>
  );
}

export const closeLineIcon = (
  <svg id='closeLine' height='4' width='32' xmlns='http://www.w3.org/2000/svg'>
    <rect
      className='icon__fill'
      fill='#333'
      fillRule='evenodd'
      height='4'
      rx='2'
      width='32'
    ></rect>
  </svg>
);

export const selectedIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M16.293 8.293l-6.294 6.294c.001-.001-2.292-2.294-2.292-2.294a1 1 0 00-1.414 1.414l2.294 2.294c.78.78 2.05.777 2.826 0l6.294-6.294a1 1 0 10-1.414-1.414z'
      fill='currentColor'
    ></path>
  </svg>
);
