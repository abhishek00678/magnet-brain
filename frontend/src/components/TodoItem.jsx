import React from "react";

const todoStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  padding: "1rem",
  marginBottom: "0.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const todoInfoStyle = {
  flex: "1",
};

const titleStyle = {
  margin: "0",
  fontWeight: "bold",
  color: "#333",
};

const descriptionStyle = {
  margin: "0.5rem 0 0 0",
  color: "#666",
};

const buttonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
  marginLeft: "1rem",
};

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  editHandle,
  id,
}) => {
  return (
    <div style={todoStyle}>
      <div style={todoInfoStyle}>
        <h4 style={titleStyle}>{title}</h4>
        <p style={descriptionStyle}>{description}</p>
      </div>
      <div>
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
          style={{ marginRight: "1rem" }}
        />
        <button onClick={() => deleteHandler(id)} style={buttonStyle}>
          Delete
        </button>
        <button onClick={() => editHandle(id)} style={buttonStyle}>
          edit
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
