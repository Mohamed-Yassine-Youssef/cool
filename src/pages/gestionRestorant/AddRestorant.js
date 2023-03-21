import React, { useContext, useState } from "react";
import "./AddRestorant.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddRestorant.css";
import axios from "axios";
import { Context } from "../../context/Context";
const AddRestorant = () => {
  const [name, setName] = useState("");
  const [telephone, seTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const { user } = useContext(Context);
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRestorant = {
      user: user._id,
      name,
      telephone,
      address,
    };
    if (file && file2) {
      const data = new FormData();

      console.log(data);

      data.append("files", file);
      data.append("files", file2);

      try {
        const d = await axios.post("/api/upload", data);
        console.log(d);
        newRestorant.image = d.data[0].filename;
        newRestorant.menu = d.data[1].filename;
      } catch (err) {}
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.post("/api/restaurant/create", newRestorant, config);
        alert("Restorant added successfuly");
        window.location.replace("/home");
      } catch (err) {}
    }
  };
  return (
    <>
      <div id="body">
        <div id="titre">
          <h1>Please Fill in The Fields</h1>
        </div>
        <div id="titre2">
          <p>
            (<span style={{ color: "red" }}>*</span>)Filed is required
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              Restaurant Name<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>
              Restaurant Address<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>
              Restaurant Tel<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="tel"
              min={0}
              max={9}
              onChange={(e) => seTelephone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLogo">
            <Form.Label>
              Restaurant Logo<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="file"
              required
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRestaurant">
            <Form.Label>
              Restaurant Menu<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="file"
              required
              onChange={(e) => {
                setFile2(e.target.files[0]);
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            style={{
              backgroundColor: "#F8DFE0",
              color: "black",
              borderColor: "#F8DFE0",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddRestorant;
