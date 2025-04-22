// src/components/Account.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from "react-bootstrap";
import API_BASE_URL from "../config";

const SIDEBAR_WIDTH = 320;

export default function Account({ setAuth }) {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email") || "";

  // ─── Form inputs state ──────────────────────────────────────────────────
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ▶️ PREFILL from localStorage immediately on mount
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setInputs((prev) => ({
      ...prev,
      name: storedName,
      email: storedEmail,
    }));
  }, []); // <-- runs once, right after inputs state is defined

  // ─── Which fields are in “edit” mode ─────────────────────────────────
  const [editingField, setEditingField] = useState({
    name: false,
    email: false,
    password: false,
  });

  // ─── Loading state for profile fetch ─────────────────────────────────
  const [loading, setLoading] = useState(true);

  // ▶️ FETCH authoritative profile and overwrite if needed
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        const data = await res.json();
        if (data.name) setInputs((prev) => ({ ...prev, name: data.name }));
        if (data.email) setInputs((prev) => ({ ...prev, email: data.email }));
      } catch (err) {
        console.error("Could not fetch profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Toggle edit mode for a given field
  const handleToggle = (field) => {
    if (field === "password") {
      setInputs((prev) => ({ ...prev, password: "" }));
    }
    setEditingField((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Submit changes (password uses real endpoint; name/email saved to localStorage)
  const handleFieldSubmit = async (field) => {
    if (field === "password") {
      try {
        await fetch(`${API_BASE_URL}/account/password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify({
            email: inputs.email,
            password: inputs.password,
          }),
        });
        handleToggle("password");
        // alert("Password updated!");
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update password");
      }
    } else {
      // stub: saving name/email back to localStorage
      localStorage.setItem(field, inputs[field]);
      alert(`${field.charAt(0).toUpperCase() + field.slice(1)} saved! (TODO)`);
      handleToggle(field);
    }
  };

  // Tooltip for the sidebar avatar
  const renderTooltip = (props) => (
    <Tooltip id="email-tooltip" {...props}>
      {storedEmail || "No email available"}
    </Tooltip>
  );

  // Logout & clear storage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setAuth(false);
    navigate("/login");
  };

  const userInitial = inputs.name.charAt(0).toUpperCase() || "?";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      {/* ─── Sidebar ──────────────────────────────────────────────────── */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          height: "100vh",
          background: "#1AD9B6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem 1rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <OverlayTrigger
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#200E32",
                fontSize: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              {userInitial}
            </div>
          </OverlayTrigger>
          <h4 style={{ color: "#200E32", textTransform: "capitalize" }}>
            {inputs.name}
          </h4>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button
            as={Link}
            to="/dashboard"
            variant="outline-dark"
            style={{ borderColor: "#200E32", color: "#200E32" }}
          >
            Dashboard
          </Button>
          <Button
            variant="outline-dark"
            onClick={handleLogout}
            style={{ borderColor: "#200E32", color: "#200E32" }}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          flexGrow: 1,
          overflowY: "auto",
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2%",
              width: "100%",
            }}
          >
            {/* Card 1: Username */}
            <div style={{ flex: "0 1 30%", minWidth: "300px" }}>
              <Card style={{ border: "none" }}>
                <Card.Header
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#200E32",
                    fontWeight: "bold",
                  }}
                >
                  Username
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="mb-3"
                      style={{ borderColor: "#200E32", color: "#200E32" }}
                      onClick={() => handleToggle("name")}
                    >
                      {editingField.name ? "Cancel" : "Edit Username"}
                    </Button>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFieldSubmit("name");
                      }}
                    >
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Control
                          type="text"
                          name="name"
                          value={inputs.name}
                          onChange={(e) =>
                            setInputs({ ...inputs, name: e.target.value })
                          }
                          disabled={!editingField.name}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <Button
                    variant="dark"
                    className="w-100"
                    style={{ backgroundColor: "#200E32", border: "none" }}
                    disabled={!editingField.name}
                    onClick={() => handleFieldSubmit("name")}
                  >
                    Save Username
                  </Button>
                </Card.Body>
              </Card>
            </div>

            {/* Card 2: Email */}
            <div style={{ flex: "0 1 30%", minWidth: "300px" }}>
              <Card style={{ border: "none" }}>
                <Card.Header
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#200E32",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    {/* <OverlayTrigger
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Form.Label style={{ color: "#200E32" }}>
                        Current Email
                      </Form.Label>
                    </OverlayTrigger> */}
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="mb-3"
                      style={{ borderColor: "#200E32", color: "#200E32" }}
                      onClick={() => handleToggle("email")}
                    >
                      {editingField.email ? "Cancel" : "Edit Email"}
                    </Button>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFieldSubmit("email");
                      }}
                    >
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Control
                          type="email"
                          name="email"
                          value={inputs.email}
                          onChange={(e) =>
                            setInputs({ ...inputs, email: e.target.value })
                          }
                          disabled={!editingField.email}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <Button
                    variant="dark"
                    className="w-100"
                    style={{ backgroundColor: "#200E32", border: "none" }}
                    disabled={!editingField.email}
                    onClick={() => handleFieldSubmit("email")}
                  >
                    Save Email
                  </Button>
                </Card.Body>
              </Card>
            </div>

            {/* Card 3: Password */}
            <div style={{ flex: "0 1 30%", minWidth: "300px" }}>
              <Card style={{ border: "none" }}>
                <Card.Header
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#200E32",
                    fontWeight: "bold",
                  }}
                >
                  Password
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="mb-3"
                      style={{ borderColor: "#200E32", color: "#200E32" }}
                      onClick={() => handleToggle("password")}
                    >
                      {editingField.password ? "Cancel" : "Edit Password"}
                    </Button>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFieldSubmit("password");
                      }}
                    >
                      <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Control
                          type="password"
                          name="password"
                          value={inputs.password}
                          onChange={(e) =>
                            setInputs({ ...inputs, password: e.target.value })
                          }
                          disabled={!editingField.password}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <Button
                    variant="dark"
                    className="w-100"
                    style={{ backgroundColor: "#200E32", border: "none" }}
                    disabled={!editingField.password}
                    onClick={() => handleFieldSubmit("password")}
                  >
                    Save Password
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
