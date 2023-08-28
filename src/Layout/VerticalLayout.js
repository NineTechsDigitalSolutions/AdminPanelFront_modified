import React, { useState } from "react";

import { Layout, Menu, Dropdown, Button } from "antd";
import { MdRealEstateAgent } from "react-icons/md";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  PropertySafetyOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import MainMenu from "./MainMenu";
import Logo from "../Assets/logo.png";

const VerticalLayout = ({ children, active }) => {
  const { Header, Sider, Content } = Layout;
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const UserName = localStorage.getItem("userName");
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const UserType = localStorage.getItem("userType");

  // console.log("UserType", UserType);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menu = (
    <Menu>
      <Menu.Item
        icon={<LogoutOutlined />}
        onClick={() => {
          history.push("/login");
          localStorage.clear();
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => {
          history.push({
            state: {
              name: UserName,
              email: UserData?.user?.email,
              phone: UserData?.user?.phone,
              address: UserData?.user?.address,
            },
            pathname: "/profile",
          });
        }}
      >
        Profile
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="v-layout">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={210}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "var(--sidebar-bg-color)",
          }}
          // collapsedWidth={0}
          // onMouseOver={() => setCollapsed(false)}
          // onMouseOut={() =>   setCollapsed(true)}
        >
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <MainMenu active={active} />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header style={{ padding: 0 }}>
            <div className="header-row">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
              <div style={{ display: "flex" }}>
                <h3 className="UserName">
                  {UserName && UserName}{" "}
                  {UserType === "librarian" && ", librarian"}
                </h3>
                <span>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement={"bottomLeft"}
                  >
                    <span className="header-action">
                      <UserOutlined />
                    </span>
                  </Dropdown>
                </span>
              </div>
            </div>
          </Header>
          <Content
            // className="site-layout-background"
            style={{
              padding: "48px 40px",

              // padding: 24,
              // minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default VerticalLayout;
