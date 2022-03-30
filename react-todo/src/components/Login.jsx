import React, { useState } from "react";
import { useMutation } from "react-query";
import apiLogin from "../utils/LoginConnect.js";
import { useUserUpdate } from "./UserContext.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Input = styled.input`
  border-radius: 5px;
  margin: 0 0 0 1rem;
  padding: 0.25em;
  width: 50%;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: #333;
  color: white;
  margin: 0.5em 0.25em;
  padding: 0.5em;
`;

const ButtonBox = styled.div`
  max-width: 50%;
  margin: 0.5em 0 0.5em auto;
  padding: 0 1.25em;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 40%;
  margin: 0.125em auto;
`;

const LogBox = styled.div`
  max-width: 40rem;
  margin: 12% auto;
  border: 1 solid black;
  border-radius: 5px;
  box-shadow: 4px 4px 8px 0px #333;
  padding: 2em 0.75em;
`;

const Label = styled.label`
  width: 3rem;
`;

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const changeUser = useUserUpdate();
  const navigate = useNavigate();

  const myStorage = window.sessionStorage;
  const { mutateAsync: logUser } = useMutation(apiLogin.logIn);
  const { mutateAsync: createUser } = useMutation(apiLogin.signUp);

  const logIn = async () => {
    try {
      const payload = { email, password };
      const data = await logUser(payload);
      myStorage.setItem("token", data.token);
      console.log(data)
      changeUser(data.user);
      setEmail("");
      setPassword("");
      navigate("/todo");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUp = async () => {
    try {
      const payload = { email, password, name };
      await createUser(payload);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <LogBox>
        <InputBox>
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="text"
            value={email}
            placeholder="awesomemail@email.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            value={password}
            placeholder="*******"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            value={name}
            placeholder="Joaquina"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </InputBox>
        <ButtonBox>
          <Button onClick={signUp}>Create User</Button>
          <Button onClick={logIn}>Login</Button>
        </ButtonBox>
      </LogBox>
    </>
  );
};

export default Login;
