import { useState } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import loginBack from "../../Assets/loginback.jpg";
import admin from "../../Assets/admin.png";
import { ForgetPassword } from "../../redux/actions/authActions";

const ChangePassword = () => {
  const history = useHistory();
  const [Password, setPassword] = useState('')
  const [ConfirmedPassword, setConfirmedPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(true);
  const dispatch = useDispatch();
  const email = localStorage.getItem("ForgetEmail")
  const [Loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const payload = {
      newPass: Password,
      ConfirmPass: ConfirmedPassword,
      email: email
    }
    await dispatch(ForgetPassword(payload , history))
    setLoading(false)
  };

  const handleChangeRole = () => {
    setIsAdmin((isAdmin) => !isAdmin);
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
          <img src={admin} alt="icon" height="160px" />
        </div>
        <div className="login-title">
          VerifyCode
        </div>
        <form className="pa-24">
          <div className="form-group">
            <Input
              className="black"
              id="code"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              placeholder="New Password"
            />
            {/* <Error field="email" /> */}
          </div>

          <div className="form-group">
            <Input
              className="black"
              id="code"
              onChange={(e) => setConfirmedPassword(e.target.value)}
              value={ConfirmedPassword}
              placeholder="Confirm Password"
            style={{ marginTop: '1rem' }}

            />
            {/* <Error field="email" /> */}
          </div>

          <Button
            type="primary"
            className="form-button div-center"
            style={{ marginTop: '1rem' }}
          onClick={handleLogin}
          loading={Loading}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
