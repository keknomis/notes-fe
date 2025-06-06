// src/components/Register.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import API_BASE_URL from "../config";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
  const { email, password, name } = inputs;

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  const onChange = (e) => {
    setInputs((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registration successful");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Server error");
    }
  };

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
        {/* Left side: Intro text */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center"
          style={{ color: "#f8f8ff", padding: "2rem" }}
        >
          <h1
            className="display-4 mb-4"
            style={{
              color: "#e0e6f7",
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            Join Clabs Notes!
          </h1>
          <p className="lead" style={{ color: "#d1c4e9" }}>
            Sign up now to start creating and testing your personalized task
            lists. Explore new features and streamline your workflow in our
            interactive sandbox.
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

        {/* Right side: Registration form */}
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
            {/* Back Home button */}
            <div className="mb-3 text-start w-100">
              <Button
                as={Link}
                to="/"
                variant="outline-light"
                size="sm"
                style={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "6px",
                  padding: "0.25rem 0.9rem",
                }}
              >
                ← Home
              </Button>
            </div>
            <h2
              className="mb-4"
              style={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "-1px",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Register
            </h2>
            <Form onSubmit={onSubmitForm} style={{ width: "100%" }}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={onChange}
                  required
                  style={{
                    background: "#f8f8ff",
                    color: "#2a5298",
                    border: "1.5px solid #a18cd1",
                    borderRadius: "7px",
                    fontSize: "1rem",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={onChange}
                  required
                  style={{
                    background: "#f8f8ff",
                    color: "#2a5298",
                    border: "1.5px solid #a18cd1",
                    borderRadius: "7px",
                    fontSize: "1rem",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  required
                  style={{
                    background: "#f8f8ff",
                    color: "#2a5298",
                    border: "1.5px solid #a18cd1",
                    borderRadius: "7px",
                    fontSize: "1rem",
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mb-3"
                style={{
                  background:
                    "linear-gradient(90deg, #4f5bd5 0%, #962fbf 100%)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 12px 0 rgba(79,91,213,0.13)",
                  transition: "transform 0.1s",
                }}
              >
                <span
                  style={{
                    marginRight: "0.5rem",
                    fontSize: "1.2em",
                  }}
                >
                  📝
                </span>
                Register
              </Button>
            </Form>
            <div className="text-center w-100">
              <small style={{ color: "#e0e6f7" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#4f5bd5",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Login
                </Link>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
