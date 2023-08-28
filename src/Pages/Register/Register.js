import { Form, Input, Button, Checkbox, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { userLogin } from "../../redux/actions/authActions";
import { useState } from "react";
import loginBack from "../../Assets/loginback.jpg";
import iconDemo from "../../Assets/icon_demo.svg";

const Register = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (values) => {
    console.log("Success:", values);
    userLogin(values, history);
  };

  const loginContainer = {
    backgroundImage: `url(${loginBack})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
  };

  return (
    <div className="main-login" style={loginContainer}>
      <div className="form-container">
        <div className="login-icon">
          <img src={iconDemo} alt="icon" height="100px" />
        </div>
        <div className="login-title">Create Account</div>
        <form className="pa-24" onSubmit={handleLogin}>
          <div className="form-group mtb-16">
            <label>First Name</label>
            <Input
              type="email"
              className="form-control react-form-input"
              id="email"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              // onBlur={handleBlur}
              placeholder="Email"
            />
            {/* <Error field="email" /> */}
          </div>
          <div className="form-group  mtb-16">
            <label>Last Name</label>
            <Input
              type="email"
              className="form-control react-form-input"
              id="email"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              // onBlur={handleBlur}
              placeholder="Email"
            />
            {/* <Error field="email" /> */}
          </div>
          <div className="form-group  mtb-16">
            <label>Email</label>
            <Input
              type="email"
              className="form-control react-form-input"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              // onBlur={handleBlur}
              placeholder="Email"
            />
            {/* <Error field="email" /> */}
          </div>

          <div className="mtb-16">
            <label>Password</label>
            <Input
              type="password"
              className="form-control react-form-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // onBlur={handleBlur}
              placeholder="Password"
            />
            {/* <Error field="password" /> */}
          </div>

          <div className="div-center mtb-16">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Agree to terms & privacy policy
            </label>
          </div>

          <Button type="submit" className="form-button div-center">
            Register
          </Button>
          <div
            className="div-center link-label mtb-16"
            // onClick={() => props.history.push("/forgotPassword")}
          >
            Login ?
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
