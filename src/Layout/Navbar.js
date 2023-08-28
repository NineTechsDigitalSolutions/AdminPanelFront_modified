import { PropertySafetyOutlined } from "@ant-design/icons";
import { MdRealEstateAgent } from "react-icons/md";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";

const Navbar = ({ active }) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">ADMIN</div>
      <div style={{ width: "90%" }}>
        <MainMenu active={active} />
      </div>
    </div>
  );
};

export default Navbar;
