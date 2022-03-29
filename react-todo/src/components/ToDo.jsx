import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import apiTodo from "../utils/ServerConnect.js";
import RemoveButton from "./RemoveButton.jsx";

const ToDo = ({ id, title, completed, user }) => {
  const queryClient = useQueryClient();
  const [complete, setComplete] = useState(completed);
  const { mutateAsync } = useMutation(apiTodo.updateOneTodo);

  const toggleStatus = async () => {
    try {
      const todoInfo = { title: title, completed: !complete };
      await mutateAsync({ id, todoInfo });
      queryClient.invalidateQueries("todoList");
      setComplete(!complete);
    } catch (error) {}
  };

  return (
    <div
      style={{
        border: "solid 1px black",
        borderRadius: "5px",
        boxShadow: "4px 4px 8px 0px #333",
        padding: "1em 1em",
        margin: "1em auto",
        width: "min(30%, 40rem)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <input
            type="checkbox"
            checked={complete}
            readOnly
            onClick={toggleStatus}
          />
          <span> {title}</span>
        </div>
        <p style={{ margin: "0 0 0 1.5rem" }}>Created by: {user.name}</p>
      </div>
      <RemoveButton id={id} />
    </div>
  );
};

export default ToDo;
