// import React, { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import API_BASE_URL from "../config";

// const Register = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//     name: "",
//   });
//   const { email, password, name } = inputs;

//   const onChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();

//     try {
//       const body = { email, password, name };
//       const response = await fetch(`${API_BASE_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       const parseRes = await response.json();

//       if (parseRes.token) {
//         localStorage.setItem("token", parseRes.token);
//         setAuth(true);
//         console.log(parseRes);
//       } else {
//         setAuth(false);
//         toast.error(parseRes);
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <Fragment>
//       <h1 className="text-center my-5">Register</h1>
//       <form onSubmit={onSubmitForm}>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           className="form-control my-3"
//           value={email}
//           onChange={(e) => onChange(e)}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           className="form-control my-3"
//           value={password}
//           onChange={(e) => onChange(e)}
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="name"
//           className="form-control my-3"
//           value={name}
//           onChange={(e) => onChange(e)}
//         />
//         <button className="btn btn-success btn-block">Submit</button>
//       </form>
//       <Link to="/login">Already have an account?</Link>
//     </Fragment>
//   );
// };

// export default Register;

// src/components/Register.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import API_BASE_URL from "../config";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
  const { email, password, name } = inputs;

  useEffect(() => {
    // Remove default body margins/padding for full-screen layout
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
        backgroundColor: "#1AD9B6",
        overflow: "hidden",
      }}
    >
      <Row className="h-100 g-0">
        {/* Left side: Intro text */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center"
          style={{ color: "#200E32", padding: "2rem" }}
        >
          <h1 className="display-4 mb-4">Join Tippy Notes!</h1>
          <p className="lead">
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
              backgroundColor: "#200E32",
            }}
          />
        </Col>

        {/* Right side: Registration form */}
        <Col
          xs={12}
          md={5}
          className="d-flex justify-content-center align-items-center"
          style={{ padding: "2rem" }}
        >
          <Card style={{ width: "100%", maxWidth: "400px", border: "none" }}>
            <Card.Body>
              {/* Back Home button */}
              <div className="mb-3 text-start">
                <Button
                  as={Link}
                  to="/"
                  variant="outline-dark"
                  size="sm"
                  style={{ borderColor: "#200E32", color: "#200E32" }}
                >
                  ← Back Home
                </Button>
              </div>

              <Card.Title
                className="text-center mb-4"
                style={{ color: "#200E32" }}
              >
                Register
              </Card.Title>
              <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={onChange}
                    required
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
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: "#200E32", border: "none" }}
                >
                  Submit
                </Button>
              </Form>
              <div className="text-center">
                <small style={{ color: "#200E32" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#200E32", fontWeight: "bold" }}
                  >
                    Login
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
