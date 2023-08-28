import swal from "sweetalert";
import { publicAPI, privateAPI } from "../../API/index";
import * as productTypes from "../types/DashboardType";

export const GetAllSales = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/sales/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_SALES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllPayments = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/payments/get-all`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_PAYMENTS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllHomeData = (payload) => async (dispatch) => {
  console.log("Home Acion payload", payload);
  try {
    const res = await publicAPI.post(`/home/get`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_HOME_DATA,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllStatistics = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const res = await publicAPI.post(`/home/get-statistics`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_STATISTICS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetAllUsers = (payload) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/home/get-monthly-users`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_ALL_USERS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetMonthlyAuthors = (payload) => async (dispatch) => {
  try {
    const res = await publicAPI.post(`/home/get-monthly-authors`, payload);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_MONTHLY_AUTHORS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetMonthlyOrders = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/home/get-monthly-orders`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_MONTHLY_ORDERS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetDailyProducts = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/home/get-daily-products`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_DAILY_PRODUCTS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};

export const GetDailySales = () => async (dispatch) => {
  try {
    const res = await publicAPI.get(`/home/get-daily-sales`);
    if (res) {
      console.log(res.data);
      dispatch({
        type: productTypes.GET_DAILY_SALES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
};
