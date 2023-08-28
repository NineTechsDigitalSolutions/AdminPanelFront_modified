import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/NotificationType";


export const GetAllQuerries = () => async (dispatch) => {
    try {
      const res = await publicAPI.get(`/query/getAll`);
      if (res) {
        console.log(res.data);
        dispatch({
          type: productTypes.GET_ALL_QUERRIES,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

export const SelectReader = (payload) => async (dispatch) => {
    console.log(payload);
    dispatch({
        type: productTypes.SELECT_READER,
        payload: payload,
    });
};

export const SendSmsNotification = (payload) => async (dispatch) => {
    try {
        const res = await publicAPI.post(`/notification/create/sms-notification`, payload);
        if (res) {
            swal("", res.data.message, "success")
            console.log(res.data);
        }
    } catch (err) {
        console.log(err?.response?.data?.message);
    }
};

export const SendEmailNotification = (payload) => async (dispatch) => {
    try {
        const res = await publicAPI.post(`/notification/create/email-notification`, payload);
        if (res) {
            swal("", res.data.message, "success")
            console.log(res.data);
        }
    } catch (err) {
        console.log(err?.response?.data?.message);
    }
};

export const SendPushNotification = (payload) => async (dispatch) => {
    try {
        const res = await publicAPI.post(`/notification/create/push-notification`, payload);
        if (res) {
            swal("", res.data.message, "success")
            console.log(res.data);
        }
    } catch (err) {
        console.log(err?.response?.data?.message);
    }
};

export const ReplyQuerry = (payload) => async (dispatch) => {
    try {
        const res = await publicAPI.post(`/query/reply`, payload);
        if (res) {
            swal("", res.data.message, "success")
            console.log(res.data);
        }
    } catch (err) {
        console.log(err?.response?.data?.message);
    }
};