import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import loginBack from "../../Assets/loginback.jpg";
import iconDemo from "../../Assets/icon_demo.svg";

import admin from "../../Assets/admin.png";
import { userLogin } from "./../../redux/actions/authActions";
import ForgetEmailModal from "../../Components/Modal/ForgetEmailModal";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginContainer = {
    backgroundImage: `url(${loginBack})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
  };

  const Login = async () => {
    setLoading(true);
    let payload = {
      email: email,
      password: password,
    };
    if (email !== "" || password !== "") {
      await dispatch(userLogin(payload, history));
    }
    setLoading(false);
  };

  if (localStorage.hasOwnProperty("token")) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className="main-login" style={loginContainer}>
        <div className="form-container">
          <div className="login-icon">
            <img src={admin} alt="icon" height="160px" />
          </div>
          <div className="login-title">
            {/* {isAdmin ? "Admin" : "Librarian"} Login */}
            Login
          </div>
          <Form className="pa-24" onFinish={Login} layout="vertical">
            <Form.Item label="Email" name={"email"}>
              <Input
                type="email"
                className="black"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // onBlur={handleBlur}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item label="Password" name={"password"}>
              <Input
                type="password"
                className="black"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // onBlur={handleBlur}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="form-button div-center"
                htmlType="submit"
                loading={Loading}
              >
                Login
              </Button>
            </Form.Item>

            <div className="div-center link-label mtb-16">
              <ForgetEmailModal />
            </div>
          </Form>
        </div>
      </div>
    );
  }
};

export default Login;
