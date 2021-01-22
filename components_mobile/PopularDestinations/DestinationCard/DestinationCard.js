import React, { useState } from "react";
import styles from "./DestinationCard.module.scss";
export default function DestinationCard(props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const onClickArrowIconHandler = () => {
    setIsOpenDropdown((prevValue) => !prevValue);
    document
      .querySelector(`#${props.id}`)
      .classList.toggle(styles.rotate180deg);

    document
      .querySelector(`#container_${props.id}`)
      .classList.toggle(styles.openContainer);
  };
  return (
    // <div className={styles.container}>
    //   <div>{americanFlagSvg}</div>
    //   <div>
    //     <div>Авиабилеты</div>
    //     <div className={styles.country}>США</div>
    //   </div>
    //   <div className={styles.priceC}>
    //     <span>
    //       от <span>249$</span>
    //     </span>
    //   </div>
    // </div>
    <div id={`container_${props.id}`} className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.destinationFlag}>
          <img src='/images/ae.png' />
        </div>
        <div className={styles.destination}>
          <div className={styles.city}>Дубай</div>
          <div className={styles.country}>ОАЭ</div>
        </div>
        <div className={styles.detailsContainer}>
          <div
            id={props.id}
            onClick={onClickArrowIconHandler}
            className={styles.arrowIcon}
          ></div>
        </div>
      </div>
      {isOpenDropdown ? (
        <div className={styles.flightListDropdwon}>
          <DropdownItem direction='Москва - Дубай' />
          <DropdownItem direction='Санкт-Петербург - Дубай' />
          <DropdownItem direction='Казань - Дубай' />
          <DropdownItem direction='Екатеринбург - Дубай' />
          <DropdownItem direction='Краснодар - Дубай' />
          <DropdownItem direction='Уфа - Дубай' />
          <DropdownItem direction='Новосибирск - Дубай' />
          <DropdownItem direction='Самара - Дубай' />
          <DropdownItem direction='Ростов-на-Дону - Дубай' />
          <DropdownItem direction='Минеральные Воды - Дубай' />
        </div>
      ) : null}
    </div>
  );
}

function DropdownItem({ direction }) {
  return (
    <div className={styles.item}>
      <span>{direction}</span>
      <span>
        От
        <span className={styles.value}>
          250 <span className={styles.currency}>&euro;</span>
        </span>
      </span>
    </div>
  );
}
