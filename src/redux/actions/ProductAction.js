import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/ProductType";

export const createProduct = (payload, history) => async (dispatch) => {
  console.log(payload);
  for (var pair of payload.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  try {
    const res = await publicAPI.post(`/product/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("products")
      );
      dispatch(GetAllProducts());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateProduct = (payload, history) => async (dispatch) => {
  console.log(payload);
  for (var pair of payload.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  try {
    const res = await publicAPI.post(`/product/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("products")
      );
      dispatch(GetAllProducts());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllProducts = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/product/getAll`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_PRODUCTS,
        payload: res.data.products,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeProductStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/product/change-status/${payload}`);
    if (res) {
      console.log(res.data);
      swal("", res.data.message, "success");

      dispatch(GetAllProducts());
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllOrders = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/order/getAll`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_ORDERS,
        payload: res.data.orders,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchProducts = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/product/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_PRODUCTS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
