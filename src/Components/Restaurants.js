import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";
const Restaurants = () => {
  const PF = "/images/";
  const [restorants, setRestorants] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const { user } = useContext(Context);
  const fetchRestorants = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get("/api/restaurant", config);
    setRestorants(data);
  };
  useEffect(() => {
    fetchRestorants();
    console.log(restorants);
    // eslint-disable-next-line
  }, []);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = restorants?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="restaurants container">
      {/* <div className="filter">
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            All Categiries
          </option>
          <option value="1">category One</option>
          <option value="2">category Two</option>
          <option value="3">category Three</option>
        </select>
      </div> */}
      <div className="restaurants_boxes ">
        <div className="row ">
          {currentPosts?.map((item) => (
            <div className="col-lg-4 col-md-6 my-3">
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
          ))}
        </div>

        <div className="nextpagediv">
          <Pagination
            totalPosts={restorants?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
