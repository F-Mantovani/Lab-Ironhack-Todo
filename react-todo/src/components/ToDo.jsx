import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import apiTodo from "../utils/ServerConnect.js";
import RemoveButton from "./RemoveButton.js";

const ToDo = ({ id, title, completed }) => {
  const queryClient = useQueryClient();
  const [complete, setComplete] = useState(completed);
  const { mutateAsync } = useMutation(apiTodo.updateOneTodo);

  const toggleStatus = async () => {
    setComplete(!complete);
    const todoInfo = { title: title, completed: !complete };
    await mutateAsync({ id, todoInfo });
    queryClient.invalidateQueries("todoList");
  };

  return (
    <div
      style={{
        border: "solid 1px black",
        borderRadius: "5px",
        boxShadow: "4px 4px 8px 0px #333",
        padding: "1em 1em",
        margin: "1em auto",
        width: "min(30%, 500px)",
        display: "flex",
        justifyContent: "space-between",
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
      <RemoveButton id={id} />
    </div>
  );
};

export default ToDo;
