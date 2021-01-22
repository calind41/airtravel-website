export const transfCities = [
  {
    name: "Бухарест",
    code: "BUH",
    checked: false,
  },
  {
    name: "Франкфурт-на-Майне",
    code: "FRA",
    checked: false,
  },
  {
    name: "Санкт-Петербург",
    code: "LED",
    checked: false,
  },
  {
    name: "София",
    code: "SOF",
    checked: false,
  },
  {
    name: "Москва",
    code: "MOW",
    checked: false,
  },
  {
    name: "Аликанте",
    code: "ALC",
    checked: false,
  },
  {
    name: "Тель-Авив",
    code: "TLV",
    checked: false,
  },
  {
    name: "Женева",
    code: "GVA",
    checked: false,
  },
  {
    name: "Милан",
    code: "MIL",
    checked: false,
  },
  {
    name: "Вена",
    code: "VIE",
    checked: false,
  },
];

export const aircList = [
  {
    name: "Wizz Air",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "British Airways",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Ryanair",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "EasyJet",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "TAROM S.A.",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Blue Air",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Air Moldova",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Air Leasure",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "Fly One",
    startPrice: "от 320$",
    checked: false,
  },
  {
    name: "UTair",
    startPrice: "от 320$",
    checked: false,
  },
];

export const arrAirports = [
  {
    name: "Стенстед",
    code: "STN",
    checked: false,
  },
  {
    name: "Гатвик",
    code: "LGW",
    checked: false,
  },
  {
    name: "Хитроу",
    code: "LHR",
    checked: false,
  },
  {
    name: "Лондон-Сити",
    code: "LCY",
    checked: false,
  },
  {
    name: "Лутон",
    code: "LTN",
    checked: false,
  },
  {
    name: "Соутенд Муниципал",
    code: "SEN",
    checked: false,
  },
];

export const sellerList = [
  {
    name: "Тинькофф",
    description: "Кэшбэк и бонусы, рассрочка, сервис",
    checked: false,
  },
  {
    name: "Партнеры",
    description: "Кэшбэк и бонусы начисляются",
    checked: false,
  },
];

export function FiltersReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "updateFilterSettingsState": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          [action.fieldName]: action.payload,
        },
      };
    }
    case "updateBaggageSettings": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          baggageSettingsInitialState: {
            ...state.filtersModalInitialState.baggageSettingsInitialState,
            [action.fieldName]: [action.payload],
          },
        },
      };
    }
    case "updateDeppArrSettings": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          deppArrSettingsInitialState: {
            ...state.filtersModalInitialState.deppArrSettingsInitialState,
            [action.fieldName]: action.payload,
          },
        },
      };
    }
    case "updateAirportSettings": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          airportSettingsInitialState: {
            ...state.filtersModalInitialState.airportSettingsInitialState,
            [action.fieldName]: action.payload,
          },
        },
      };
    }
    case "updateSellerSettings": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          sellerSettingsInitialState: {
            ...state.filtersModalInitialState.sellerSettingsInitialState,
            [action.fieldName]: action.payload,
          },
        },
      };
    }
    case "unmountSortByModal": {
      return {
        ...state,
        renderSortByModal: false,
        initialSortByCriteria: action.payload.initialSortByCriteria,
        initialAscendingSort: action.payload.initialAscendingSort,
      };
    }
    case "unmountFiltersModal": {
      return {
        ...state,
        renderFiltersModal: false,
        filterSettingsCount: action.payload.filterSettingsCount,
      };
    }
    case "selectOptionWithBaggage": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          baggageSettingCount: 1,
          baggageSettingsInitialState: {
            checkedWithBaggage: true,
            checkedWithoutBaggage: false,
          },
          withBaggageSelected: !state.filtersModalInitialState
            .withBaggageSelected,
        },
      };
    }
    case "deselectOptionWithBaggage": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          baggageSettingCount: 0,
          baggageSettingsInitialState: {
            checkedWithBaggage: false,
            checkedWithoutBaggage: false,
          },
          withBaggageSelected: !state.filtersModalInitialState
            .withBaggageSelected,
        },
      };
    }
    case "selectOptionDirectFlight": {
      const ptc = state.filtersModalInitialState.transferCitiesInitialState;

      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          nrTransfersInitialState: {
            noTransfer: true,
            oneTransfer: false,
            twoPlusTransfer: false,
          },
          transferCitiesInitialState: ptc.map((item) => ({
            ...item,
            checked: false,
          })),
          transferSettingsCount: 1,
          directFlightSelected: !state.filtersModalInitialState
            .directFlightSelected,
        },
      };
    }
    case "deselectOptionDirectFlight": {
      return {
        ...state,
        filtersModalInitialState: {
          ...state.filtersModalInitialState,
          nrTransfersInitialState: {
            noTransfer: false,
            oneTransfer: false,
            twoPlusTransfer: false,
          },
          transferSettingsCount: 0,
          directFlightSelected: !state.filtersModalInitialState
            .directFlightSelected,
        },
      };
    }
  }
}

export const fmis = {
  withBaggageSelected: false,
  directFlightSelected: false,
  renderBaggageSettingsModal: false,
  renderTransferSettingsModal: false,
  renderDepartureArrivalSettingsModal: false,
  renderAircompanySettingsModal: false,
  renderAirportSettingsModal: false,
  renderSellerSettingsModal: false,
  baggageSettingCount: 0,
  baggageSettingsInitialState: {
    checkedWithBaggage: false,
    checkedWithoutBaggage: false,
  },
  transferSettingsCount: 0,
  nrTransfersInitialState: {
    noTransfer: false,
    oneTransfer: false,
    twoPlusTransfer: false,
  },
  transferCitiesInitialState: transfCities,
  depArrSettingsCount: 0,
  deppArrSettingsInitialState: {
    depSliderValues: [0, 720],
    depStartTime: "00:00",
    depEndTime: "24:00",
    arrSliderValues: [0, 1440],
    arrStartTime: "00:00, 13 мар",
    arrEndTime: "24:00, 14 мар",
    arrivalStartDate: "13 мар",
    arrivalEndDate: "14 мар",
    flightDurationSliderValue: [2160],
    flightDuration: "72ч 00м",
  },
  airCompSettingsCount: 0,
  airCompSettingsInitialState: {
    oneWorldAlliance: false,
    skyTeamAlliance: false,
    starAlliance: false,
    checkedChooseAll: false,
    aircompanyList: aircList,
  },
  airportSettingsCount: 0,
  airportSettingsInitialState: {
    arrivalAirports: arrAirports,
    depAirport: {
      name: "Кишинёв",
      code: "KIV",
    },
  },
  sellerSettingsCount: 0,
  sellerSettingsInitialState: {
    sellers: sellerList,
  },
};

export const initialState = {
  renderLoader: true,
  filtersModalInitialState: fmis,
  renderSortByModal: false,
  initialSortByCriteria: 1,
  initialAscendingSort: true,
  renderFiltersModal: false,
  filterSettingsCount: 0,
};
