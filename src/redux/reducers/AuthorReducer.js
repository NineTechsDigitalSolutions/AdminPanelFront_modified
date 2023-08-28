import * as productTypes from "../types/AuthorType";

const initialState = {
  AllAuthors: null,
};

const AuthorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_AUTHORS:
      return {
        ...state,
        AllAuthors: payload,
      };
      
    default:
      return state;
  }
};

export default AuthorReducer;
