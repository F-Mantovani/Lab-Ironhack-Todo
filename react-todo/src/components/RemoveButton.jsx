import React from "react";
import { useMutation, useQueryClient } from "react-query";
import apiTodo from "../utils/ServerConnect.js";

const RemoveButton = ({ id }) => {

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(apiTodo.removeTodo);
  
  const remove = async () => {

    try {
      await mutateAsync(id);
      queryClient.invalidateQueries("todoList");
    } catch (error) {
      throw error
    }
  };

  return <button onClick={remove}> Remove </button>;
};

export default RemoveButton;
