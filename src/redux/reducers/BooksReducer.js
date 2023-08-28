import * as productTypes from "../types/BooksType";

const initialState = {
  AllBooks: null,
};

const BooksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_BOOKS:
      return {
        ...state,
        AllBooks: payload,
      };
    default:
      return state;
  }
};

export default BooksReducer;
