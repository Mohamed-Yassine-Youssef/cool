import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ActivationPage = () => {
  const { activationcode } = useParams();
  axios.put(`/api/user/auth/verifyuser/${activationcode}`);

  return (
    <div className="ActivationPage">
      <div className="header">
        <i className="fa-solid fa-circle-check"></i>
        <h1>Email verication successful</h1>
      </div>
      <div className="box">
        <p>Your email address is now verified</p>
        <button>
          <Link to="/login" className="link">
            Sign in
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ActivationPage;
