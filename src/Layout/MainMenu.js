import {
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  ApartmentOutlined,
  SafetyCertificateOutlined,
  BellFilled,
  SettingOutlined,
  ShopFilled,
  PieChartFilled,
} from "@ant-design/icons";
import { FaExchangeAlt } from "react-icons/fa";
import { Menu, Select, Divider } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getLibrarians, SelectedLibrary } from "../redux";

const MainMenu = ({ active }) => {
  const { Option } = Select;
  const layout = useSelector((state) => state.themeReducer.layout);
  const [openKeys, setOpenKeys] = useState(["notification", "settings"]);
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const Librarian = useSelector((state) => state.LibrarianReducer.Librarian);
  const Selectedlibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  const AllLibrarians = Librarian?.map((data) => data._id);

  const LocalLibrary = JSON.parse(localStorage.getItem("Selectedlibrary"));
  // console.log("AllLibrarians", AllLibrarians);
  // console.log("Selectedlibrary", Selectedlibrary);

  useEffect(async () => {
    dispatch(getLibrarians());
  }, []);

  useEffect(async () => {
    if (!LocalLibrary && UserData) {
      // console.log("if");
      console.log("admin", AllLibrarians?.[0]);
      if (UserData?.userType === "librarian") {
        localStorage.setItem(
          "Selectedlibrary",
          JSON.stringify([UserData?.user?.libraries?.[0]?._id])
        );
        dispatch(SelectedLibrary([UserData?.user?.libraries?.[0]?._id]));
      } else {
        localStorage.setItem(
          "Selectedlibrary",
          JSON.stringify([AllLibrarians?.[0]])
        );
        dispatch(SelectedLibrary([AllLibrarians?.[0]]));
      }
    }
  }, [Librarian]);

  const onOpenChange = (items) => {
    console.log(items);
    if (items.includes("notification")) {
      const index = items.indexOf("notification");
      setOpenKeys((prev) => prev.splice(index, 1));
    } else if (items.includes("settings")) {
      const index = items.indexOf("settings");
      setOpenKeys((prev) => prev.splice(index, 1));
    }
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
    value === "All"
      ? localStorage.setItem("Selectedlibrary", JSON.stringify(AllLibrarians))
      : localStorage.setItem("Selectedlibrary", JSON.stringify([value]));
    dispatch(
      SelectedLibrary(JSON.parse(localStorage.getItem("Selectedlibrary")))
    );
  }
  return (
    <div>
      <Menu
        theme="dark"
        mode={layout === "vertical" ? "inline" : "horizontal"}
        defaultSelectedKeys={active}
        style={
          layout === "vertical"
            ? {
                height: "100vh",
                background: "var(--sidebar-bg-color)",
                padding: "10px",
                // overflow: "auto",
              }
            : { background: "var(--header-color)" }
        }
      >
        <Menu.Item
          key="select"
          icon={<FaExchangeAlt className="icon-size-22" />}
          style={{ background: "var(--menu-bg-color)", borderRadius: "10px" }}
        >
          <Select
            defaultValue={
              Selectedlibrary && Selectedlibrary.length > 1
                ? "All"
                : Selectedlibrary
            }
            style={{ width: "100%" }}
            onChange={handleChange}
            className="sider-selector"
            showArrow={false}
          >
            {UserData?.userType === "librarian"
              ? UserData?.user.libraries.map((data) => (
                  <Option value={data._id}> {data.name} </Option>
                ))
              : Librarian?.map((data) => (
                  <Option value={data._id}> {data.name} </Option>
                ))}
            {UserData?.userType !== "librarian" && (
              <Option value="All">All</Option>
            )}
          </Select>
        </Menu.Item>
        <Divider />
        {/* {isAdmin ? ( */}
        <>
          <Menu.Item
            key="home"
            icon={<HomeOutlined className="icon-size-22" />}
          >
            <Link to={"/"}>Home</Link>
          </Menu.Item>

          {UserData?.userType === "librarian" ? (
            UserData?.user.restrictions.includes("Librarians") && (
              <Menu.Item
                key="librarians"
                icon={<UsergroupAddOutlined className="icon-size-22" />}
              >
                <Link to={"/librarians"}>Librarians</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="librarians"
              icon={<UsergroupAddOutlined className="icon-size-22" />}
            >
              <Link to={"/librarians"}>Librarians</Link>
            </Menu.Item>
          )}

          {UserData?.userType === "librarian" ? (
            UserData?.user.restrictions.includes("Users") && (
              <Menu.Item
                key="readers"
                icon={<ReadOutlined className="icon-size-22" />}
              >
                <Link to={"/readers"}>Readers</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="readers"
              icon={<ReadOutlined className="icon-size-22" />}
            >
              <Link to={"/readers"}>Readers</Link>
            </Menu.Item>
          )}

          {UserData?.userType === "librarian" ? (
            UserData?.user.restrictions.includes("Categories") && (
              <Menu.Item
                key="categories"
                icon={<ApartmentOutlined className="icon-size-22" />}
              >
                <Link to={"/categories"}>Categories</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="categories"
              icon={<ApartmentOutlined className="icon-size-22" />}
            >
              <Link to={"/categories"}>Categories</Link>
            </Menu.Item>
          )}

          {UserData?.userType === "librarian" ? (
            UserData?.user.restrictions.includes("Books") && (
              <Menu.Item
                key="books"
                icon={<BookOutlined className="icon-size-22" />}
              >
                <Link to={"/materials"}>Materials</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="books"
              icon={<BookOutlined className="icon-size-22" />}
            >
              <Link to={"/materials"}>Materials</Link>
            </Menu.Item>
          )}

          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Authors") && (
              <Menu.Item
                key="authors"
                icon={<UserOutlined className="icon-size-22" />}
              >
                <Link to={"/authors"}>Authors</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="authors"
              icon={<UserOutlined className="icon-size-22" />}
            >
              <Link to={"/authors"}>Authors</Link>
            </Menu.Item>
          )}

          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Sales") && (
              <Menu.Item
                key="sales"
                icon={<SafetyCertificateOutlined className="icon-size-22" />}
              >
                <Link to={"/sales"}>Sales</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="sales"
              icon={<SafetyCertificateOutlined className="icon-size-22" />}
            >
              <Link to={"/sales"}>Sales</Link>
            </Menu.Item>
          )}

          {/* {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Payment") && (
              <Menu.Item
                key="payments"
                icon={<MdPayment className="icon-size-22" />}
              >
                <Link to={"/payments"}>Payments</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="payments"
              icon={<MdPayment className="icon-size-22" />}
            >
              <Link to={"/payments"}>Payments</Link>
            </Menu.Item>
          )} */}
          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Statics") && (
              <Menu.Item
                key="statics"
                icon={<PieChartFilled className="icon-size-22" />}
              >
                <Link to={"/statistics"}>Statistics</Link>
              </Menu.Item>
            )
          ) : (
            <Menu.Item
              key="statics"
              icon={<PieChartFilled className="icon-size-22" />}
            >
              <Link to={"/statistics"}>Statistics</Link>
            </Menu.Item>
          )}
          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Notifications") && (
              <SubMenu
                key="notification"
                icon={<BellFilled className="icon-size-22" />}
                title="Notifications"
              >
                <Menu.Item key="1">
                  <Link to={"/customer-care"}>Customer Care</Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to={"/bulk"}>Bulk Notifications</Link>
                </Menu.Item>
              </SubMenu>
            )
          ) : (
            <SubMenu
              key="notification"
              icon={<BellFilled className="icon-size-22" />}
              title="Notifications"
            >
              <Menu.Item key="1">
                <Link to={"/customer-care"}>Customer Care</Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to={"/bulk"}>Bulk Notifications</Link>
              </Menu.Item>
            </SubMenu>
          )}

          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Settings") && (
              <SubMenu
                key="settings"
                icon={<SettingOutlined className="icon-size-22" />}
                title="Settings"
              >
                <Menu.Item key="m-settings">
                  <Link to={"/mobile-settings"}>Mobile Settings</Link>
                </Menu.Item>
                <Menu.Item key="p-settings">
                  <Link to={"/packages"}>Packages</Link>
                </Menu.Item>
                <Menu.Item key="g-settings">
                  <Link to={"/general-settings"}>General Settings</Link>
                </Menu.Item>
              </SubMenu>
            )
          ) : (
            <SubMenu
              key="settings"
              icon={<SettingOutlined className="icon-size-22" />}
              title="Settings"
            >
              <Menu.Item key="m-settings">
                <Link to={"/mobile-settings"}>Mobile Settings</Link>
              </Menu.Item>
              <Menu.Item key="p-settings">
                <Link to={"/packages"}>Packages</Link>
              </Menu.Item>
              <Menu.Item key="g-settings">
                <Link to={"/general-settings"}>General Settings</Link>
              </Menu.Item>
            </SubMenu>
          )}

          {UserData?.userType === "librarian" ? (
            UserData.user.restrictions.includes("Shop") && (
              <SubMenu
                key="shop"
                icon={<ShopFilled className="icon-size-22" />}
                title="Shop"
              >
                <Menu.Item key="product-category">
                  <Link to={"/product-categories"}>Product Categories</Link>
                </Menu.Item>
                <Menu.Item key="products">
                  <Link to={"/products"}>Products</Link>
                </Menu.Item>

                <Menu.Item key="orders">
                  <Link to={"/orders"}>Orders</Link>
                </Menu.Item>
              </SubMenu>
            )
          ) : (
            <SubMenu
              key="shop"
              icon={<ShopFilled className="icon-size-22" />}
              title="Shop"
            >
              <Menu.Item key="product-category">
                <Link to={"/product-categories"}>Product Categories</Link>
              </Menu.Item>
              <Menu.Item key="products">
                <Link to={"/products"}>Products</Link>
              </Menu.Item>

              <Menu.Item key="orders">
                <Link to={"/orders"}>Orders</Link>
              </Menu.Item>
            </SubMenu>
          )}
        </>
        {/* ) : (
           <>
             <Menu.Item
              key="librarians"
              icon={<UsergroupAddOutlined className="icon-size-22" />}
            >
              <Link to={"/librarians"}>Librarians</Link>
            </Menu.Item>
            <Menu.Item
              key="readers"
              icon={<ReadOutlined className="icon-size-22" />}
            >
              <Link to={"/readers"}>Readers</Link>
            </Menu.Item>
            <Menu.Item
              key="books"
              icon={<BookOutlined className="icon-size-22" />}
            >
              <Link to={"/books"}>Books</Link>
            </Menu.Item>
          </>
        )} */}
      </Menu>
    </div>
  );
};

export default MainMenu;
