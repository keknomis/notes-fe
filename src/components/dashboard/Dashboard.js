// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config";

// components
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const SIDEBAR_WIDTH = 300;

export default function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("email") || "";
  const userInitial = name.charAt(0).toUpperCase() || "?";

  // Determine if we are on the dashboard page
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  const getProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      const data = await res.json();
      const first = Array.isArray(data) && data[0] ? data[0] : {};
      const userName =
        first.user_name ?? first.userName ?? first.username ?? "";
      setName(userName);
      setAllTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("getProfile error:", err);
      toast.error("Could not load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "transparent", // No background here anymore
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          height: "100vh",
          background: "linear-gradient(135deg, #F7CAC9 0%, #92A8D1 100%)",
          backdropFilter: "blur(5px)", // Optional
          zIndex: 10,
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Remove background gradient
        }}
      >
        <div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #92A8D1 0%, #F7CAC9 100%)",
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
            <div
              style={{
                color: "#2d3e50",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              {name}
            </div>
            <div
              style={{
                color: "#5f6f86",
                fontSize: "1.05rem",
                marginBottom: "2.5rem",
              }}
            >
              {email}
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
            to={isDashboard ? "/account" : "/dashboard"}
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
            {isDashboard ? "My Account" : "Dashboard"}
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
          marginLeft: SIDEBAR_WIDTH, // Push right of sidebar
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the card horizontally
          padding: "2rem", // Optional: for responsiveness
          background: "transparent",
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
              Dashboard
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
              <>
                <InputTodo setTodosChange={setTodosChange} />
                <hr className="my-2" style={{ borderColor: "#a18cd1" }} />
                <div className="todos-container">
                  <ListTodos
                    allTodos={allTodos}
                    setTodosChange={setTodosChange}
                  />
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </main>
    </div>
  );
}
