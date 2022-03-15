import React from "react";
import apiTodo from "../utils/ServerConnect";
import { useQuery } from "react-query";
import ToDo from "./ToDo";
import AddInput from "./AddInput";

const TodoList = () => {
  const { isLoading, error, data } = useQuery("todoList", apiTodo.getAllTodo);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>To Do List</h1>
        <AddInput />
        {data.map(({ _id, title, completed }) => (
          <ToDo key={_id} title={title} completed={completed} id={_id} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
