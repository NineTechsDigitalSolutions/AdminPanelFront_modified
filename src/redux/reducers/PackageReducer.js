import * as productTypes from "../types/PackagesType";

const initialState = {
  packages: null,
};

const PackagesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_PACKAGES:
      return {
        ...state,
        packages: payload,
      };
    default:
      return state;
  }
};

export default PackagesReducer;
