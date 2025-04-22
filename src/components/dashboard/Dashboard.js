// // src/components/Dashboard.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Card,
//   Button,
//   Tooltip,
//   OverlayTrigger,
//   Spinner,
// } from "react-bootstrap";
// import API_BASE_URL from "../../config";

// // components
// import InputTodo from "./todolist/InputTodo";
// import ListTodos from "./todolist/ListTodos";

// // const SIDEBAR_WIDTH = 320;

// const Dashboard = ({ setAuth }) => {
//   const [name, setName] = useState("");
//   const [allTodos, setAllTodos] = useState([]);
//   const [todosChange, setTodosChange] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const email = localStorage.getItem("email");
//   const userInitial = name.charAt(0).toUpperCase() || "?";

//   useEffect(() => {
//     // remove default margins/padding
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     return () => {
//       document.body.style.margin = "";
//       document.body.style.padding = "";
//     };
//   }, []);

//   const renderTooltip = (props) => (
//     <Tooltip id="email-tooltip" {...props}>
//       {email || "No email available"}
//     </Tooltip>
//   );

//   const getProfile = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/dashboard/`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${localStorage.token}` },
//       });
//       const data = await res.json();
//       const first = Array.isArray(data) && data[0] ? data[0] : {};
//       const userName =
//         first.user_name ?? first.userName ?? first.username ?? "";
//       setName(userName);
//       setAllTodos(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("getProfile error:", err);
//       toast.error("Could not load todos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//     setTodosChange(false);
//   }, [todosChange]);

//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("token");
//     setAuth(false);
//     toast.success("Logged out");
//   };

//   return (
//     <>
//       Fixed Sidebar
//       <aside className="dashboard-sidebar">
//         <OverlayTrigger
//           placement="bottom"
//           delay={{ show: 250, hide: 400 }}
//           overlay={renderTooltip}
//         >
//           <div className="avatar-lg">{userInitial}</div>
//         </OverlayTrigger>
//         <h4 className="sidebar-username">{name}</h4>{" "}
//         <Button
//           as={Link}
//           to="/account"
//           variant="outline-dark"
//           className="sidebar-logout"
//           style={{ borderColor: "#200E32", color: "#200E32" }}
//         >
//           My Account
//         </Button>
//         <Button
//           variant="outline-dark"
//           onClick={logout}
//           className="sidebar-logout"
//         >
//           Logout
//         </Button>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-main">
//         {loading ? (
//           <div className="loading-container">
//             <Spinner animation="border" variant="secondary" />
//           </div>
//         ) : (
//           <Card className="main-card">
//             <Card.Body>
//               <InputTodo setTodosChange={setTodosChange} />
//               <hr />
//               <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
//             </Card.Body>
//           </Card>
//         )}
//       </main>
//     </>
//   );
// };

// export default Dashboard;
// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Button,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from "react-bootstrap";
import API_BASE_URL from "../../config";

// components
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const SIDEBAR_WIDTH = 320;

export default function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const userInitial = name.charAt(0).toUpperCase() || "?";

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="email-tooltip" {...props}>
      {email || "No email available"}
    </Tooltip>
  );

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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth(false);
    toast.success("Logged out");
  };

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
      {/* Fixed Sidebar */}
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
        {/* Top: avatar + name */}
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
            {name}
          </h4>
        </div>

        {/* Bottom: navigation buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button
            as={Link}
            to="/account"
            variant="outline-dark"
            style={{
              borderColor: "#200E32",
              color: "#200E32",
            }}
          >
            My Account
          </Button>
          <Button
            variant="outline-dark"
            onClick={logout}
            style={{
              borderColor: "#200E32",
              color: "#200E32",
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
          flexGrow: 1,
          overflowY: "auto",
          padding: "1.5rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <Card
            style={{
              border: "none",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Body
              style={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <InputTodo setTodosChange={setTodosChange} />
              <hr className="my-2" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <ListTodos
                  allTodos={allTodos}
                  setTodosChange={setTodosChange}
                />
              </div>
            </Card.Body>
          </Card>
        )}
      </main>
    </div>
  );
}
