import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Context } from "../../context/Context";
import auth1 from "../../images/bg3.jpg";
import "./Updateinfo.css";
const Updateinfo = () => {
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        "/api/user/" + user._id + "/updateInfo",
        { name, email },
        config
      );
      let newUser = {
        _id: user._id,
        name: name,
        email: email,
        isAdmin: user.isAdmin,
        isRestorer: user.isRestorer,
        pic: user.pic,
        token: user.token,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.replace("/home");
    } catch (err) {
      console.log(err);
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
          <div className="container-update">
            <div className="rowimage">
              <div className="img">
                <img src={auth1} alt="" id="updateInfo-image" />
              </div>
            </div>
            <div className="rowinput">
              <div className="titleinput">
                <h1>Update info</h1>
              </div>
              <form action="" id="updateInfo-form" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="name"
                  placeholder="New name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="New Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="submit"
                  value="Update"
                  id="updateIngo-btn"
                  style={{ backgroundColor: "#CC5F04", color: "white" }}
                />
              </form>
              <Link
                to="/home/changePassword"
                style={{ float: "left", color: "#cc5f04" }}
              >
                change password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Updateinfo;
