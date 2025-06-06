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
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #a18cd1 100%)",
        overflow: "hidden",
      }}
    >
      <Row className="h-100 g-0">
        {/* Left: text */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center"
          style={{ color: "#f8f8ff", padding: "2rem" }}
        >
          <h1
            className="display-3"
            style={{ fontWeight: 800, letterSpacing: "-2px", color: "#e0e6f7" }}
          >
            Clabs Notes Testing Sandbox
          </h1>
          <p className="lead" style={{ fontSize: "1.3rem", color: "#d1c4e9" }}>
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
              background: "linear-gradient(180deg, #fff 0%, #a18cd1 100%)",
              borderRadius: "2px",
              opacity: 0.5,
            }}
          />
        </Col>

        {/* Right: buttons */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            padding: "2rem",
            alignItems: "stretch",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.10)",
              borderRadius: "18px",
              boxShadow: "0 8px 32px 0 rgba(79,91,213,0.10)",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.2rem",
              width: "100%",
              maxWidth: "370px",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: "1.2rem",
                letterSpacing: "-1px",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Get Started
            </h2>
            <Button
              as={Link}
              to="/login"
              size="lg"
              className="w-100"
              style={{
                background: "linear-gradient(90deg, #4f5bd5 0%, #962fbf 100%)",
                color: "#fff",
                border: "none",
                fontWeight: 700,
                fontSize: "1.15rem",
                borderRadius: "8px",
                marginBottom: "0.7rem",
                boxShadow: "0 2px 12px 0 rgba(79,91,213,0.13)",
                transition: "transform 0.1s",
              }}
            >
              <span style={{ marginRight: "0.5rem", fontSize: "1.2em" }}>
                🔑
              </span>
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              size="lg"
              className="w-100"
              style={{
                background: "#fff",
                color: "#4f5bd5",
                border: "none",
                fontWeight: 700,
                fontSize: "1.15rem",
                borderRadius: "8px",
                boxShadow: "0 2px 12px 0 rgba(150,47,191,0.10)",
                borderBottom: "3px solid #962fbf",
                transition: "transform 0.1s",
              }}
            >
              <span style={{ marginRight: "0.5rem", fontSize: "1.2em" }}>
                📝
              </span>
              Register
            </Button>
            <div
              style={{
                color: "#e0e6f7",
                fontSize: "0.98rem",
                marginTop: "0.7rem",
                textAlign: "center",
              }}
            >
              New here? Register for a free account!
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
