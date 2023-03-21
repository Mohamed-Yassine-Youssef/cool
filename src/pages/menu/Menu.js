import axios from "axios";
import "./menu.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";

const Menu = () => {
  const { id } = useParams();
  const [restorant, setRestorant] = useState();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchRestorant = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("/api/restaurant/" + id, config);
        setRestorant(data);
      } catch (err) {}
    };
    fetchRestorant();
  }, []);

  return (
    <div className="menu container">
      <div className="header">
        <h1>Menu</h1>
        <div className="menuImg row ">
          <img src={"/images/" + restorant?.menu} alt="menu" />
        </div>
      </div>
      {/* <div className="reviews">
        <p>Name</p>
        <p>raiting</p>
        <p>comment</p>
      </div> */}
    </div>
  );
};

export default Menu;
