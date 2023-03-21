import React, { useContext, useEffect, useState } from "react";
import "./EspaceAdmin.css";
import logo from "../../images/logo.png";

import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
const EspaceAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { user } = useContext(Context);
  const fetchUsers = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setisLoading(true);
      const { data } = await axios.get("/api/user/allusers", config);
      setisLoading(false);
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log("error");
    }
  };

  const deleteAccount = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (window.confirm("are you sure to delete this user!")) {
        await axios.delete("/api/user/" + userId + "/deleteUser", config);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <table id="customers">
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>is Admin?</th>
              <th>is Restorer?</th>
              <th>update account</th>
              <th>delete account</th>
            </tr>

            {users.map(({ email, name, isAdmin, isRestorer, _id }) => (
              <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{isAdmin ? "true" : "false"}</td>
                <td>{isRestorer ? "true" : "false"}</td>
                <td
                  style={{
                    textAlign: "center",
                    color: "green",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    to={"/admin/userEditScreen/" + _id}
                    style={{ color: "green" }}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
                <td
                  style={{
                    textAlign: "center",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => deleteAccount(_id)}
                  ></i>
                </td>
              </tr>
            ))}
          </table>
          <img src={logo} alt="" id="logo" />
        </>
      )}
    </>
  );
};
export default EspaceAdmin;
