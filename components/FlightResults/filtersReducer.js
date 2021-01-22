export function FiltersReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "openAircompanyDropdown": {
      return {
        ...state,
        animateClass: "animateSlideDown",
        renderAirCompanyList: true,
      };
    }
    case "openFilterSettingsDropdown": {
      return {
        ...state,
        animateClass: "animateSlideDown",
        renderFilterSettings: true,
      };
    }
    case "unmountLoader": {
      return {
        ...state,
        renderLoader: false,
      };
    }
    case "selectAllAircompanies": {
      return {
        ...state,
        selectedAircompaniesIndexArray: [0],
        selectedAircompanyCount: 0,
      };
    }
    case "subtractIndex": {
      const index = action.payload;
      const temp = state.selectedAircompaniesIndexArray.filter(
        (item) => item !== index
      );
      return {
        ...state,
        selectedAircompaniesIndexArray: temp,
      };
    }
    case "addIndex": {
      const index = action.payload;
      let newSelectedAircompaniesIndexArray;
      let newSelectedAircompanyCount = state.selectedAircompanyCount + 1;
      if (index === 0) {
        newSelectedAircompaniesIndexArray = [0];
        newSelectedAircompanyCount = 0;
      } else {
        newSelectedAircompaniesIndexArray = [
          ...state.selectedAircompaniesIndexArray,
          index,
        ];
      }

      return {
        ...state,
        selectedAircompaniesIndexArray: newSelectedAircompaniesIndexArray,
        selectedAircompanyCount: newSelectedAircompanyCount,
      };
    }
    case "decreaseNumOfFilters": {
      const amount = action.payload ? action.payload : 1;
      return {
        ...state,
        numOfFilters: state.numOfFilters - amount,
      };
    }
    case "increaseNumOfFilters": {
      return {
        ...state,
        numOfFilters: state.numOfFilters + 1,
      };
    }
  }
}
