import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import RowDetails from "../../Components/RowDetails";
import { Context } from "../../context/Context";
import logo from "../../images/logo.png";
import "./gestionReservation.css";
const GestionReservations = () => {
  const { user } = useContext(Context);
  const [reservations, setReservation] = useState([]);
  const acceptHandler = async (_id, email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        "/api/restaurant/reservation/" + user._id + "/" + _id,
        {
          email,
        },
        config
      );
      alert("reservation accepted");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        "/api/restaurant/reservation/" + user._id + "/" + _id,

        config
      );
      alert("reservation deleted");
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReservations = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/restaurant/reservations/" + user._id,
        config
      );
      setReservation(data);
      console.log(data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
      <table id="customers">
        <thead style={{ fontSize: "30px", lineHeight: "5rem" }}>
          Reservations
        </thead>
        <tbody>
          <tr>
            <th>client name</th>
            <th>email</th>
            <th>reservation date</th>
            <th>reservation time</th>
            <th>number of places</th>
            <th>Accept</th>
            <th>Delete</th>
          </tr>

          {reservations.map(
            ({ userName, emaill, date, time, nbPlaces, _id }) => (
              <RowDetails
                userName={userName}
                emaill={emaill}
                _id={_id}
                date={date}
                time={time}
                nbPlaces={nbPlaces}
                acceptHandler={acceptHandler}
                deleteHandler={deleteHandler}
              />
            )
          )}
        </tbody>
      </table>
      <img src={logo} alt="" id="logo" />
    </>
  );
};

export default GestionReservations;
