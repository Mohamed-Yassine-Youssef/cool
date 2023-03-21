import { Button, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import Loader from "../../Components/Loader";

const UserEditScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRestorer, setIsRestorer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const { user } = useContext(Context);
  const fetchUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setisLoading(true);
      const { data } = await axios.get("/api/user/" + id, config);
      setisLoading(false);
      setName(data.name);
      setEmail(data.email);
      setIsAdmin(data.isAdmin);
      setIsRestorer(data.isRestorer);
    } catch (err) {}
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        "/api/user/admin/updateinfo/" + id,
        { name, email, isRestorer, isAdmin },
        config
      );
      window.location.replace("/admin");
    } catch (err) {}
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                user name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                user Email<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                className="mt-3"
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="isrestorer">
              <Form.Check
                type="checkbox"
                label="Is Restorer"
                checked={isRestorer}
                className="mt-3"
                onChange={(e) => setIsRestorer(e.target.checked)}
              ></Form.Check>
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
      )}
    </>
  );
};

export default UserEditScreen;
