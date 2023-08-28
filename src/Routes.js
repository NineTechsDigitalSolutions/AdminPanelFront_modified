import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PrivateRoute from "./PrivateRoutes";
import Home from "./Pages/Home/Home";
import Librarians from "./Pages/Librarians/Librarians";
import AddNew from "./Pages/AddNewLibrarian/AddNew";
import Readers from "./Pages/Readers/Readers";
import ViewReader from "./Pages/Readers/ViewReader";
import Categories from "./Pages/Categories/Categories";
import Books from "./Pages/Books/Books";
import ViewBook from "./Pages/Books/ViewBook";
import AddNewBook from "./Pages/AddNewBook/AddNewBook";
import Authors from "./Pages/Authors/Authors";
import ViewAuthor from "./Pages/Authors/ViewAuthor";
import Sales from "./Pages/Sales/Sales";
import CustomerCare from "./Pages/Notifications/CustomerCare";
import ScheduleNotifications from "./Pages/Notifications/ScheduleNotifications";
import BulkNotifications from "./Pages/Notifications/BulkNotifications";
import AddSliderImages from "./Pages/Settings/AddSliderImages";
import MobileSettings from "./Pages/Settings/MobileSettings";
import Packages from "./Pages/Settings/Packages";
import Shop from "./Pages/Shop/Shop";
import AddNewProduct from "./Pages/AddNewProduct/AddNewProduct";
import AddAuthor from "./Pages/Authors/AddAuthor";
import AddNewPackage from "./Pages/Settings/AddNewPackage";
import GeneralSettings from "./Pages/Settings/GeneralSettings";
import Orders from "./Pages/Shop/Orders";
import Statics from "./Pages/Statics/Statics";
import AddUser from "./Pages/AddUser/AddUser";
import Payment from "./Pages/Payment/Payment";
import { useSelector } from "react-redux";
import VerifyCode from "./Pages/Login/VerifyCode";
import ChangePassword from "./Pages/Login/ChangePassword";
import PrivateRoutes from "./PrivateRoutes";
import ProductCategory from "./Pages/Shop/ProductCategory";
import AddProductCategory from "./Pages/AddNewProduct/AddProductCategory";
import Profile from "./Pages/Profile/Profile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        {/* <Route path="/register" exact component={Register} /> */}
        <PrivateRoutes path="/librarians" exact component={Librarians} />
        <PrivateRoutes path="/add-new" exact component={AddNew} />
        <PrivateRoutes path="/add-user" exact component={AddUser} />
        <PrivateRoutes path="/readers" exact component={Readers} />
        <PrivateRoutes path="/reader/:id" exact component={ViewReader} />
        <PrivateRoutes path="/categories" exact component={Categories} />
        <PrivateRoutes path="/materials" exact component={Books} />
        <PrivateRoutes path="/material/:id" exact component={ViewBook} />
        <PrivateRoutes path="/add-material" exact component={AddNewBook} />
        <PrivateRoutes path="/authors" exact component={Authors} />
        <PrivateRoutes path="/author/:id" exact component={ViewAuthor} />
        <PrivateRoutes path="/sales" exact component={Sales} />
        <PrivateRoutes path="/payments" exact component={Payment} />
        <PrivateRoutes path="/customer-care" exact component={CustomerCare} />
        <PrivateRoutes
          path="/schedule"
          exact
          component={ScheduleNotifications}
        />
        <PrivateRoutes path="/bulk" exact component={BulkNotifications} />
        <PrivateRoutes path="/add-slider" exact component={AddSliderImages} />
        <PrivateRoutes
          path="/mobile-settings"
          exact
          component={MobileSettings}
        />
        <PrivateRoutes path="/packages" exact component={Packages} />
        <PrivateRoutes path="/products" exact component={Shop} />
        <PrivateRoutes
          path="/product-categories"
          exact
          component={ProductCategory}
        />
        <PrivateRoutes
          path="/add-new-product-category"
          exact
          component={AddProductCategory}
        />
        <PrivateRoutes
          path="/add-new-product"
          exact
          component={AddNewProduct}
        />
        <PrivateRoutes path="/orders" exact component={Orders} />
        <PrivateRoutes path="/add-author" exact component={AddAuthor} />
        <PrivateRoutes path="/add-package" exact component={AddNewPackage} />
        <PrivateRoutes
          path="/general-settings"
          exact
          component={GeneralSettings}
        />
        <PrivateRoutes path="/statistics" exact component={Statics} />
        <Route path="/verifyCode" exact component={VerifyCode} />
        <Route path="/changePassword" exact component={ChangePassword} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
};
export default Routes;
