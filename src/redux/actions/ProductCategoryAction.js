import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/ProductType";

export const createProductCategory = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/productCategory/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("product-categories")
      );
      dispatch(GetAllProductCategories());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateProductCategory = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/productCategory/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("product-categories")
      );
      dispatch(GetAllProductCategories());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllProductCategories = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/productCategory/getAll`);
    if (res) {
      console.log("GetAllProductCategories", res.data);
      dispatch({
        type: productTypes.GET_ALL_PRODUCT_CATEGORIES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeProductCategoryStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(
      `/productCategory/change-status/${payload}`
    );
    if (res) {
      console.log(res.data);
      swal("", res.data.message, "success");
      dispatch(GetAllProductCategories());
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchProductCategory = (payload) => async (dispatch) => {
  // console.log(payload);
  try {
    const res = await publicAPI.post(`/productCategory/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_PRODUCT_CATEGORIES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
