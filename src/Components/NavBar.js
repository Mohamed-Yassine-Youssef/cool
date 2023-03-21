import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import logo from "../images/logo.png";
const NavBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { user, dispatch } = useContext(Context);
  const deconnectHandler = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  const searchRestorant = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      return;
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container">
        <a className="navbar-brand" href="#s">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-around"
          id="navbarSupportedContent"
        >
          <div className="input-group ">
            <input
              id="search-input"
              type="search"
              className="form-control shadow-none "
              placeholder="Search anything..."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button
              id="search-button"
              type="button"
              className="btn "
              onClick={searchRestorant}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>

          <div className="navbar-nav mb-2 mb-lg-0 ">
            {user?.isRestorer && (
              <>
                <li className="nav-item dropdown restorerdashboard">
                  <p
                    className="nav-link dropdown-toggle text-light"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    restorer dashboard
                  </p>

                  <ul className="dropdown-menu ">
                    <li>
                      <Link
                        to="/restorateur/restorant"
                        className="dropdown-item"
                      >
                        {" "}
                        restorant
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/restorateur/gestionReservations"
                        className="dropdown-item"
                      >
                        {" "}
                        reservations
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {user?.isAdmin && (
              <li className="nav-item dashboard">
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{ color: "white", width: "170px" }}
                >
                  users management
                </Link>
              </li>
            )}
            <li className="nav-item dropdown aa">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#s"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.name}
              </a>
              <ul className="dropdown-menu ">
                <li>
                  <Link to="/home/updateInfo" className="dropdown-item">
                    update info
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={deconnectHandler}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
