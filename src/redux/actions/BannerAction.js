import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/BannerType";

export const createBanner = (payload, history) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/banner/create`, payload);
    console.log(res.data);
    if (res) {
      dispatch(GetBanners());
      swal("", res.data.message, "success").then(() =>
        history.replace("mobile-settings")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const UpdateBanner = (payload, history) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/banner/update`, payload);
    console.log(res.data);
    if (res) {
      swal("", res.data.message, "success").then(() =>
        history.replace("mobile-settings")
      );
    }
  } catch (err) {
    swal("", err?.response?.data?.message, "error");
    console.log(err?.response?.data?.message);
  }
};

export const GetBanners = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/banner/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_BANNER,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

// export const ChangeStatus = (payload) => async (dispatch) => {
//   console.log(payload);
//   try {
//     const res = await publicAPI.get(`/author/toggle-status/${payload}`);
//     if (res) {
//       console.log(res.data);
//     }
//   } catch (err) {
//     console.log(err?.response?.data?.message);
//   }
// };
