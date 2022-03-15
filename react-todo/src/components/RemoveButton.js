import React from "react";
import { useMutation, useQueryClient } from "react-query";
import apiTodo from "../utils/ServerConnect.js";

const RemoveButton = ({ id }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(apiTodo.removeTodo);

  const remove = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries("todoList");
  };
  return <button onClick={remove}> Remove </button>;
};

export default RemoveButton;
