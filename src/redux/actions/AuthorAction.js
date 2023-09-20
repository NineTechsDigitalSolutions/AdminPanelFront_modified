import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/AuthorType";

export const createAuthor = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await privateAPI.post(`/author/create`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("authors")
      );
      dispatch(GetAllAuthors());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateAuthor = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await privateAPI.post(`/author/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("authors")
      );
      dispatch(GetAllAuthors());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllAuthors = () => async (dispatch) => {
  console.log("Here", privateAPI.defaults.headers.common.Authorization);
  try {
    const res = await privateAPI.get(`/author/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_AUTHORS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeAuthorStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await privateAPI.get(`/author/toggle-status/${payload}`);
    if (res) {
      console.log(res.data);
      dispatch(GetAllAuthors());
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const SearchAuthor = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await privateAPI.post(`/author/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_AUTHORS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
