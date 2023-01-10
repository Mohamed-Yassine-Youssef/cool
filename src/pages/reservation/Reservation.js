import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import "./reservation.css";
import axios from "axios";
import { Context } from "../../context/Context";
const Reservation = () => {
  const d = new Date();
  let d2 = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  const t = ["10AM", "12PM", "14PM", "16PM", "18PM", "20PM", "22PM"];
  const places = [2, 4, 6, 8];
  const [date, setDate] = useState(d2);
  const [time, setTime] = useState();
  const [nbPlaces, setNbPlaces] = useState();

  const { id } = useParams();
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/restaurant/createReservation/" + id,

        {
          emaill: user.email,
          userName: user.name,
          date,
          time,
          nbPlaces,
        },
        config
      );
      alert(
        "Your reservation has successfly sended we will send you an SMS to confirm it"
      );
      window.location.replace("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reservation container">
      <h1>Reservation</h1>
      <div className="col col-md-10">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              date<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control type="text" value={date} required readOnly />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setTime(e.target.value)}
              >
                <option disabled selected>
                  choose a time
                </option>
                {t.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setNbPlaces(e.target.value)}
              >
                <option disabled selected>
                  choose number of places
                </option>
                {places.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <Button
            type="submit"
            style={{
              backgroundColor: "#F8DFE0",
              color: "black",
              borderColor: "#F8DFE0",
            }}
          >
            submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Reservation;
