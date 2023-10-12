import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/CategoryType";

export const createCategory = (payload, material) => async (dispatch) => {
  // console.log(payload);
  try {
    const res = await publicAPI.post(`/category/create`, payload);
    // console.log(res.data);
    if (res) {
      dispatch(GetAllCategory({ type: material }));
      swal("", res.data.message, "success");
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateCategory = (payload, catType) => async (dispatch) => {
  console.log("catType", catType);
  try {
    const res = await publicAPI.post(`/category/update`, payload);
    // console.log(res.data);
    if (res) {
      dispatch(GetAllCategory({ type: catType }));
      swal("", res.data.message, "success");
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllCategory = (payload) => async (dispatch) => {
  console.log("Payload1",payload)
  try {
    const res = await publicAPI.get(`/category/get-all?type=${payload.type}`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_CATEGORY,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetMaterial = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/material/get`);
    if (res) {
      dispatch({
        type: productTypes.GET_MATERIAL,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeCategoryStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/category/toggle-status/${payload}`);
    if (res) {
      console.log(res.data);
      dispatch(GetAllCategory());
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetCategoriesByID = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/category/get-all-categories`);
    //console.log("Navo123",res);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_CATEGORY_BY_ID, //here name
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetCategoriesByMaterial = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/category/get-all-categories/${payload}`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_CATEGORY_BY_MATERIAL,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetSubCategoriesByID = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(
      `/category/get-all-subcategories/${payload}`
    );
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_SUB_CATEGORY_BY_ID,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchCategory = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/category/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_CATEGORY,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const DeleteCategory = (payload, catType) => async (dispatch) => {
  // console.log(payload);
  try {
    const res = await publicAPI.post(`/category/delete`, payload);
    if (res) {
      swal("", res.data.message, "success");
      console.log(res.data);
      dispatch(GetAllCategory({ type: catType }));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
    swal("", err?.response?.data?.message, "error");
  }
};
