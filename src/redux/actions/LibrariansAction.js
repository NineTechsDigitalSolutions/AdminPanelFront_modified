import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/LibrarianType";

export const createLibrarian = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/librarian/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() => {
        history.replace("/librarians");
      });
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateLibrarian = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/librarian/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() => {
        history.replace("/librarians");
      });
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const getLibrarians = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/library/get`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_LIBRARIANS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const getLibrarians1 = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/librarian/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_LIBRARIANS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllLibrarians = (payload) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/librarian/get-by-library`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_LIBRARIANS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeLibrarianStatus =
  (payload, libraries) => async (dispatch) => {
    console.log(payload);
    try {
      const res = await publicAPI.get(`/librarian/toggle-status/${payload}`);
      if (res) {
        console.log(res.data);
        dispatch(GetAllLibrarians(libraries));
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

export const DeleteLibrarian = (payload, libraries) => async (dispatch) => {
  // console.log(payload);
  try {
    const res = await publicAPI.post(`/librarian/delete`, payload);
    if (res) {
      swal("", res.data.message, "success");
      // console.log(res.data);
      dispatch(GetAllLibrarians(libraries));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeLibrarianByStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/librarian/get-by-status/`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_LIBRARIANS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchLibrarian = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/librarian/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_LIBRARIANS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
