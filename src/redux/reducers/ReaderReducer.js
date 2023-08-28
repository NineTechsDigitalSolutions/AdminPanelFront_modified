import * as productTypes from "../types/ReaderType";

const initialState = {
  Readers: null,
  AllReaders: null,
};

const ReaderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_READERS:
      return {
        ...state,
        AllReaders: payload,
      };
    default:
      return state;
  }
};

export default ReaderReducer;
