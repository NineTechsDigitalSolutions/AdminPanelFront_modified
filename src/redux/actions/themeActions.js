import { CHANGE_LAYOUT } from "../types/themeTypes";

export const changeLayout = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_LAYOUT,
      payload: payload,
    });
  };
};
export const changeValue = () => {
  return async (dispatch) => {
    dispatch({
      type: "value",
    });
  };
};
