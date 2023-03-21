import React, { useContext, useEffect, useState } from "react";
import "./log-in.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { Context } from "../../context/Context";
import Loader from "../../Components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(false);

  const [isLoading, setisLoading] = useState(true);

  const { dispatch } = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "login_start" });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);

      console.log("login success");

      dispatch({ type: "login_success", payload: data });
      // navigate("/home");
      navigate("/home");
    } catch (error) {
      dispatch({ type: "login_failure" });
      setMessage(error.response.data.message);
      setErrors(true);
    }
  };
  useEffect(() => {
    setisLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errors && (
            <Toast
              bg="danger"
              style={{ color: "white", fontSize: "15px" }}
              show={true}
              className="toast2"
            >
              <Toast.Body>
                <i className="fa-solid fa-circle-exclamation"></i> {message}
              </Toast.Body>
            </Toast>
          )}

          <Link to="/">
            <img
              alt=""
              className="logo-log"
              src="https://i.imgur.com/zOJoLoO.png"
              width="100"
            />
          </Link>
          <div className="bg-elems">
            <img
              className="top-right-elem"
              src="https://i.imgur.com/k4YOhTC.png"
              alt=""
            />
            <img
              className="bottom-left-elem"
              src="https://i.imgur.com/DOjRD5A.png"
              alt=""
            />
            <img
              className="topimg"
              src="https://i.imgur.com/tgtb7i9.png"
              alt=""
            />
            <img
              className="btmimg"
              src="https://i.imgur.com/5xFfTLw.png"
              alt=""
            />
          </div>
          <div className="container login-container">
            <div className="wrapper">
              <div className="title">
                <h1>Welcome Back!</h1>
                <p>Login To Continue</p>
              </div>

              <form onSubmit={submitHandler}>
                <div className="row">
                  <i className="bi bi-person-fill "></i>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <i className="bi bi-shield-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="row button">
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Don't have an account?{" "}
                  <Link className="signup-link" to="/signup">
                    Signup Now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Login;
