import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/BooksType";

export const createBook = (payload, history) => async (dispatch) => {
  try {
    console.log("payload : ", payload);
    const res = await publicAPI.post(`/book/create`, payload);
    if (res) {
      console.log(res.data);
      swal("", res.data.message, "success").then(() =>
        history.replace("/materials")
      );
      dispatch(GetAllBooks());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateBook = (payload, history) => async (dispatch) => {
  console.log("hit", payload);
  try {
    const res = await publicAPI.post(`/book/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("/materials")
      );
      dispatch(GetAllBooks());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetAllBooks = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/book/get-by-library-admin`, payload);
    if (res) {
      console.log("Admin get All",res.data);
      dispatch({
        type: productTypes.GET_ALL_BOOKS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllBooksByType = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    //const res = await publicAPI.post(`/book/get-by-type`, payload);
    const res = await publicAPI.post(`/book/get-all`, payload);
    console.log("Ddfdf123",res.data);

    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_BOOKS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeBookStatus = (payload, libraries) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/book/toggle-view-library/${payload}`);
    if (res) {
      swal("", res.data.message, "success");
      console.log(res.data);
      dispatch(GetAllBooks(libraries));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
    swal("", err?.response?.data?.message, "error");
  }
};

export const SearchBook = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/book/search`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_BOOKS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const DeleteBook = (payload, libraries) => async (dispatch) => {
  // console.log(payload);
  try {
    const res = await publicAPI.post(`/book/delete`, payload);
    if (res) {
      swal("", res.data.message, "success");
      // console.log(res.data);
      dispatch(GetAllBooks(libraries));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
