import { combineReducers } from "redux";

import themeReducer from "./reducers/themeReducer";
import LibrarianReducer from "./reducers/LibrarianReducer";
import ReaderReducer from "./reducers/ReaderReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import BooksReducer from "./reducers/BooksReducer";
import AuthorReducer from "./reducers/AuthorReducer";
import ProductReducer from "./reducers/ProductReducer";
import SettingReducer from "./reducers/SettingReducer";
import PackagesReducer from "./reducers/PackageReducer";
import BannerReducer from "./reducers/BannerReducer";
import DashboardReducer from "./reducers/DashobardReducer";
import NotificationReducer from "./reducers/NotificationReducer";
import AuthReducer from "./reducers/AuthReducer";
import ProductCategoryReducer from "./reducers/ProductCategoryReducer";

const rootReducer = combineReducers({
  themeReducer,
  LibrarianReducer,
  ReaderReducer,
  CategoryReducer,
  BooksReducer,
  AuthorReducer,
  ProductReducer,
  SettingReducer,
  PackagesReducer,
  BannerReducer,
  DashboardReducer,
  NotificationReducer,
  AuthReducer,
  ProductCategoryReducer,
});

export default rootReducer;
