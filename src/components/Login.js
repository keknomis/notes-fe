// import React, { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import API_BASE_URL from "../config";

// const Login = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = inputs;

//   const onChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { email, password };

//       const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });
//       const parseRes = await response.json();

//       if (parseRes.token) {
//         localStorage.setItem("token", parseRes.token);
//         localStorage.setItem("email", parseRes.email);
//         setAuth(true);
//         console.log(parseRes);
//         toast.success("login successfully");
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
//       <h1 className="text-center my-5">Login</h1>
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
//         <button className="btn btn-success btn-block">Sumbit</button>
//         <Link to="/register">Register</Link>
//       </form>
//       {/* <button onClick={()=> setAuth(true)}>Logout</button> */}
//     </Fragment>
//   );
// };

// export default Login;

/// src/components/Login.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import API_BASE_URL from "../config";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password } = inputs;

  useEffect(() => {
    // remove any default body margins/padding
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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("email", parseRes.email);
        setAuth(true);
        toast.success("Login successful");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error("Login error:", err);
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
        {/* Left side: Welcome text */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center"
          style={{ color: "#200E32", padding: "2rem" }}
        >
          <h1 className="display-4 mb-4">Welcome Back!</h1>
          <p className="lead">
            Log in to access your Tippy Notes Testing Sandbox. Manage your tasks
            seamlessly. Create new, update existing and delete deprecated work
            items.
          </p>
          <p className="lead">
            Never loose track of your work and stay on top of your tasks
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

        {/* Right side: Form */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center align-items-center"
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
                Login
              </Card.Title>
              <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
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
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#200E32", fontWeight: "bold" }}
                  >
                    Register
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

export default Login;
