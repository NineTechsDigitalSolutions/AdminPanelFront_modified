import * as productTypes from "../types/DashboardType";

const initialState = {
  AllSales: null,
  AllPayments: null,
  AllStatistics: null,
  AllUsers: null,
  MonthlyOrders: null,
  MonthlyAuthors: null,
  DailyProducts: null,
  DailySales: null,
  HomeData: null,
};

const AuthorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productTypes.GET_ALL_SALES:
      return {
        ...state,
        AllSales: payload,
      };
    case productTypes.GET_ALL_PAYMENTS:
      return {
        ...state,
        AllPayments: payload,
      };
    case productTypes.GET_ALL_STATISTICS:
      return {
        ...state,
        AllStatistics: payload,
      };
      case productTypes.GET_ALL_USERS:
      return {
        ...state,
        AllUsers: payload,
      };
      case productTypes.GET_MONTHLY_ORDERS:
      return {
        ...state,
        MonthlyOrders: payload,
      };
      case productTypes.GET_MONTHLY_AUTHORS:
      return {
        ...state,
        MonthlyAuthors: payload,
      };
      case productTypes.GET_DAILY_PRODUCTS:
      return {
        ...state,
        DailyProducts: payload,
      };
      case productTypes.GET_DAILY_SALES:
      return {
        ...state,
        DailySales: payload,
      };
      case productTypes.GET_ALL_HOME_DATA:
      return {
        ...state,
        HomeData: payload,
      };
    default:
      return state;
  }
};

export default AuthorReducer;
