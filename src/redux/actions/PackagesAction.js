import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/PackagesType";

export const createPackage = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/plan/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("packages")
      );
      dispatch(GetAllPackages());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdatePackage = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/plan/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("packages")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllPackages = (payload) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/plan/get-by-library`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_PACKAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangePackageStatus = (payload , libraries) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/plan/change-status/${payload}`);
    if (res) {
      console.log(res.data);
      swal("", res.data.message, "success");
      dispatch(GetAllPackages(libraries));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchPackages = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/plan/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_PACKAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
