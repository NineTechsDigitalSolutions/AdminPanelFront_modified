import { useSelector } from "react-redux";
import VerticalLayout from "./VerticalLayout";
import CustomizeLayout from "./CustomizeLayout";
import HorizontalLayout from "./HorizontalLayout";

const LayoutMain = ({ children, active }) => {
  const layout = useSelector((state) => state.themeReducer.layout);
  return (
    <>
      <div className="main-layout">
        {layout == "vertical" ? (
          <VerticalLayout children={children} active={active} />
        ) : (
          <HorizontalLayout children={children} active={active} />
        )}
      </div>
      <span className="customize">
        <CustomizeLayout />
      </span>
    </>
  );
};

export default LayoutMain;
