import "./sign-up.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import Loader from "../../Components/Loader";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [isRestorer, setIsRestaurer] = useState(false);
  const [passNotMatched, setPassNotMatched] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      console.log("passwords not matched");
      setMessage("Password not a match.");
      setColor("danger");
      setPassNotMatched(true);
      return;
    }
    setPassNotMatched(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          isRestorer,
        },
        config
      );
      navigate("/login");

      console.log(data);
    } catch (error) {}
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
          <Link to="/login">
            <img
              alt=""
              className="logo-signup"
              src="https://i.imgur.com/zOJoLoO.png"
              width="100"
            />
          </Link>
          <div className="signup-columns ">
            <div className="left-column"></div>
            <div className="right-column">
              <div className="container">
                <div className="wrapper">
                  <div className="title">
                    <h1>
                      <span>Sign</span> <span>Up</span>
                    </h1>
                    <div className="login-prop">
                      Already have an account?{" "}
                      <Link className="login-link" to="/login">
                        Log in
                      </Link>
                    </div>
                  </div>

                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <label
                        htmlFor="validationCustom02"
                        className="form-label"
                      >
                        Full Name:{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <label htmlFor="">Email: </label>
                      <input
                        type="email"
                        placeholder="Enter your Email "
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <label htmlFor="">Password: </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <label htmlFor="">Confirm password: </label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <div
                        className="toast align-items-center text-bg-primary border-0"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div className="d-flex">
                          <div className="toast-body">
                            Hello, world! This is a toast message.
                          </div>
                          <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="love"> Are you a Restorer?</label>
                        <input
                          type="checkbox"
                          id="restorer"
                          checked={isRestorer}
                          onChange={(e) => setIsRestaurer(e.target.checked)}
                        />
                      </div>
                    </div>
                    {passNotMatched && (
                      <Toast
                        bg={color}
                        style={{ color: "white", fontSize: "15px" }}
                        show={true}
                        className="toast"
                      >
                        <Toast.Body>
                          <i className="fa-solid fa-circle-exclamation"></i>{" "}
                          {message}
                        </Toast.Body>
                      </Toast>
                    )}

                    <div className="row button">
                      <button type="submit">Create Account</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
