import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./components/Login";
import UserContext from "./components/UserContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <UserContext>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="todo"
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
          <Route path="profile" element={<Profile />}/>
          </Routes>
        </QueryClientProvider>
      </UserContext>
    </>
  );
}

export default App;
