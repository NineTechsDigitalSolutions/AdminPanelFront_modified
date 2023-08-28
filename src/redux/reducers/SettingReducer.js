import * as productTypes from "../types/SettingType";

const initialState = {
  generalSetting: null,
};

const SettingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_GENERAL_SETTING:
      return {
        ...state,
        generalSetting: payload,
      };
    default:
      return state;
  }
};

export default SettingReducer;
