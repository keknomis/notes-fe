import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Components
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Landing from "./components/Landing";
import API_BASE_URL from "./config";

import { bool } from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found.");
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/is-verify`, {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      });

      console.log("#######");
      console.log(localStorage.token);
      const parseRes = await response.json();
      console.log("Authentication check response:", parseRes);

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        throw new Error("Authentication verification failed.");
      }

      // parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Landing setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
