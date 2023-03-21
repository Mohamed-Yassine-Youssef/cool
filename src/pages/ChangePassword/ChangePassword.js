import React, { useContext, useEffect, useState } from "react";
import "./ChangePassword.css";
import auth2 from "../../images/auth2.jpg";
import { Context } from "../../context/Context";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import Loader from "../../Components/Loader";
const ChangePassword = () => {
  const { user } = useContext(Context);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        "/api/user/" + user._id + "/updatePassword",
        { oldPassword, newPassword },
        config
      );
      window.location.replace("/home");
    } catch (error) {
      console.log(error);
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
          <div class="container-change">
            <div className="container-change">
              <div className="chp-rowimage">
                <div className="chp-img">
                  <img src={auth2} alt="" id="chp-image" />
                </div>
              </div>
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
              <div className="chp-rowinput">
                <div className="chp-titleinput">
                  <h1>Change Password</h1>
                </div>
                <form id="chp-form" onSubmit={submitHandler}>
                  <input
                    type="password"
                    name="oldpassword"
                    placeholder="Old password"
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    name="newpassword"
                    placeholder="New password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="submit"
                    value="Change"
                    id="chp-btn"
                    style={{ backgroundColor: "#CC5F04", color: "white" }}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ChangePassword;
