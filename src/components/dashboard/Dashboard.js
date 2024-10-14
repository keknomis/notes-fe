// export default Dashboard;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import API_BASE_URL from "../config";
//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  // Retrieve email directly from localStorage
  const email = localStorage.getItem("email");

  const getProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      console.log("GET PROFILE CALL");
      console.log(parseData);

      setAllTodos(parseData);
      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      //remove email
      //localStorage.removeItem("email");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const userInitial = name ? name[0].toUpperCase() : "?";

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  // Tooltip to show on hover
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {email || "No email available"}
    </Tooltip>
  );

  return (
    <Container fluid>
      <Row className="justify-content-between align-items-center mt-3 mx-0">
        <Col xs="auto">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <div className="avatar">{userInitial}</div>
          </OverlayTrigger>
        </Col>
        <Col xs="auto">
          <button onClick={(e) => logout(e)} className="btn btn-primary">
            Logout
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTodo setTodosChange={setTodosChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
