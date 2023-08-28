import { useEffect } from "react";
import Routes from "./Routes";
// import "antd/dist/antd.dark.less";
import "antd/dist/antd.less";
import { switchTheme } from "./defaultTheme";
import "./Styles/styles.css";
import { useSelector } from "react-redux";
function App() {
  const value = useSelector((state) => state.themeReducer.updateValues);
  // useEffect(() => {
  //   Object.keys(theme).forEach((key) => {
  //     document.body.style.setProperty(`--${key}`, theme[key]);
  //   });
  // }, []);
  useEffect(() => {
    const themeConfig = JSON.parse(localStorage.getItem("themeConfig"));
    if (themeConfig) {
      switchTheme(themeConfig.mode, themeConfig.colors);
    } else {
      switchTheme();
    }
  }, [value]);

  return <Routes />;
}

export default App;
