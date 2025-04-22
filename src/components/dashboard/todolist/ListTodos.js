// import React, { Fragment, useState, useEffect } from "react";
// import EditTodo from "./EditTodo";
// import API_BASE_URL from "../../../config";

// const ListTodos = ({ allTodos, setTodosChange }) => {
//   console.log(allTodos);
//   const [todos, setTodos] = useState([]); //empty array

//   async function deleteTodo(id) {
//     try {
//       await fetch(`${API_BASE_URL}/dashboard/todos/${id}`, {
//         method: "DELETE",
//         //break some more
//         headers: { jwt_token: localStorage.token },
//       });

//       setTodos(todos.filter((todo) => todo.todoId !== id));
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   useEffect(() => {
//     setTodos(allTodos);
//   }, [allTodos]);

//   console.log(todos);

//   return (
//     <Fragment>
//       {" "}
//       <table className="table mt-5">
//         <thead>
//           <tr>
//             <th>Description</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todos.length !== 0 &&
//             todos[0].todoId !== null &&
//             todos.map((todo) => (
//               <tr key={todo.todoId}>
//                 <td>{todo.description}</td>
//                 <td>
//                   <EditTodo todo={todo} setTodosChange={setTodosChange} />
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => deleteTodo(todo.todoId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </Fragment>
//   );
// };

// export default ListTodos;

// src/components/todolist/ListTodos.js
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditTodo from "./EditTodo";
import API_BASE_URL from "../../../config";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      const token = localStorage.getItem("Token");
      await fetch(`${API_BASE_URL}/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo.todoId !== id));
    } catch (err) {
      console.error("deleteTodo error:", err);
    }
  };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Table hover className="m-0">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          const id = todo.todoId ?? todo.todoid ?? todo.todo_id;
          return (
            <tr key={id}>
              <td>{todo.description}</td>
              <td>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setTodosChange((c) => !c)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="dark"
                  size="sm"
                  style={{ backgroundColor: "#200E32", border: "none" }}
                  onClick={() => deleteTodo(id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ListTodos;
