import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import apiTodo from "../utils/ServerConnect.js";

const AddInput = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(apiTodo.createTodo);

  const addTodo = async () => {
    try {
      const newTodo = { title: title };
      await mutateAsync(newTodo);
      setTitle("");
      queryClient.invalidateQueries("todoList");
    } catch (error) {}
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add To Do..."
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <button onClick={addTodo}>Add</button>
    </>
  );
};

export default AddInput;
