import * as productTypes from "../types/LibrarianType";

const initialState = {
  Librarian: null,
  AllLibrarian: null,
};

const LibrarianReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_LIBRARIANS:
      return {
        ...state,
        Librarian: payload,
      };
    case productTypes.GET_ALL_LIBRARIANS:
      return {
        ...state,
        AllLibrarian: payload,
      };

    default:
      return state;
  }
};

export default LibrarianReducer;
