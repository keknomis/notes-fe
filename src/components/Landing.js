// import React from "react";
// import { Link } from "react-router-dom";

// const Landing = () => {
//   return (
//     <div className="jumbotron mt-5">
//       <h1>Todo list</h1>
//       <p>Sign In and start building your todo list</p>
//       <Link to="/login" className="btn btn-primary">
//         Login
//       </Link>
//       <Link to="/register" className="btn btn-primary ml-3">
//         Register
//       </Link>
//     </div>
//   );
// };

// export default Landing;

// src/components/Landing.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Landing = () => {
  // ensure no body margin/padding so we get a true 100%
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  return (
    <Container
      fluid
      className="m-0 p-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1AD9B6", // your requested background
        overflow: "hidden",
      }}
    >
      <Row className="h-100 g-0">
        {/* Left: text */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center"
          style={{ color: "#200E32", padding: "2rem" }}
        >
          <h1 className="display-3">Tippy Notes Testing Sandbox</h1>
          <p className="lead">
            Welcome! Dive in and start creating your personalized to‑do lists
            with ease. Manage tasks, test new features, and streamline your
            workflow in our interactive playground.
          </p>
        </Col>

        {/* Divider */}
        <Col
          md={2}
          className="d-none d-md-flex justify-content-center align-items-center"
        >
          <div
            style={{
              width: "2px",
              height: "60%",
              backgroundColor: "#200E32",
            }}
          />
        </Col>

        {/* Right: buttons */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ padding: "2rem" }}
        >
          <Button
            as={Link}
            to="/login"
            variant="outline-light"
            size="lg"
            className="w-75 mb-3"
            style={{ color: "#200E32", borderColor: "#200E32" }}
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/register"
            variant="light"
            size="lg"
            className="w-75"
            style={{
              backgroundColor: "#200E32",
              color: "#fff",
              border: "none",
            }}
          >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
