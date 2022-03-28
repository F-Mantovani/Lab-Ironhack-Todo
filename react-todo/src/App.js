import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./components/Login";
import UserContext from "./components/UserContext";
import { BrowserRouter, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const [isAuth, setAuth] = useState(false);

  return (
    <>
      <UserContext>
        <QueryClientProvider client={queryClient}>
          <Login setAuth={setAuth} />
          {isAuth && <TodoList />}
        </QueryClientProvider>
      </UserContext>
    </>
  );
}

export default App;
