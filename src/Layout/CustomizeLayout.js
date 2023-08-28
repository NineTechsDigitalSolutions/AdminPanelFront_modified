import React, { useState } from "react";
import { Drawer, Button, Typography, Radio } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { changeLayout, changeValue } from "./../redux/actions/themeActions";
import { backgroundColors, colors } from "../Util/themeColors";

const CustomizeLayout = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTopBar, setSelectedTopBar] = useState("");
  const [selectedSidebar, setSelectedSidebar] = useState("");
  const [selectedVarients, setSelectedVarients] = useState("");
  const [selectedBg, setSelectedBg] = useState("");
  const { Title } = Typography;
  const theme = JSON.parse(localStorage.getItem("themeConfig"));
  const layout = useSelector((state) => state.themeReducer.layout);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onLayoutChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLayout(e.target.value));
  };

  const handleThemeColorChange = (colorName, value) => {
    if (colorName === "body-bg-color") {
      if (value === "#222831") {
        localStorage.setItem(
          "themeConfig",
          JSON.stringify({
            mode: theme?.mode,
            colors: {
              ...theme?.colors,
              [colorName]: value,
              "text-color": "#fff",
            },
          })
        );
        // dispatch(changeValue());
      } else {
        localStorage.setItem(
          "themeConfig",
          JSON.stringify({
            mode: theme?.mode,
            colors: {
              ...theme?.colors,
              [colorName]: value,
              "text-color": "#000",
            },
          })
        );
        // dispatch(changeValue());
      }
    } else {
      localStorage.setItem(
        "themeConfig",
        JSON.stringify({
          mode: theme?.mode,
          colors: {
            ...theme?.colors,
            [colorName]: value,
          },
        })
      );
    }
    dispatch(changeValue());
  };

  return (
    <div>
      <Button
        // type="primary"
        onClick={showDrawer}
        shape={"circle"}
        icon={<SettingFilled />}
      />

      <Drawer
        placement="right"
        title={
          // <Title level={2} style={{ color: "#000" }}>
          //   Settings
          // </Title>
          "Settings"
        }
        onClose={onClose}
        visible={visible}
        closable={false}
      >
        <div className="customize-layout">
          <div>
            <Title level={4}>Layouts</Title>
            <Radio.Group onChange={onLayoutChange} defaultValue={layout}>
              <Radio value={"vertical"} className="black">
                Vertical
              </Radio>
              <Radio value={"horizontal"} className="black">
                Horizontal
              </Radio>
            </Radio.Group>
          </div>
          <div className="theme-container">
            <Title level={4}>Theme Builder</Title>
            <p>Top Bar</p>
            <div className="colors-container">
              {colors.map((color, i) => (
                <span
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedTopBar(i);
                    handleThemeColorChange("header-color", color);
                  }}
                  className={selectedTopBar === i && "selectedColor"}
                  key={i}
                ></span>
              ))}
            </div>
            <p>Side Bar</p>
            <div className="colors-container">
              {colors.map((color, i) => (
                <span
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedSidebar(i);
                    handleThemeColorChange("sidebar-bg-color", color);
                  }}
                  className={selectedSidebar === i && "selectedColor"}
                  key={i}
                ></span>
              ))}
            </div>
            <p>Side Bar Varients</p>
            <div className="colors-container">
              {colors.map((color, i) => (
                <span
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedVarients(i);
                    handleThemeColorChange("menu-bg-color", color);
                  }}
                  className={selectedVarients === i && "selectedColor"}
                  key={i}
                ></span>
              ))}
            </div>
            <p>Body Background</p>
            <div className="colors-container">
              {backgroundColors.map((color, i) => (
                <span
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedBg(i);
                    handleThemeColorChange("body-bg-color", color);
                    // handleThemeColorChange("text-color", "#fff");
                  }}
                  className={selectedBg === i && "selectedColor"}
                  key={i}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CustomizeLayout;
