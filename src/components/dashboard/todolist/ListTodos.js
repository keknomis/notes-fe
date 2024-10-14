import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import API_BASE_URL from "../../../config";

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); //empty array
  async function deleteTodo(id) {
    try {
      await fetch(`${API_BASE_URL}/dashboard/todos/${id}`, {
        method: "DELETE",
        //break some more
        headers: { jwt_token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
