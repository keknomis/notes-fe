// src/components/todolist/InputTodo.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import API_BASE_URL from "../../../config";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/dashboard/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) return;
      setTodosChange((c) => !c);
      setDescription("");
    } catch (err) {
      console.error("InputTodo error:", err);
    }
  };

  return (
    <Form onSubmit={onSubmitForm} className="d-flex p-3">
      <Form.Control
        as="textarea"
        placeholder="Add todo"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        // required browser no longer prevents empty subs
        style={{
          height: "4rem", // ← about 5× taller
          resize: "none", // optional: disable manual resize
        }}
      />
      <Button
        type="submit"
        variant="dark"
        className="ml-2"
        style={{ backgroundColor: "#200E32", border: "none" }}
      >
        Add
      </Button>
    </Form>
  );
};

export default InputTodo;
