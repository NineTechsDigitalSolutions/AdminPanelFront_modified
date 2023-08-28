import * as productTypes from "../types/BannerType";

const initialState = {
  AllBanners: null,
};

const BannerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_BANNER:
      return {
        ...state,
        AllBanners: payload,
      };
    default:
      return state;
  }
};

export default BannerReducer;
