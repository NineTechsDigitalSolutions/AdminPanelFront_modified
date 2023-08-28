import * as productTypes from "../types/AuthType";

const Library = JSON.parse(localStorage.getItem("Selectedlibrary"));

const initialState = {
  LoginDetails: null,
  Selectedlibrary: Library?.length > 0 ? Library : null,
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.LOGIN_DETAILS:
      return {
        ...state,
        LoginDetails: payload,
      };
    case productTypes.SELECTED_LIBRARY:
      return {
        ...state,
        Selectedlibrary: payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
