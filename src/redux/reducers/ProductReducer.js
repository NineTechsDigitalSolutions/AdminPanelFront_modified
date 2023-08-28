import * as productTypes from "../types/ProductType";

const initialState = {
  AllProducts: null,
  AllOrders:null
};

const LibrarianReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        AllProducts: payload,
      };
      case productTypes.GET_ALL_ORDERS:
      return {
        ...state,
        AllOrders: payload,
      };

    default:
      return state;
  }
};

export default LibrarianReducer;
