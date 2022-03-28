import React, { useContext, useState } from "react";

const userContext = React.createContext();
const userUpdate = React.createContext();

export function useUser() {
  return useContext(userContext);
}

export function useUserUpdate() {
  return useContext(userUpdate);
}

function UserContext({ children }) {
  const [user, setUser] = useState("oi");

  function changeUser(data) {
    setUser(data);
  }
  return (
    <>
      <userContext.Provider value={user} setUser={setUser}>
        <userUpdate.Provider value={changeUser}>{children}</userUpdate.Provider>
      </userContext.Provider>
    </>
  );
}

export default UserContext;
