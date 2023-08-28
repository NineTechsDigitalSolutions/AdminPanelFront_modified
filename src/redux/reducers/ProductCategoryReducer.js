import * as productTypes from "../types/ProductType";

const initialState = {
  AllProductCategories: null,
};

const ProductCategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_PRODUCT_CATEGORIES:
      return {
        ...state,
        AllProductCategories: payload,
      };

    default:
      return state;
  }
};

export default ProductCategoryReducer;
