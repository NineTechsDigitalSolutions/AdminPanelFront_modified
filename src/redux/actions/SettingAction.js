import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/SettingType";

export const createSettingContent = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/content/admin/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success");
      dispatch(GetGeneralSetting());
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const Update = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/author/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("authors")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetGeneralSetting = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/content/user/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_GENERAL_SETTING,
        payload: res.data.content,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const ChangeStatus = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.get(`/author/toggle-status/${payload}`);
    if (res) {
      console.log(res.data);
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
