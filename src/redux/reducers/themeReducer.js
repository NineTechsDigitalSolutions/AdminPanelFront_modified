import * as themeTypes from "../types/themeTypes";

const initialState = {
  color: "red",
  layout: "vertical",
  updateValues: false,
  isAdmin: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case themeTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layout: payload,
      };
    case "value":
      return {
        ...state,
        updateValues: !state.updateValues,
      };
    case "IS_ADMIN":
      return {
        ...state,
        isAdmin: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
