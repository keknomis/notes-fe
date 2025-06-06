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

const SIDEBAR_WIDTH = 300;

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
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "transparent", // Let the body handle the background
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          height: "100vh",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #F7CAC9 0%, #92A8D1 100%)",
          boxShadow: "2px 0 16px 0 rgba(146,168,209,0.13)",
        }}
      >
        <div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <OverlayTrigger
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #92A8D1 0%, #F7CAC9 100%)",
                  color: "#2d3e50",
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 16px 0 rgba(146,168,209,0.15)",
                }}
              >
                {userInitial}
              </div>
            </OverlayTrigger>
            <div
              style={{
                color: "#2d3e50",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              {inputs.name}
            </div>
            <div
              style={{
                color: "#5f6f86",
                fontSize: "1.05rem",
                marginBottom: "2.5rem",
              }}
            >
              {inputs.email}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            marginBottom: "2.5rem",
            alignItems: "center",
          }}
        >
          <Button
            as={Link}
            to="/dashboard"
            style={{
              background: "#92A8D1",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "0 2px 8px 0 rgba(146,168,209,0.10)",
              width: "85%",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
          >
            Dashboard
          </Button>
          <Button
            onClick={handleLogout}
            style={{
              background: "#fff",
              color: "#92A8D1",
              border: "1.5px solid #92A8D1",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "0 2px 8px 0 rgba(146,168,209,0.10)",
              width: "85%",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          overflow: "hidden",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 900,
            margin: "0 auto",
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 8px 32px 0 rgba(146,168,209,0.10)",
            border: "1.5px solid #92A8D1",
          }}
        >
          <Card.Body>
            <h2
              style={{
                color: "#2d3e50",
                fontWeight: 700,
                marginBottom: "1.2rem",
                letterSpacing: "-1px",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Account Settings
            </h2>
            {loading ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" variant="info" />
              </div>
            ) : (
              <Form>
                {/* Username */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#5f6f86", fontWeight: 600 }}>
                    Username
                  </Form.Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Control
                      type="text"
                      value={inputs.name}
                      disabled={!editingField.name}
                      onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
                      }
                      style={{
                        background: "#f7faff",
                        color: "#2d3e50",
                        border: "1px solid #92A8D1",
                        borderRadius: 8,
                        maxWidth: 300,
                      }}
                    />
                    <Button
                      variant="outline-info"
                      size="sm"
                      style={{
                        borderColor: "#92A8D1",
                        color: "#5f6f86",
                        background: "transparent",
                        minWidth: 90,
                      }}
                      onClick={() => handleToggle("name")}
                    >
                      {editingField.name ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#92A8D1",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        minWidth: 90,
                      }}
                      disabled={!editingField.name}
                      onClick={() => handleFieldSubmit("name")}
                    >
                      Save
                    </Button>
                  </div>
                </Form.Group>
                {/* Email */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#5f6f86", fontWeight: 600 }}>
                    Email
                  </Form.Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Control
                      type="email"
                      value={inputs.email}
                      disabled={!editingField.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                      style={{
                        background: "#f7faff",
                        color: "#2d3e50",
                        border: "1px solid #92A8D1",
                        borderRadius: 8,
                        maxWidth: 300,
                      }}
                    />
                    <Button
                      variant="outline-info"
                      size="sm"
                      style={{
                        borderColor: "#92A8D1",
                        color: "#5f6f86",
                        background: "transparent",
                        minWidth: 90,
                      }}
                      onClick={() => handleToggle("email")}
                    >
                      {editingField.email ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#92A8D1",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        minWidth: 90,
                      }}
                      disabled={!editingField.email}
                      onClick={() => handleFieldSubmit("email")}
                    >
                      Save
                    </Button>
                  </div>
                </Form.Group>
                {/* Password */}
                <Form.Group className="mb-2">
                  <Form.Label style={{ color: "#5f6f86", fontWeight: 600 }}>
                    Password
                  </Form.Label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Control
                      type="password"
                      value={inputs.password}
                      disabled={!editingField.password}
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                      style={{
                        background: "#f7faff",
                        color: "#2d3e50",
                        border: "1px solid #92A8D1",
                        borderRadius: 8,
                        maxWidth: 300,
                      }}
                    />
                    <Button
                      variant="outline-info"
                      size="sm"
                      style={{
                        borderColor: "#92A8D1",
                        color: "#5f6f86",
                        background: "transparent",
                        minWidth: 90,
                      }}
                      onClick={() => handleToggle("password")}
                    >
                      {editingField.password ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#92A8D1",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        minWidth: 90,
                      }}
                      disabled={!editingField.password}
                      onClick={() => handleFieldSubmit("password")}
                    >
                      Save
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            )}
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}
