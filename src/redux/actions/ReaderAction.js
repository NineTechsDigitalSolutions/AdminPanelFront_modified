import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/ReaderType";

export const createReader = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/user/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() => {
        history.replace("/readers");
      });
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateReader = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/user/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() => {
        history.replace("/readers");
      });
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllReaders = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/user/get-by-library`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_READERS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeReaderStatus = (payload, libraries) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/user/toggle-status/${payload}`);
    if (res) {
      dispatch(GetAllReaders(libraries));
      // swal("", res.data.message, "success");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchReader = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/user/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_READERS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
