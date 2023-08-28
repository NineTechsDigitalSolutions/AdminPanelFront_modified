import { Layout } from "antd";
import Navbar from "./Navbar";

const HorizontalLayout = ({ children, active }) => {
  const { Header, Content } = Layout;
  return (
    <div className="h-layout">
      <Layout>
        <Header>
          <Navbar active={active} />
        </Header>
        <Layout>
          <Content
            style={{
              padding: "48px 40px",
              // height: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </div>
  );
};

export default HorizontalLayout;
