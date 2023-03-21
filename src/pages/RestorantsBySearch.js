import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { Context } from "../context/Context";

const RestorantsBySearch = () => {
  const PF = "/images/";
  const { keyword } = useParams();
  const { user } = useContext(Context);
  const [restorants, setRestorants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/restaurant?keyword=${keyword}`,
        config
      );
      setIsLoading(false);
      setRestorants(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="container"
          style={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <div className="row">
            {restorants.length ? (
              restorants?.map((item) => (
                <div className="col-lg-4 col-md-6 my-3 rsb">
                  <div className="box box1">
                    <div className="reslogo">
                      <img
                        src={PF + item.image}
                        alt="restaurant logo"
                        style={{ with: "100%" }}
                      />
                    </div>
                    <p style={{ marginTop: "20px" }}>Name: {item.name}</p>
                    <p>Address: {item.address}</p>
                    <button className="check-menu">
                      <Link
                        to={"/restorant/menu/" + item._id}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        {" "}
                        check menu <i className="fa-solid fa-grip-vertical"></i>
                      </Link>
                    </button>
                    <button className="reserve">
                      <Link
                        to={"/restorateur/reservation/" + item._id}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Reserve <i className="fa-regular fa-calendar-days"></i>
                      </Link>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  fontSize: "30px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                No Restaurants found!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RestorantsBySearch;
