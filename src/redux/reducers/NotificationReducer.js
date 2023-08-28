import * as productTypes from "../types/NotificationType";

const initialState = {
  SelectedReader: null,
  AllQuerries: null,
};

const PackagesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.SELECT_READER:
      return {
        ...state,
        SelectedReader: payload,
      };
      case productTypes.GET_ALL_QUERRIES:
        return {
          ...state,
          AllQuerries: payload,
        };
    default:
      return state;
  }
};

export default PackagesReducer;
