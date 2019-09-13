import { Router } from "@reach/router";
import React from "react";
import ChatPage from "../pages/Chat";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import { useSelector } from "../redux/hooks";
import GlobalStyle from "./GlobalStyle";
import { Spinner } from "./styled";
import Notification from "./Notification";

const App = () => {
  const loggedUser = useSelector(state => state.loggedUser);
  const isTokenVerified = useSelector(state => state.isTokenVerified);

  return (
    <>
      {!isTokenVerified && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Spinner />
        </div>
      )}
      <Router>
        {loggedUser && <ChatPage path="/" />}
        {isTokenVerified && !loggedUser && <LoginPage path="/" />}
        <RegisterPage path="/register" />
      </Router>
      <Notification />
      <GlobalStyle />
    </>
  );
};

export default App;
