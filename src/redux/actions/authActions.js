import swal from "sweetalert";
import { notification } from "antd";
import { publicAPI, privateAPI } from "../../API";
import * as productTypes from "../types/AuthType";
import { attachToken } from '../../API/index';

export const userLogin = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/librarian/login`, payload);
    if (res) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem(
        "userName",
        res?.data?.user?.name
          ? res?.data?.user?.name
          : `${res?.data?.user.firstName} ${res?.data?.user.lastName}`
      );
      console.log(res);
      dispatch({
        type: productTypes.LOGIN_DETAILS,
        payload: res.data,
      });
      notification.success({
        message: res.data.message,
        duration: 3,
      });
      history.replace("/");
      attachToken();
      // swal("", res.data.message, "success").then(() => {
      // });
    }
  } catch (err) {
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};

export const ForgetEmail = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/auth/forget-password`, payload);
    if (res) {
      console.log(res);
      localStorage.setItem("ForgetEmail", payload.email);
      swal("", res.data.message, "success").then(() =>
        history.replace("/verifyCode")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};

export const ForgetVerifyCode = (payload, history) => async (dispatch) => {
  try {
    console.log("hit");
    const res = await publicAPI.post(`/auth/verify-forget-code`, payload);
    if (res) {
      console.log(res);
      swal("", res.data.message, "success").then(() =>
        history.replace("/changePassword")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};

export const ForgetPassword = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/auth/change-password`, payload);
    if (res) {
      console.log(res);
      swal("", res.data.message, "success").then(() =>
        history.replace("/login")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};

export const SelectedLibrary = (payload) => async (dispatch) => {
  console.log("Auth Actionn", payload);
  dispatch({
    type: productTypes.SELECTED_LIBRARY,
    payload: payload,
  });
};

export const UploadImage = (payload) => async (dispatch) => {
  //console.log("1111",payload)
  try {
    const res = await publicAPI.post(`/auth/upload-image`, payload);
    if (res) {
      // console.log(res.data?.url);
      return res.data;
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};


export const UploadFile = (payload) => async (dispatch) => {
  //console.log("file",payload)
  try {
    const res = await publicAPI.post(`/auth/upload-file`, payload);
    if (res) {
      // console.log(res.data?.url);
      return res.data;
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
    swal("", err?.response?.data?.message || "Server Error", "error");
  }
};
