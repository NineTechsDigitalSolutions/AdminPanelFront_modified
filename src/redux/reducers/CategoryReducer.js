import * as productTypes from "../types/CategoryType";

const initialState = {
  Category: null,
  AllCategory: null,
  Material: null,
  ALLCategoriesById: null,
  ALLSubCategoriesById: null,
  AllCategoriesByMaterial: null,
};

const CategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_CATEGORY:
      return {
        ...state,
        AllCategory: payload,
      };
    case productTypes.GET_MATERIAL:
      return {
        ...state,
        Material: payload,
      };
    case productTypes.GET_ALL_CATEGORY_BY_ID:
      return {
        ...state,
        ALLCategoriesById: payload,
      };
    case productTypes.GET_ALL_SUB_CATEGORY_BY_ID:
      return {
        ...state,
        ALLSubCategoriesById: payload,
      };
    case productTypes.GET_ALL_CATEGORY_BY_MATERIAL:
      return {
        ...state,
        AllCategoriesByMaterial: payload,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
